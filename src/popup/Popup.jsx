import { useState, useEffect } from "react";
import { RiExternalLinkLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; //For better Markdown support

const Popup = () => {
  const [summaryType, setSummaryType] = useState("brief");
  const [result, setResult] = useState("Select a type and click Summarize");
  const [isCopied, setIsCopied] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    chrome.storage.sync.get(["geminiAPIKey"], ({ geminiAPIKey }) => {
      setHasApiKey(!!geminiAPIKey);
    });
  }, []);

  const getGeminiSummary = async (rawText, type, geminiAPIKey) => {
    const maxSummarySize = 20000;  //max size of gemini summary
    const text = rawText.length > maxSummarySize ? rawText.slice(0, maxSummarySize) + "\n\n(Note: Text truncated due to length)" : rawText;
    const typeOfSummary = {
      brief: `Summarize the text in 2-3 sentences:\n\n${text}`,
      detailed: `Give a detailed summary:\n\n${text}`,
      bullets: `Summarize the text in 5 to 7 bullet points:\n\n${text}`,
    };
    const prompt = typeOfSummary[type] || typeOfSummary.brief;
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiAPIKey}`, // Fixed model name
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error?.message || "Request Failed");
    }
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No Summary Available";
  };

  const handleSummarize = () => {
    setIsLoading(true);
    setResult("Extracting text...");

    //Get the user Gemini Api Key
    chrome.storage.sync.get(["geminiAPIKey"], ({ geminiAPIKey }) => {
      
      //if user dont have api key
      if (!geminiAPIKey) {
        setResult("No API key set. Please configure it.");
        navigate("/options"); // Redirect if missing
        setIsLoading(false);
        return;
      }

      //if user have api key - Ask content.js for the page text
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (chrome.runtime.lastError || !tab) {
          setResult("Error accessing tab. Please reload.");
          setIsLoading(false);
          return;
        }
        chrome.tabs.sendMessage(tab.id, { type: "GET_ARTICLE_TEXT" }, async (res) => {
          if (chrome.runtime.lastError) {
            setResult("Extension Error: Reload the page and try again.");
            setIsLoading(false);
            return;
          }
          const text = res?.text?.trim();
          if (!text || text.length < 100) { // Added min length check
            setResult("Couldn't extract sufficient text from this page 😕");
            setIsLoading(false);
            return;
          }

          //If we get text from webpage than send text with our post req to gemini
          try {
            const summary = await getGeminiSummary(text, summaryType, geminiAPIKey);
            setResult(summary);
          } 
          catch (err) {
            setResult(`Gemini Error: ${err.message}. Check your API key or try later.`);
          } 
          finally {
            setIsLoading(false);
          }
        });
      });
    });
  };

  const handleCopy = () => {
    if (!result || result.includes("Error")) return; //Skip copying errors
    navigator.clipboard.writeText(result).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="p-3 w-[380px] min-h-[350px] bg-amber-100">
      <div className="flex items-center justify-center gap-2 mb-3">
        <p className="font-[poppins] text-2xl font-semibold">AI SUMMARIZER</p>
        <img src="ai.png" alt="AI icon" width={25} height={18} />
      </div>
      <div className="flex items-center justify-center mx-auto">
        <p className="text-lg text-red-700 my-2 font-[poppins]">Too long? Didn’t read? Let AI spill the tea for you 💅</p>
      </div>
      {!hasApiKey && (
        <p className="text-sm text-gray-700 mt-3 mb-3 font-mono flex items-center gap-2">
          First set your Gemini API Key
          <button
            className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
            onClick={() => navigate("/options")}
          >
            <RiExternalLinkLine size={20} />
          </button>
        </p>
      )}
      <select
        className="w-full mx-auto mb-3 text-lg px-2 py-1 border rounded outline-none font-mono"
        value={summaryType}
        onChange={(e) => setSummaryType(e.target.value)}
        disabled={isLoading}
      >
        <option value="brief">Brief</option>
        <option value="detailed">Detailed</option>
        <option value="bullets">Bullet Points</option>
      </select>
      <div className="flex gap-3 font-[poppins] mb-5">
        <button
          onClick={handleSummarize}
          className="px-2 py-1 border bg-blue-200 rounded outline-none cursor-pointer disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Summarizing..." : "Summarize"}
        </button>
        <button
          onClick={handleCopy}
          className="px-2 py-1 border text-md bg-red-300 rounded outline-none cursor-pointer disabled:opacity-50"
          disabled={!result || result.includes("Error") || isLoading}
        >
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="whitespace-pre-wrap font-mono w-full min-h-[100px] max-h-[300px] overflow-y-auto bg-white p-2 border rounded shadow-inner text-black mb-3">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Popup;
