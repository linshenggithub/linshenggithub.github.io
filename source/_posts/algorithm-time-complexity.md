---
title: 算法的时间复杂度分析
date: 2021-11-25 12:03:22
updated: 2026-08-08 09:30:00
categories:
  - 学习笔记
  - 数据结构与算法
tags:
  - 算法
  - 时间复杂度
  - 主定理
math: true
banner_img: /img/hero-ai-lab.png
og_img: /img/hero-ai-lab.png
---

<span class="source-badge">最初发布于 CSDN</span>

这是对原有公开文章的首版整理，主要记录渐近阶、和式估计、递归树、主定理与 Akra-Bazzi 定理。原文可在 [CSDN](https://blog.csdn.net/qq_51059141/article/details/121526518) 阅读。

<!-- more -->

## 渐近阶

当输入规模增大时，我们更关心运行时间增长的趋势，而不是某台机器上的具体秒数。常见记号包括：

- $O(g(n))$：渐近上界；
- $\Omega(g(n))$：渐近下界；
- $\Theta(g(n))$：渐近紧确界。

## 和式估计

分析循环时，经常需要估计求和。例如调和级数满足：

$$
\sum_{k=1}^{n}\frac{1}{k}=\Theta(\log n)
$$

常见方法包括放缩、积分近似，以及对相邻项比值的分析。

## 递归方程

对于分治算法，典型递归式可以写成：

$$
T(n)=aT\left(\frac{n}{b}\right)+f(n)
$$

主定理通过比较 $f(n)$ 与 $n^{\log_b a}$ 的增长速度给出复杂度。不能直接使用主定理时，可以继续考虑递归树、代入证明或适用范围更广的 Akra-Bazzi 定理。

## 后续整理

后续迁移会补回原文中的推导图片，并将图片公式逐步转换为可检索的 LaTeX。
