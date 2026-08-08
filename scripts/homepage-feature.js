'use strict';

const cheerio = require('cheerio');

const featuredOverview = `
  <div class="home-intro">
    <p class="home-intro__lead">这里既是一份大模型算法作品集，也是一座持续生长的知识花园。项目记录我做成过什么，笔记记录我如何理解问题。</p>
    <div class="home-module-grid">
      <a class="home-module" href="/projects/">
        <span class="home-module__mark">01</span>
        <strong>代表项目</strong>
        <small>Agentic RAG、LLM4Rec、表格智能问答与数据集蒸馏。</small>
      </a>
      <a class="home-module" href="/archives/">
        <span class="home-module__mark">02</span>
        <strong>学习笔记</strong>
        <small>大模型、强化学习、算法基础与工程实践的长期记录。</small>
      </a>
      <a class="home-module" href="/research/">
        <span class="home-module__mark">03</span>
        <strong>研究与论文</strong>
        <small>研究问题、实验结论、论文与可复现材料。</small>
      </a>
    </div>
    <div class="stat-strip">
      <div class="stat-item"><strong>CCF-A</strong><span>IEEE TMM</span></div>
      <div class="stat-item"><strong>+34pt</strong><span>多跳问答提升</span></div>
      <div class="stat-item"><strong>100%</strong><span>业务测试准确率</span></div>
      <div class="stat-item"><strong>0.789</strong><span>LLM4Rec AUC</span></div>
    </div>
  </div>
`;

hexo.extend.filter.register('after_render:html', (html, data) => {
  if (data.path !== 'index.html') return html;

  const $ = cheerio.load(html, { decodeEntities: false });
  const featuredCard = $('.index-card').first();
  const excerpt = featuredCard.find('.index-excerpt').first();

  if (!featuredCard.length || !excerpt.length) return html;

  featuredCard.addClass('home-featured-card');
  excerpt.replaceWith(featuredOverview);
  return $.html();
});
