# proveautonomy.github.io

## 文章版型

文章的 front matter 設定 `layout: post` 即會使用科技風格版型。
標題區使用 `title`、`description`、`date`、`author`、`categories` 與 `tags`。

- `_layouts/post.html`：文章結構與品牌圖片。
- `assets/css/article.css`：文章配色、桌面／手機版與列印樣式。
- `assets/js/article.js`：自動建立二級標題目錄、閱讀進度與流程步驟。
- `assets/images/logo-banner.png`：頁首品牌橫幅。
- `assets/images/logo-proveautonomy.png`：文末品牌圖示。

正文維持 Markdown。`##` 標題會自動出現在目錄中；程式碼區塊內以單獨一行
`↓` 串接的流程，會顯示成可換行的步驟卡片。停用 JavaScript 時仍可閱讀完整原文。
首頁 `index.md` 使用 `layout: tech-home`，共用文章的品牌樣式，並以卡片列出最新文章。
`topics` 設定首頁主題標籤，`assets/css/home.css` 管理首頁專屬排版。

## 數學公式

含公式的文章在 front matter 加上 `math: true`。使用 Kramdown 支援的 `$$`：
行內寫成 `位置為 $$(x_t, y_t)$$`；獨立公式則將前後 `$$` 各放一行，區塊前後留空行。
MathJax 3.2.2 由 jsDelivr 載入，將公式排版成 SVG；需有 JavaScript 與網路連線。
`assets/js/mathjax-config.js` 同時支援 Kramdown 新舊版本的公式 HTML 輸出。
