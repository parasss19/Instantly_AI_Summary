function getArticleText(){
    const article = document.querySelectorAll('article');

    //if in webpage article tag exists then return its inner text
    if(article){
        return article.innerText;
    }
 
    //Otherwise, fallback to collecting all <p> tags
    const paragraph = Array.from(document.querySelectorAll("p"));
    const result = paragraph.map((p)=> p.innerText);

    return result.join('\n');
}

//Listener to receive messages from the extension
//this function only run when user click on summarize btn
chrome.runtime.onMessage.addListener((req, _sender, sendResponse)=>{
   if((req.type == 'GET_ARTICLE_TEXT')){
     const text = getArticleText();
     sendResponse({text});
   }
   //Required for async sendResponse
   return true;
})