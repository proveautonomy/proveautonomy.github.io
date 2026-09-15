(() => {
  'use strict';
  const article = document.getElementById('article-content');
  if (!article) return;
  const headings = [...article.querySelectorAll('h2')];
  const toc = document.getElementById('article-toc');
  const links = headings.map((heading, index) => {
    if (!heading.id) heading.id = `section-${index + 1}`;
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${encodeURIComponent(heading.id)}`;
    link.textContent = heading.textContent;
    item.append(link);
    toc.append(item);
    return link;
  });
  document.getElementById('article-sidebar').hidden = !headings.length;

  // Turn the author's plain-text downward flows into semantic, wrapping steps.
  article.querySelectorAll('pre').forEach(pre => {
    const lines = pre.textContent.trim().split('\n').map(line => line.trim());
    if (lines.length < 3 || lines.length % 2 === 0) return;
    if (!lines.every((line, index) => index % 2 ? line === '↓' : line && !/[↓↕]/.test(line))) return;
    const flow = document.createElement('ol');
    flow.className = 'visual-flow';
    flow.setAttribute('aria-label', '流程步驟');
    lines.filter((_, index) => index % 2 === 0).forEach(label => {
      const step = document.createElement('li');
      const text = document.createElement('span');
      text.textContent = label;
      step.append(text);
      flow.append(step);
    });
    const wrapper = pre.closest('div.highlighter-rouge');
    (wrapper || pre).replaceWith(flow);
  });

  const progress = document.getElementById('reading-progress');
  let scheduled = false;
  const update = () => {
    const bounds = article.getBoundingClientRect();
    const distance = Math.max(1, bounds.height - window.innerHeight);
    const fraction = Math.min(1, Math.max(0, -bounds.top / distance));
    progress.style.transform = `scaleX(${fraction})`;
    let active = -1;
    headings.forEach((heading, index) => {
      if (heading.getBoundingClientRect().top <= 140) active = index;
    });
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(article);
  update();
})();
