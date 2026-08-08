---
title: Agentic RAG：从结果监督走向过程奖励
date: 2026-08-07 20:30:00
updated: 2026-08-08 09:00:00
categories:
  - 科研札记
  - Agentic RAG
tags:
  - RAG
  - LLM
  - Reinforcement Learning
mermaid: true
banner_img: /img/hero-ai-lab.png
og_img: /img/hero-ai-lab.png
---

复杂问答中的 Agentic RAG 不只是“检索一次再回答”。模型需要持续判断当前证据是否足够、下一次应该检索什么，以及什么时候停止。只给最终答案奖励，往往难以定位中间步骤在哪里发生了偏移。

<!-- more -->

## 常见失效模式

当前研究重点关注以下过程错误：

- 子问题重复或逐步偏离原问题；
- 缺少连接多条证据的桥接实体；
- 检索文档相关但无法支持当前推断；
- 中间答案缺少证据支撑；
- 在证据链尚未闭合时过早停止。

## 过程视角

{% mermaid %}
flowchart LR
  Q[Original Question] --> S[State]
  S --> G[Generate Query]
  G --> R[Retrieve Evidence]
  R --> J[Judge Utility]
  J -->|insufficient| S
  J -->|sufficient| A[Answer]
{% endmermaid %}

一个检索状态不仅包含原问题，还应包含历史子问题、已有证据、当前查询和候选文档。过程奖励因此可以分别评价查询选择、证据选择与停止决策。

## 公开代码

- [SAPR-RAG](https://github.com/linshenggithub/SAPR-RAG)：面向复杂问答的状态感知过程奖励研究工作区。

后续笔记会继续记录基线复现、错误分类、轨迹数据构造和消融实验。
