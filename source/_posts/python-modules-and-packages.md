---
title: Python 模块与包：从 import 到 __all__
date: 2024-03-01 17:44:59
updated: 2026-08-08 23:20:00
categories:
  - 学习笔记
  - Python
tags:
  - Python
  - 模块化
  - 工程基础
description: 梳理 Python 模块、包、__name__、__all__ 与第三方依赖管理的基本机制。
banner_img: /img/hero-ai-lab.png
og_img: /img/hero-ai-lab.png
---

<span class="source-badge">CSDN MIGRATION · REVISED</span>

这篇笔记最初发布于 [CSDN](https://blog.csdn.net/qq_51059141/article/details/136401285)，本次迁移重新整理了结构，并补充了更完整的代码示例。

<!-- more -->

## 模块是什么

在 Python 中，一个 `.py` 文件就是一个模块。模块可以包含变量、函数、类，也可以包含能够直接执行的语句。

将相关功能拆分到模块中主要有三个好处：

1. 降低单个文件的复杂度；
2. 复用已经实现的函数和类；
3. 让多人协作时的代码边界更清楚。

例如，建立一个 `calculator.py`：

```python
def add(a: float, b: float) -> float:
    return a + b
```

可以在另一个文件中导入并使用：

```python
from calculator import add

result = add(2, 3)
print(result)
```

## 导入模块时发生了什么

模块第一次被导入时，Python 会执行该模块的顶层代码，并将模块对象缓存到 `sys.modules`。同一进程中再次导入时，通常会直接复用缓存。

常见的导入方式包括：

```python
import calculator
import calculator as calc
from calculator import add
```

一般不建议使用 `from module import *`，因为它会让名称来源变得不明确，也容易产生覆盖。

## `__name__` 与程序入口

当文件被直接运行时，它的 `__name__` 是 `"__main__"`；当文件作为模块被导入时，`__name__` 则是模块名。

因此，可以使用下面的结构隔离测试代码或命令行入口：

```python
def main() -> None:
    print("run as a program")


if __name__ == "__main__":
    main()
```

这样，其他文件导入该模块时不会自动执行 `main()`。

## 使用 `__all__` 声明公开接口

模块中的 `__all__` 用于声明 `from module import *` 时允许导出的名称：

```python
__all__ = ["add"]


def add(a, b):
    return a + b


def _debug():
    print("internal helper")
```

需要注意：`__all__` 不是访问控制机制。调用者依然可以显式导入未列入其中的名称。

## 包是什么

包用于组织多个模块，通常表现为一个目录：

```text
my_package/
├── __init__.py
├── preprocessing.py
└── metrics.py
```

导入包内成员时，可以写成：

```python
from my_package.preprocessing import clean_text
```

`__init__.py` 可以保持为空，也可以用于暴露包级别的公共接口：

```python
from .preprocessing import clean_text

__all__ = ["clean_text"]
```

虽然 Python 3.3 之后支持没有 `__init__.py` 的命名空间包，但普通项目中显式保留它通常更直观。

## 第三方包与依赖管理

标准库随 Python 一起安装；第三方包则需要通过包管理工具安装：

```bash
python -m pip install requests
```

使用 `python -m pip` 可以降低多 Python 环境下安装到错误解释器的概率。项目中还应使用虚拟环境隔离依赖：

```bash
python -m venv .venv
```

模块负责组织单个文件中的代码，包负责组织多个模块，而虚拟环境负责隔离项目依赖。把这三个层次区分清楚，Python 项目的结构会自然很多。

