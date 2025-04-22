import React, { useState } from 'react'

const popup = () => {
  const [summaryType, setSummaryType] = useState("brief");
  const [result, setResult] = useState("Select a type and click Summarize");
  const [isCopied, setIsCopied] = useState(false);
  


  const getGeminiSummary = async (rawText, type, apiKey) => {
    const maxSummarySize = 20000    //max size of gemini summary
    const text = rawText.length > maxSummarySize ? rawText.slice(0, maxSummarySize) : rawText;

    const typeOfSummary = {
      brief: `Summarize the text in 2-3 sentences:\n\n${text}`,
      detailed: `Give a detailed summary:\n\n${text}`,
      bullets: `Summarize the text in 5 to 7 bullet points:\n\n${text}`,
    };

    const prompt = typeOfSummary[type] || typeOfSummary.brief;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!res.ok) throw new Error("Request Failed");

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No Summary";
  }


  const handleSummarize = () => {
    setResult("Extracting text ...");

    //Step 1 Get the user Gemini Api Key
    chrome.storage.sync.get(['geminiAPIKey'], ({geminiAPIKey}) => {
      //if user dont have api key
      if(!geminiAPIKey){
        setResult("No API key set, Click gear icon to add one");
        return;
      }

      //if user have api key
      //Step 2 Ask content.js for the page text
      chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
        chrome.tabs.sendMessage(tab.id, {type: 'GET_ARTICLE_TEXT'}, 
          async ({text}) =>{
            if(!text){
              setResult("Couldn't extract text from this page 😕");
              return;
            }

            //step-3 If we get text from webpage than send text with our post req to gemini
            try {
              const summary = await getGeminiSummary(text, summaryType, geminiAPIKey);
              setResult(summary);
            } catch (err) {
              setResult("Gemini Error: " + err.message);
            }
          })
      });

    })
  }


  const handleCopy = () => {
   if(!result) return;
   navigator.clipboard.writeText(result)
    .then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    })
  }

  return (
    <div className=''>
        <h2>AI Summary</h2>
        
        {/* Options */}
        <select 
          value={summaryType}
          onChange={(e) => setSummaryType(e.target.value)}
          className=''
        >
          <option value="brief">Brief</option>
          <option value="detailed">Detailed</option>
          <option value="bullets">Bullet Points</option>
        </select>

        {/* buttons and text box */}
        <div className=''>
          <button 
            onClick={handleSummarize}
            className=''
          >
            Summarize
          </button>
 
          <button 
            onClick={handleCopy}
            className=''
          >
            {isCopied ? "Copied" : "Copy"}
          </button>

          <pre className=''>{result}</pre>
        </div>
    </div>
  )
}

export default popup

