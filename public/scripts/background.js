// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.sync.get(["geminiAPIKey"], (result) => {
//         if(!result.geminiAPIKey){
//             chrome.tabs.create({ url: chrome.runtime.getURL("index.html#/options") });
//         }
//     })
// })


chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.storage.sync.get(["geminiAPIKey"], (result) => {
      if (!result.geminiAPIKey) {
        chrome.tabs.create({ url: chrome.runtime.getURL("index.html#/options") });
      }
    });
  }
});

// Optional: Listen for storage changes or add periodic checks if needed