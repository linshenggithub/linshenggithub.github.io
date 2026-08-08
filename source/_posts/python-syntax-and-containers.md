---
title: Python 语法与常用容器速查
date: 2026-08-08 22:30:00
updated: 2026-08-08 22:30:00
categories:
  - 学习笔记
  - Python
tags:
  - Python
  - 数据结构
  - ACM
description: 从本地学习笔记整理的 Python 语法、容器、拷贝语义、迭代工具与 ACM 输入模板速查。
banner_img: /img/hero-ai-lab.png
og_img: /img/hero-ai-lab.png
---

<span class="source-badge">LOCAL NOTE · SANITIZED</span>

这是一份从本地学习记录中整理出来的 Python 速查笔记，主要覆盖日常算法练习和工程代码中容易混淆的语法点。

<!-- more -->

## 常用容器如何选择

### `list`：动态数组

- 随机访问是 $O(1)$；
- 尾部 `append` 与 `pop` 通常是 $O(1)$；
- 头部插入和删除需要移动元素，是 $O(n)$。

列表也可以直接模拟栈：

```python
stack = []
stack.append(1)  # push
top = stack[-1]
value = stack.pop()
```

### `deque`：双端队列

`collections.deque` 适合频繁操作两端：

```python
from collections import deque

queue = deque([1, 2])
queue.append(3)
queue.appendleft(0)
left = queue.popleft()
right = queue.pop()
```

两端操作是 $O(1)$，但它不适合大量随机访问。

### `heapq`：最小堆

堆是实现优先队列的常用数据结构：

```python
import heapq

heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
minimum = heapq.heappop(heap)
```

Python 标准库提供最小堆。如果需要最大堆，常见做法是存入相反数。

### `Counter`：计数字典

```python
from collections import Counter

counter = Counter("abac")
print(counter["a"])  # 2
```

## 切片

Python 的切片语法是 `[start:stop:step]`，其中 `stop` 不包含在结果中。

```python
values = [0, 1, 2, 3, 4]

print(values[1:4])   # [1, 2, 3]
print(values[::2])   # [0, 2, 4]
print(values[::-1])  # [4, 3, 2, 1, 0]
```

当 `step` 为负数时，切片从后向前读取，这也是 `[::-1]` 可以反转序列的原因。

## `==` 与 `is`

- `==` 比较两个对象的值；
- `is` 比较两个变量是否指向同一个对象。

```python
a = [1, 2]
b = [1, 2]
c = a

print(a == b)  # True
print(a is b)  # False
print(a is c)  # True
```

判断是否为 `None` 时应使用 `is None`。

## 可变对象与参数传递

Python 传递的是对象引用。函数能否影响外部变量，取决于对象是否可变以及函数进行了“修改”还是“重新绑定”。

```python
def append_item(values):
    values.append(3)  # 修改同一个列表


def replace_list(values):
    values = [9, 9]   # 只重新绑定局部变量
```

`list`、`dict` 和 `set` 是可变对象；数字、字符串和元组通常是不可变对象。

## 浅拷贝与深拷贝

直接赋值只会增加一个引用：

```python
a = [[1], [2]]
b = a
```

浅拷贝会创建新的外层容器，但内部元素仍然共享：

```python
import copy

a = [[1], [2]]
b = copy.copy(a)
a[0].append(3)
print(b)  # [[1, 3], [2]]
```

深拷贝会递归复制内部对象：

```python
c = copy.deepcopy(a)
```

## 迭代工具

### `enumerate`

为迭代对象同时提供索引和值：

```python
for index, value in enumerate(["a", "b"], start=1):
    print(index, value)
```

### `zip`

按位置组合多个迭代对象：

```python
names = ["alice", "bob"]
scores = [90, 85]

for name, score in zip(names, scores):
    print(name, score)
```

### 列表推导式

```python
squares = [x * x for x in range(10) if x % 2 == 0]
matrix = [[j for j in range(3)] for _ in range(3)]
```

推导式适合简单变换；当逻辑包含多层条件或副作用时，普通循环通常更易读。

## 删除列表元素

| 写法 | 按什么删除 | 是否返回元素 |
| --- | --- | --- |
| `values.remove(x)` | 第一个匹配的值 | 否 |
| `del values[i]` | 索引或切片 | 否 |
| `values.pop(i)` | 索引，默认末尾 | 是 |

## 装饰器的基本结构

装饰器接收一个函数，并返回包装后的函数：

```python
from functools import wraps


def trace(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"calling {func.__name__}")
        return func(*args, **kwargs)

    return wrapper


@trace
def add(a, b):
    return a + b
```

`functools.wraps` 可以保留原函数的名称和文档信息。

## ACM 输入模板

### 读取到 EOF

```python
import sys

for line in sys.stdin:
    a, b = map(int, line.split())
    print(a + b)
```

### 读取 $T$ 组数据

```python
import sys

input = sys.stdin.readline
t = int(input())

for _ in range(t):
    n = int(input())
    values = list(map(int, input().split()))
    print(sum(values[:n]))
```

`for line in sys.stdin` 适合读到 EOF；`sys.stdin.readline` 则更适合需要严格控制读取顺序的题目。
