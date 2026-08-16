---
title: 关于我
layout: page
banner_img: /img/hero-ai-lab.png
banner_img_height: 18
banner_mask_alpha: 0.08
comment: false
description: Ma Yi 的个人学术主页，研究方向包括 Agentic RAG、大模型强化学习后训练、LLM4Rec 与数据集蒸馏。
---

<div class="academic-home academic-home--v2" id="home">
  <nav class="section-jump" aria-label="页面目录">
    <a href="#home">主页</a>
    <a href="#updates">动态</a>
    <a href="#research">研究成果</a>
    <a href="#experience">实习经历</a>
    <a href="#education">教育背景</a>
    <a href="#skills">技术能力</a>
  </nav>

  <section class="academic-intro academic-intro--profile" aria-labelledby="profile-name">
    <div class="academic-intro__body">
      <span class="academic-kicker">M.ENG. CANDIDATE · LARGE LANGUAGE MODELS</span>
      <h1 id="profile-name">Ma Yi</h1>
      <p class="academic-affiliation">哈尔滨工业大学（深圳） · 电子信息（计算机技术）</p>
      <p>现为哈尔滨工业大学（深圳）硕士研究生，研究聚焦于复杂推理场景下大语言模型的知识获取、决策优化与可靠评估。主要研究兴趣包括 <strong>Agentic RAG、大模型强化学习后训练、LLM4Rec 与数据集蒸馏</strong>。</p>
      <p>当前工作围绕多步检索轨迹建模、过程奖励设计与策略优化展开，旨在通过监督微调、偏好学习和在线强化学习，提高智能体在开放域问答与真实业务任务中的稳定性、可控性和可解释性。</p>
      <div class="academic-links" aria-label="学术与个人链接">
        <a href="mailto:24S151146@stu.hit.edu.cn">Email</a>
        <a href="https://github.com/linshenggithub" target="_blank" rel="noopener">GitHub</a>
        <a href="https://ieeexplore.ieee.org/abstract/document/11434971" target="_blank" rel="noopener">IEEE Xplore</a>
        <a href="/projects/">Research</a>
        <a href="/blog/">Notes</a>
      </div>
    </div>
    <figure class="academic-intro__visual academic-avatar">
      <img src="/img/avatar-ma-yi.png" alt="Ma Yi 的二次元头像">
    </figure>
  </section>

  <section class="academic-section" id="updates">
    <div class="academic-heading">
      <span>NEWS</span>
      <h2>最新动态</h2>
    </div>
    <ol class="update-list update-list--dated">
      <li><time datetime="2026">2026</time><span><strong>RoP</strong> 已被 <em>IEEE Transactions on Circuits and Systems for Video Technology</em> 接收，IEEE Xplore 页面已上线。<a href="https://ieeexplore.ieee.org/document/11586102/" target="_blank" rel="noopener">Paper</a></span></li>
      <li><time datetime="2026">2026</time><span><strong>D3M</strong> 发表在 <em>IEEE Transactions on Multimedia</em>（CCF-A）。<a href="https://ieeexplore.ieee.org/abstract/document/11434971" target="_blank" rel="noopener">Paper</a></span></li>
      <li><time datetime="2026-06">2026.06</time><span>完成 LLM4Rec 用户行为仿真与推荐归因研究，在多源特征建模、后训练及评估闭环方面形成系统实践。</span></li>
      <li><time datetime="2026-03">2026.03</time><span>完成财务表格智能问答方案优化，构建受约束代码生成与执行流程，并通过生产评审。</span></li>
    </ol>
  </section>

  <section class="academic-section" id="research">
    <div class="academic-heading">
      <span>SELECTED RESEARCH</span>
      <h2>论文与研究</h2>
    </div>
    <article class="publication-entry publication-entry--featured">
      <div class="publication-entry__index">01</div>
      <div class="publication-entry__body">
        <p class="publication-entry__venue">IEEE TRANSACTIONS ON MULTIMEDIA · CCF-A</p>
        <h3>D3M：基于扩散模型的原型表示数据集蒸馏</h3>
        <p class="publication-entry__authors"><strong>Ma Yi</strong> · 共同第一作者</p>
        <p class="publication-entry__summary">针对大规模图像数据训练成本高与传统蒸馏方法跨架构泛化不足的问题，在扩散模型潜空间中构造兼具代表性与多样性的原型表示，并通过加噪与去噪过程生成高信息密度的蒸馏图像。在 16% 压缩率下达到原始数据训练效果的 91%，相较对比方法平均提升约 4%。</p>
        <div class="publication-entry__links">
          <a href="https://ieeexplore.ieee.org/abstract/document/11434971" target="_blank" rel="noopener">IEEE Xplore</a>
          <a href="/notes/2024/12/generative-dataset-distillation-reading/">Research Note</a>
          <a href="/projects/#publications">Project Summary</a>
        </div>
      </div>
    </article>
    <article class="publication-entry">
      <div class="publication-entry__index">02</div>
      <div class="publication-entry__body">
        <p class="publication-entry__venue">IEEE TRANSACTIONS ON CIRCUITS AND SYSTEMS FOR VIDEO TECHNOLOGY · ACCEPTED</p>
        <h3>Robust Dataset Pruning via Joint Noise-Aware Discrimination and Re-Labeling</h3>
        <p class="publication-entry__authors">Weiwei Xiao, <strong>Ma Yi</strong>, Shaocong Wu, Qihen Shan, Yaowei Wang, Jingyong Su</p>
        <p class="publication-entry__summary">针对标签噪声场景下数据集剪枝难以区分困难样本与错标样本的问题，提出两阶段 Robust Pruning（RoP）框架：结合标签分布差异、特征与标签传播识别噪声样本，并对保留子集重新标注，以降低模型对噪声标签的过拟合。</p>
        <div class="publication-entry__links">
          <a href="https://ieeexplore.ieee.org/document/11586102/" target="_blank" rel="noopener">IEEE Xplore</a>
          <a href="https://doi.org/10.1109/TCSVT.2026.3708310" target="_blank" rel="noopener">Official DOI</a>
          <a href="/projects/#publications">Project Summary</a>
        </div>
      </div>
    </article>
    <h3 class="academic-subheading">研究方向</h3>
    <div class="research-agenda">
      <article>
        <span>01</span>
        <div><h4>Agentic RAG</h4><p>研究多步检索问答中的查询漂移、证据链断裂与过早停止问题，重点关注状态感知证据效用、子问题矫正和过程奖励建模。</p><a href="https://github.com/linshenggithub/SAPR-RAG" target="_blank" rel="noopener">SAPR-RAG</a></div>
      </article>
      <article>
        <span>02</span>
        <div><h4>LLM Post-training</h4><p>围绕 SFT、DPO、GRPO 与过程监督构建后训练流程，分析数据分布、奖励设计和策略更新对模型推理行为的影响。</p><a href="/notes/2026/03/ppo-dpo-grpo-notes/">RL Notes</a></div>
      </article>
      <article>
        <span>03</span>
        <div><h4>Dataset Distillation</h4><p>探索生成模型先验、潜空间优化和软标签在高压缩率数据集蒸馏中的作用，关注信息密度、跨架构性与规模化能力。</p><a href="/categories/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E6%95%B0%E6%8D%AE%E9%9B%86%E8%92%B8%E9%A6%8F/">Reading Notes</a></div>
      </article>
      <article>
        <span>04</span>
        <div><h4>LLM4Rec</h4><p>以大语言模型建模用户画像、兴趣演化与行为序列，研究推荐仿真、归因解释和基于 Rubric 奖励的推理质量优化。</p><a href="/projects/#internship-projects">Project Summary</a></div>
      </article>
    </div>
  </section>

  <section class="academic-section" id="experience">
    <div class="academic-heading">
      <span>EXPERIENCE</span>
      <h2>实习经历</h2>
    </div>
    <div class="academic-timeline">
      <article class="experience-entry">
        <div class="experience-entry__meta"><time>2026.03 – 2026.06</time><span>深圳</span></div>
        <div class="experience-entry__body">
          <h3>字节跳动</h3>
          <p class="experience-entry__role">大模型算法实习生 · Data · 抖音 · 内容技术</p>
          <ul>
            <li>面向推荐系统的用户仿真与归因需求，融合用户画像、多尺度兴趣与历史行为序列，构建基于 Qwen 系列模型的 LLM4Rec 训练与推理框架。</li>
            <li>完成大规模用户数据处理、模型选型和消融实验；4B 模型达到 ACC 0.764、AUC 0.789，相较基线提升 20 余个百分点。</li>
            <li>构建结构化监督数据与多裁判 Rubric 评估体系，结合 SFT、RFT、DPO 与 GRPO 优化归因解释质量。</li>
          </ul>
        </div>
      </article>
      <article class="experience-entry">
        <div class="experience-entry__meta"><time>2025.12 – 2026.03</time><span>深圳</span></div>
        <div class="experience-entry__body">
          <h3>智谱 AI</h3>
          <p class="experience-entry__role">大模型算法实习生 · 华南交付</p>
          <ul>
            <li>负责财务表格智能问答模块的算法选型与优化，系统比较直接推理、工具调用与代码解释器等方案。</li>
            <li>设计受约束代码生成与执行的两阶段流程，并建立 bad case 分析、提示策略与后处理规则的迭代闭环。</li>
            <li>优化方案在真实用户数据上达到 100% 准确率，相较基线提升 53%，并通过评审进入生产环境。</li>
          </ul>
        </div>
      </article>
    </div>
  </section>

  <section class="academic-section" id="education">
    <div class="academic-heading">
      <span>EDUCATION & HONORS</span>
      <h2>教育背景与荣誉</h2>
    </div>
    <div class="education-list">
      <article>
        <div class="education-list__date">2024.08 – 2027.06</div>
        <div><h3>哈尔滨工业大学（深圳）</h3><p class="education-list__degree">电子信息（计算机技术） · 硕士</p><p>研究方向：RAG、Agentic RL 与数据集蒸馏；专业排名前 15%，获学业一等奖学金。</p></div>
      </article>
      <article>
        <div class="education-list__date">2020.09 – 2024.06</div>
        <div><h3>哈尔滨工业大学（深圳）</h3><p class="education-list__degree">计算机科学与技术 · 本科</p><p>系统学习数据结构、计算机系统、数据库、高级算法与机器学习；专业排名前 15%，获学业一等奖学金。</p></div>
      </article>
    </div>
    <div class="honor-list" aria-label="荣誉奖励">
      <div><time>2021</time><span>全国大学生数学建模竞赛 · 广东省三等奖</span></div>
      <div><time>在校期间</time><span>多次获得校级一、二等奖学金</span></div>
    </div>
  </section>

  <section class="academic-section" id="skills">
    <div class="academic-heading">
      <span>TECHNICAL PROFILE</span>
      <h2>技术能力</h2>
    </div>
    <dl class="technical-profile">
      <div><dt>Research</dt><dd>Agentic RAG、LLM 后训练、强化学习、数据集蒸馏、LLM4Rec</dd></div>
      <div><dt>Training</dt><dd>PyTorch、Llama-Factory、ms-swift、LoRA / PEFT、DeepSpeed、Megatron</dd></div>
      <div><dt>Inference</dt><dd>vLLM、结构化生成、工具调用、代码解释器、检索与重排</dd></div>
      <div><dt>Engineering</dt><dd>Python、C、Linux、大规模数据处理、分布式训练与实验评估</dd></div>
    </dl>
    <div class="academic-closing-links">
      <a href="/projects/">科研项目</a>
      <a href="/categories/">笔记分类</a>
      <a href="https://github.com/linshenggithub" target="_blank" rel="noopener">GitHub</a>
    </div>
  </section>
</div>
