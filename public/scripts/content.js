function getArticleText(){
    //1 if in webpage article tag exists then return its inner text
    const article = document.querySelector('article');
    if(article){
      return article.innerText;
    }

    //2 Try to extract from <main>
    const main = document.querySelector('main');
    if(main && main.innerText.trim().length > 200){
      return main.innerText;
    }
 
    //Otherwise, fallback to collecting all <p> tags
    const paragraph = Array.from(document.querySelectorAll('p'));
    const paraText = paragraph.map(p=> p.innerText.trim()).join('\n');
    return paraText;
}

//Listener to receive messages from the extension
//this function only run when user click on summarize btn
chrome.runtime.onMessage.addListener((req, _sender, sendResponse)=>{
   if((req.type == 'GET_ARTICLE_TEXT')){
     const text = getArticleText();
     console.log("[content.js] Extracted text:", text?.slice(0, 100)); // add logging
     sendResponse({text});
   }
    return true;  //Keep the message channel open for async
})


