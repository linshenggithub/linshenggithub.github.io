---
title: 大模型 RL 后训练：PPO、DPO 与 GRPO
date: 2026-03-12 20:00:00
updated: 2026-08-08 23:00:00
categories:
  - 学习笔记
  - 强化学习
tags:
  - RLHF
  - PPO
  - DPO
  - GRPO
  - LLM Post-training
description: 从数据、目标函数和训练组件三个角度比较 PPO、DPO 与 GRPO，并讨论它们在大模型后训练中的适用场景。
math: true
mermaid: true
banner_img: /img/hero-ai-lab.png
og_img: /img/hero-ai-lab.png
---

<span class="source-badge">LOCAL NOTE · REWRITTEN & SANITIZED</span>

PPO、DPO 和 GRPO 经常被放在一起比较，但它们并不处于完全相同的位置：PPO 和 GRPO 是在线策略优化方法，DPO 则把带 KL 约束的偏好优化转化为离线分类目标。理解它们，最好同时看数据从哪里来、优势如何计算，以及训练时需要维护哪些模型。

<!-- more -->

## 统一视角

给定输入 $x$，策略模型 $\pi_\theta$ 生成回答 $y$，奖励函数 $r(x,y)$ 衡量回答质量。后训练通常希望在提高奖励的同时，不让策略过度偏离参考模型 $\pi_{\text{ref}}$：

$$
\max_{\pi_\theta}
\mathbb{E}_{x,y\sim\pi_\theta}[r(x,y)]
-\beta D_{\mathrm{KL}}\left(
\pi_\theta(\cdot|x)\|\pi_{\text{ref}}(\cdot|x)
\right).
$$

{% mermaid %}
flowchart LR
  P[Prompt] --> A[Policy rollout]
  A --> R[Reward or preference]
  R --> U{Update method}
  U --> PPO[PPO: critic advantage]
  U --> DPO[DPO: pairwise preference]
  U --> GRPO[GRPO: group-relative advantage]
{% endmermaid %}

## PPO：用 Critic 估计优势

[PPO](https://arxiv.org/abs/1707.06347) 通过裁剪新旧策略概率比，限制单次更新幅度。简化的策略目标为：

$$
L^{\text{clip}}(\theta)=
\mathbb{E}_t\left[
\min\left(
r_t(\theta)\hat{A}_t,
\operatorname{clip}(r_t(\theta),1-\epsilon,1+\epsilon)\hat{A}_t
\right)
\right],
$$

其中 $r_t(\theta)=\pi_\theta(a_t|s_t)/\pi_{\theta_{\text{old}}}(a_t|s_t)$，$\hat A_t$ 是 Critic 参与估计的优势。裁剪并不保证策略绝对不变，而是抑制会带来过大概率比变化的更新。

LLM 场景中的典型 PPO 管线包含：

- **Actor**：待优化的语言模型；
- **Critic**：预测状态价值，用于估计优势；
- **Reward Model**：给完整回答或过程步骤打分；
- **Reference Model**：计算 KL 约束，防止策略漂移。

PPO 能利用在线采样持续探索，但显存、吞吐和训练稳定性成本都很高，奖励模型偏差还可能被策略放大。

## DPO：直接学习偏好对

[DPO](https://arxiv.org/abs/2305.18290) 使用偏好数据 $(x,y_w,y_l)$，其中 $y_w$ 优于 $y_l$。它将隐式奖励差写成策略与参考策略的对数概率比，并优化：

$$
\mathcal{L}_{\text{DPO}}=-\mathbb{E}\left[
\log\sigma\left(
\beta\log\frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)}
-\beta\log\frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)}
\right)
\right].
$$

DPO 的优势是无需显式训练 Critic，也不需要在微调阶段进行在线 rollout，工程复杂度接近监督微调。代价是它依赖固定偏好数据：如果负例过于简单、偏好标签噪声高，或者数据分布与真实推理提示不一致，模型学到的可能只是表面格式偏好。

## GRPO：组内相对奖励替代 Critic

[DeepSeekMath](https://arxiv.org/abs/2402.03300) 提出的 GRPO 对同一个输入采样一组回答 $\{y_i\}_{i=1}^{G}$，用组内奖励均值与标准差构造相对优势：

$$
\hat A_i =
\frac{r_i-\operatorname{mean}(r_1,\ldots,r_G)}
{\operatorname{std}(r_1,\ldots,r_G)+\delta}.
$$

它不再训练单独的 Critic，因此明显降低了 PPO 式训练的模型数量和显存压力；同时仍然通过在线采样探索当前策略附近的新回答。策略目标通常继续采用概率比裁剪，并配合 KL 正则。

组相对优势也有局限：如果同组回答奖励完全相同，归一化后几乎没有有效学习信号；组大小、采样多样性和奖励可区分性会直接影响梯度质量。

## 三种方法怎么选

| 维度 | PPO | DPO | GRPO |
| --- | --- | --- | --- |
| 数据来源 | 在线 rollout | 离线偏好对 | 在线分组 rollout |
| 优势信号 | Critic / GAE | 隐式偏好差 | 组内归一化奖励 |
| 是否需要 Critic | 是 | 否 | 否 |
| 显式奖励模型 | 通常需要 | 不需要 | 规则或模型奖励均可 |
| 训练成本 | 高 | 较低 | 介于 DPO 与 PPO 之间 |
| 探索新行为 | 强 | 弱 | 强 |

我的选择原则是：

1. 有高质量偏好对、算力有限，先用 DPO 建立稳定基线；
2. 奖励可自动验证，并希望模型探索新推理路径，优先考虑 GRPO；
3. 需要细粒度价值估计、奖励结构复杂且资源充足，再考虑 PPO；
4. 对 Agentic RAG 这类多步决策任务，不能只看最终答案，应进一步区分查询、证据选择和停止决策的过程奖励。

## 容易混淆的几点

- **DPO 不是没有参考模型**：参考策略仍然出现在概率比中，只是不需要显式 Reward Model；
- **GRPO 不是纯监督学习**：它需要当前策略在线采样并根据奖励更新；
- **去掉 Critic 不等于没有优势函数**：GRPO 用同组样本的相对奖励构造优势；
- **奖励越多不一定越好**：多个奖励的量纲、稀疏性和冲突会改变优化方向；
- **结果奖励不等于过程奖励**：前者判断答案对错，后者定位推理轨迹中的具体决策质量。

在我的 Agentic RAG 研究中，接下来更关心的是如何让过程奖励真正区分“相关但无用的证据”和“能推进当前推理状态的证据”，以及如何避免奖励模型只学习表面格式。

## 原始论文

- [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)
- [DeepSeekMath / Group Relative Policy Optimization](https://arxiv.org/abs/2402.03300)

