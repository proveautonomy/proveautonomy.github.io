// Kramdown versions can emit either delimiters or legacy math/tex scripts.
// Normalize the latter before MathJax scans the article.
document.querySelectorAll('#article-content script[type^="math/tex"]').forEach(node => {
  const display = /mode=display/.test(node.type);
  const replacement = document.createElement(display ? 'div' : 'span');
  replacement.textContent = display ? `\\[${node.textContent}\\]` : `\\(${node.textContent}\\)`;
  node.replaceWith(replacement);
});
window.MathJax = {
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['\\[', '\\]']],
    processEscapes: true
  },
  svg: { fontCache: 'local' },
  startup: { elements: ['#article-content'] }
};
