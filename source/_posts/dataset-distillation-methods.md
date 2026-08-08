---
title: 数据集蒸馏方法谱系：从双层优化到轨迹匹配
date: 2025-10-31 20:00:00
updated: 2026-08-08 23:00:00
categories:
  - 论文阅读
  - 数据集蒸馏
tags:
  - Dataset Distillation
  - Data-Centric AI
  - Gradient Matching
  - Trajectory Matching
description: 从优化目标出发，梳理数据集蒸馏中的双层优化、梯度匹配、分布匹配、轨迹匹配与规模化路线。
math: true
mermaid: true
banner_img: /img/hero-ai-lab.png
og_img: /img/hero-ai-lab.png
---

<span class="source-badge">LOCAL NOTE · REWRITTEN & SANITIZED</span>

数据集蒸馏的目标，是把大规模真实数据集压缩成少量可学习的合成样本，使模型仅在合成集上训练后，仍能获得接近真实数据训练的泛化能力。它与模型蒸馏不同：后者压缩模型知识，前者直接压缩训练数据中的有效信息。

<!-- more -->

## 问题定义

记真实训练集为 $\mathcal{T}$，待优化的合成集为 $\mathcal{S}$。最直接的双层优化写法是：

$$
\mathcal{S}^{*}=\arg\min_{\mathcal{S}}
\mathcal{L}_{\mathcal{T}}(\theta_{\mathcal{S}}),
\qquad
\theta_{\mathcal{S}}=\arg\min_{\theta}
\mathcal{L}_{\mathcal{S}}(\theta).
$$

内层用合成集训练模型，外层再用真实集衡量模型是否学到了正确知识。理想目标很清楚，但对完整训练过程求导会带来昂贵的高阶梯度、显存占用和训练不稳定问题。后续方法的演化，本质上是在寻找更便宜、更稳定的知识代理。

{% mermaid %}
flowchart LR
  R[真实数据集] --> K{需要保留的知识}
  K --> G[梯度]
  K --> F[特征分布]
  K --> T[训练轨迹]
  G --> S[优化合成数据]
  F --> S
  T --> S
  S --> E[训练新模型并跨架构评估]
{% endmermaid %}

## 梯度匹配：对齐单步学习方向

[Dataset Condensation with Gradient Matching](https://openreview.net/forum?id=mSAKhLYLSsl) 将问题改写为真实批次与合成批次对模型参数产生相似梯度：

$$
\min_{\mathcal{S}}
D\left(
\nabla_{\theta}\mathcal{L}_{\mathcal{T}}(\theta),
\nabla_{\theta}\mathcal{L}_{\mathcal{S}}(\theta)
\right).
$$

如果两组数据推动参数更新的方向一致，那么合成样本就保留了真实数据对当前模型最重要的训练信号。它比展开完整内层训练更直接，但仍然依赖网络初始化、训练架构和梯度距离的设计。

## 分布匹配：绕开训练过程

分布匹配不再追踪每一步参数更新，而是在随机特征空间中对齐真实数据与合成数据的类条件统计量。一个简化目标是：

$$
\min_{\mathcal{S}}
\sum_c
\left\|
\mathbb{E}_{x\sim\mathcal{T}_c}\phi_{\theta}(x)
-
\mathbb{E}_{s\sim\mathcal{S}_c}\phi_{\theta}(s)
\right\|_2^2.
$$

这条路线避免了昂贵的双层优化，训练速度更有优势。不过，均值或低阶统计量未必足以表达类内多样性，特征提取器的选择也会决定“分布”究竟保留了什么。

## 轨迹匹配：对齐长期训练动态

[Dataset Distillation by Matching Training Trajectories](https://arxiv.org/abs/2203.11932) 预先记录模型在真实数据上的专家轨迹，再让模型通过合成数据走向相近的参数状态。常见的归一化目标可写为：

$$
\mathcal{L}_{\text{MTT}}=
\frac{\left\|\hat{\theta}_{t+N}-\theta^{*}_{t+M}\right\|_2^2}
{\left\|\theta^{*}_{t}-\theta^{*}_{t+M}\right\|_2^2}.
$$

这里 $\theta^{*}$ 是真实数据训练得到的专家轨迹，$\hat{\theta}$ 是从同一状态出发、在合成数据上更新后的参数。与单步梯度匹配相比，它直接约束一段长期训练行为，但代价是专家轨迹的预训练、存储和多步反向传播。

## 方法差异

| 路线 | 匹配对象 | 主要优势 | 主要瓶颈 |
| --- | --- | --- | --- |
| 双层优化 | 最终真实集损失 | 目标最直接 | 高阶梯度昂贵且不稳定 |
| 梯度匹配 | 单步参数梯度 | 训练信号明确 | 对初始化和架构敏感 |
| 分布匹配 | 特征统计量 | 快，不必展开训练过程 | 可能损失类内结构 |
| 轨迹匹配 | 多步参数状态 | 捕获长期训练动态 | 轨迹存储与显存开销大 |

## 规模化为何困难

数据集蒸馏从 CIFAR 走向 ImageNet 时，困难不只是像素数量增加：

1. **优化变量变大**：分辨率和每类样本数上升会直接扩大合成数据参数量；
2. **训练图变长**：轨迹方法需要保存或重算多步计算图；
3. **标签信息不足**：大类别空间中，硬标签无法表达样本间细粒度关系；
4. **跨架构泛化**：在一个骨干网络上蒸馏出的高频模式，可能对另一个网络无效；
5. **评价成本高**：每组合成数据都需要从头训练多个模型才能可靠比较。

因此，后续工作逐渐引入恒定内存训练、软标签、生成模型先验以及数据生成与模型训练解耦等策略。

## 阅读时重点看什么

我更关注四个维度，而不只看单一准确率：

- **信息密度**：极低 IPC 下能保留多少任务相关信息；
- **跨架构性**：蒸馏架构与评估架构不一致时性能下降多少；
- **可扩展性**：能否处理高分辨率、深层网络和完整 ImageNet；
- **可解释性**：合成样本是在保存语义、梯度方向，还是某个网络特有的捷径。

这几个维度也解释了为什么生成式先验成为重要分支：它试图把优化空间从自由像素约束到更有语义结构的表示空间。

## 延伸阅读

- [Dataset Condensation with Gradient Matching](https://openreview.net/forum?id=mSAKhLYLSsl)
- [Dataset Distillation by Matching Training Trajectories](https://arxiv.org/abs/2203.11932)
- [Generalizing Dataset Distillation via Deep Generative Prior](https://openaccess.thecvf.com/content/CVPR2023/html/Cazenavette_Generalizing_Dataset_Distillation_via_Deep_Generative_Prior_CVPR_2023_paper.html)

