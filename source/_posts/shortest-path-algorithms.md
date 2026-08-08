---
title: 最短路算法：Bellman-Ford、Dijkstra 与 Floyd
date: 2021-11-30 23:05:45
updated: 2026-08-09 00:10:00
categories:
  - 算法笔记
  - 图论
tags:
  - 最短路径
  - Bellman-Ford
  - Dijkstra
  - Floyd
  - LeetCode
description: 从松弛操作出发，比较 Bellman-Ford、Dijkstra 与 Floyd 的适用条件，并分析限制中转次数的最短路问题。
math: true
mermaid: true
banner_img: /img/hero-ai-lab.png
og_img: /img/hero-ai-lab.png
---

<span class="source-badge">CSDN MIGRATION · REWRITTEN</span>

这篇笔记最初发布于 [CSDN](https://blog.csdn.net/qq_51059141/article/details/121210395)。本次迁移保留了“松弛与正确性”的主线，重新整理了算法边界，并把伪代码改写为可运行的 Python 模板。

<!-- more -->

## 最短路的共同语言：松弛

若当前已知源点到 $u$ 的距离为 $d[u]$，边 $(u,v)$ 的权重为 $w(u,v)$，则一次松弛操作是：

$$
d[v] \leftarrow \min\left(d[v], d[u]+w(u,v)\right).
$$

三类经典最短路算法的差异，在于**按什么顺序选择节点或中间点，以及需要重复多少次松弛**。

{% mermaid %}
flowchart TD
  A[最短路径问题] --> B{需要所有点对吗}
  B -->|是| F[Floyd]
  B -->|否| C{存在负权边吗}
  C -->|是| D[Bellman-Ford]
  C -->|否| E[Dijkstra]
  D --> G{限制边数或中转次数}
  G -->|是| H[分轮松弛并保存上一轮距离]
{% endmermaid %}

## Bellman-Ford：允许负权边

Bellman-Ford 对所有边重复执行松弛。若图中不存在从源点可达的负权环，一条最短简单路径最多包含 $|V|-1$ 条边，因此经过 $|V|-1$ 轮后所有最短距离都会确定。

```python
from math import inf


def bellman_ford(n, edges, source):
    dist = [inf] * n
    dist[source] = 0

    for _ in range(n - 1):
        changed = False
        for u, v, weight in edges:
            if dist[u] != inf and dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                changed = True
        if not changed:
            break

    for u, v, weight in edges:
        if dist[u] != inf and dist[u] + weight < dist[v]:
            raise ValueError("negative cycle is reachable from source")

    return dist
```

时间复杂度是 $O(VE)$，空间复杂度是 $O(V)$。它比 Dijkstra 慢，但能处理负权边，还能通过第 $V$ 轮是否继续松弛来检测负权环。

## 限制 K 次中转为何要复制数组

“最多经过 $K$ 个中转站”意味着路径最多包含 $K+1$ 条边。此时每一轮只能使用上一轮已经确定的距离，否则同一轮内连续更新会偷偷使用多条边，破坏边数约束。

```python
from math import inf


def cheapest_flight(n, flights, source, target, max_stops):
    dist = [inf] * n
    dist[source] = 0

    for _ in range(max_stops + 1):
        previous = dist.copy()
        for u, v, price in flights:
            if previous[u] != inf:
                dist[v] = min(dist[v], previous[u] + price)

    return -1 if dist[target] == inf else dist[target]
```

这里复制数组不是实现细节，而是在显式表达动态规划状态：第 $i$ 轮只允许使用不超过 $i$ 条边的路径。

## Dijkstra：非负权图上的贪心

Dijkstra 每次从尚未确定的节点中取出当前距离最小者。因为所有边权非负，后续经过更远节点绕回来不可能让它更短，所以该节点可以立即“收敛”。

```python
import heapq
from math import inf


def dijkstra(graph, source):
    dist = [inf] * len(graph)
    dist[source] = 0
    heap = [(0, source)]

    while heap:
        current_dist, node = heapq.heappop(heap)
        if current_dist != dist[node]:
            continue

        for neighbor, weight in graph[node]:
            candidate = current_dist + weight
            if candidate < dist[neighbor]:
                dist[neighbor] = candidate
                heapq.heappush(heap, (candidate, neighbor))

    return dist
```

使用邻接表和二叉堆时，复杂度通常写作 $O((V+E)\log V)$。代码中的过期状态判断很重要：堆中可能同时存在同一节点的新旧距离，而 Python 的 `heapq` 不提供原地 decrease-key。

## Floyd：所有点对最短路

Floyd-Warshall 使用动态规划。令 $d^{(k)}[i][j]$ 表示只允许前 $k$ 个节点作为中间点时，从 $i$ 到 $j$ 的最短距离，则：

$$
d^{(k)}[i][j] = \min\left(
d^{(k-1)}[i][j],
d^{(k-1)}[i][k] + d^{(k-1)}[k][j]
\right).
$$

```python
def floyd_warshall(dist):
    n = len(dist)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    return dist
```

它的时间复杂度是 $O(V^3)$、空间复杂度是 $O(V^2)$，适合节点数较小且需要频繁查询任意点对距离的场景。

## 选择速查

| 场景 | 算法 | 关键限制 |
| --- | --- | --- |
| 单源、边权非负 | Dijkstra | 负权边会破坏贪心收敛 |
| 单源、允许负权边 | Bellman-Ford | 需排除可达负权环 |
| 限制路径边数 | 分轮 Bellman-Ford | 每轮必须读取上一轮状态 |
| 所有点对最短路 | Floyd-Warshall | $O(V^3)$，适合较小图 |
| 无权图最短路 | BFS | 每条边权可视为 1 |

真正需要记住的不是四份模板，而是三个判断：是否有负权、查询是单源还是多源、路径是否带边数约束。

