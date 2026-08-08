---
title: LeetCode 题型框架：滑动窗口与二分边界
date: 2026-01-15 20:00:00
updated: 2026-08-09 00:10:00
categories:
  - 算法笔记
  - LeetCode
tags:
  - 滑动窗口
  - 二分查找
  - 双指针
  - Python
description: 从题目识别信号出发，整理可变滑动窗口、左右边界二分与答案二分的统一模板和常见陷阱。
math: true
banner_img: /img/hero-ai-lab.png
og_img: /img/hero-ai-lab.png
---

<span class="source-badge">LOCAL NOTE · REWRITTEN & SANITIZED</span>

滑动窗口和二分查找看起来是两套模板，实质上都在利用结构避免无效枚举：滑动窗口利用连续区间状态可增量更新，二分查找利用判定函数的单调性排除一半搜索空间。

<!-- more -->

## 什么时候想到滑动窗口

当题目同时出现以下信号时，应优先考虑滑动窗口：

- 研究对象是连续子数组或子串；
- 需要最长、最短、数量或是否存在；
- 右端点移动后，窗口状态可以 $O(1)$ 或均摊 $O(1)$ 更新；
- 窗口失效后，移动左端点有机会恢复合法性。

可变长度窗口的统一框架是：

```python
def sliding_window(values):
    left = 0
    state = {}
    answer = 0

    for right, value in enumerate(values):
        # 1. 将 values[right] 加入窗口并更新 state
        add(state, value)

        # 2. 当前窗口不合法时收缩左边界
        while left <= right and needs_shrink(state):
            remove(state, values[left])
            left += 1

        # 3. 在题目要求的时机更新答案
        answer = update(answer, left, right, state)

    return answer
```

写代码前只回答三个问题：右指针加入什么状态、何时收缩左指针、答案在扩张前还是收缩后更新。

## 两类典型题

### 最小覆盖子串

LeetCode 76 的窗口状态不是“有哪些字符”，而是每个目标字符还缺多少个。右端点扩张负责补足需求；当所有需求满足后，左端点持续收缩以寻找最短可行窗口。

容易犯的错误是每次都比较两个完整哈希表。更好的做法是维护一个 `valid` 计数，只在某个字符的频次刚好达到需求时增加，在离开需求状态时减少。

### 找到字符串中所有异位词

LeetCode 438 的窗口长度固定为目标串长度。右端点每前进一步，若窗口过长就同步移动左端点；当窗口长度正确且字符计数满足要求时记录起点。

固定窗口与可变窗口的区别，是左指针的移动条件来自“长度”还是“合法性”。

## 二分查找首先统一区间定义

多数边界错误不是 `mid` 算错，而是搜索区间的定义前后不一致。使用左闭右开区间 $[left,right)$ 时：

- 初始化为 `left = 0, right = len(nums)`；
- 循环条件是 `left < right`；
- 排除 `mid` 及其右侧时写 `right = mid`；
- 排除 `mid` 及其左侧时写 `left = mid + 1`。

```python
def lower_bound(nums, target):
    left, right = 0, len(nums)
    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left
```

这个函数返回第一个满足 `nums[i] >= target` 的位置。即使 `target` 不存在，返回值仍然是合法插入位置。

```python
def upper_bound(nums, target):
    left, right = 0, len(nums)
    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] <= target:
            left = mid + 1
        else:
            right = mid
    return left
```

`upper_bound(nums, target) - 1` 才是最后一个小于等于 `target` 的位置。访问前还要检查索引是否越界以及元素是否真的等于目标值。

## 二分答案：数组不一定有序

二分的对象不一定是数组元素，也可以是一个答案空间。只要能定义关于答案 $x$ 的单调判定函数 `feasible(x)`，就能寻找第一个可行值：

```python
def first_feasible(low, high, feasible):
    # 搜索区间为 [low, high)
    while low < high:
        mid = low + (high - low) // 2
        if feasible(mid):
            high = mid
        else:
            low = mid + 1
    return low
```

常见题型包括最小运载能力、最小完成时间、最大化最小距离。解题关键不是背模板，而是明确：

1. 自变量 $x$ 的上下界是什么；
2. `feasible(x)` 是否单调；
3. 要找第一个可行值，还是最后一个可行值；
4. 边界是否可能没有答案。

## 两种技巧的共同点

| 技巧 | 可利用的结构 | 被省略的枚举 |
| --- | --- | --- |
| 滑动窗口 | 连续区间状态可增量维护 | 所有 $O(n^2)$ 子区间 |
| 二分边界 | 有序序列 | 一半候选位置 |
| 二分答案 | 判定函数单调 | 一半答案空间 |

做题时先证明结构成立，再写模板。模板负责减少代码错误，证明才决定算法是否适用。

