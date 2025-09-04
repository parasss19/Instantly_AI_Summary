function getArticleText() {
  //Prioritize <article>
  const article = document.querySelector('article');
  if (article) {
    return article.innerText.trim();
  }

  //Then <main>
  const main = document.querySelector('main');
  if (main) {
    const text = main.innerText.trim();
    if (text.length > 100) return text; // Lowered threshold, but check for content
  }

  //Fallback to <p> tags, but filter out short/empty ones
  const paragraphs = Array.from(document.querySelectorAll('p'))
    .map(p => p.innerText.trim())
    .filter(text => text.length > 50) // Avoid noise
    .join('\n\n');
  if (paragraphs.length > 100) return paragraphs;

  return ''; //Explicit empty
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === 'GET_ARTICLE_TEXT') {
    try {
      const text = getArticleText();
      sendResponse({ text });
    } catch (error) {
      console.error('[content.js] Error:', error);
      sendResponse({ text: '' });
    }
  }
  return true;
});