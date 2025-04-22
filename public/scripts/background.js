chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(["geminiAPIKey"], (result) => {
        if(!result.geminiAPIKey){
            chrome.tabs.create({ url: chrome.runtime.getURL("index.html#/options") });
        }
    })
})