import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Options = () => {
  const [key, setKey] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const navigate = useNavigate();

  //Load saved key on component mount
  useEffect(() => {
    chrome.storage.sync.get(["geminiAPIKey"], ({ geminiAPIKey }) => {
      if (geminiAPIKey) setKey(geminiAPIKey);
    });
  }, []);

  //validator func for API key
  const testApiKey = async (testKey) => {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${testKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: "Test prompt: Say hello." }] }] }),
        }
      );
      if (!res.ok) throw new Error("Invalid key");
      toast.success("API Key is valid!");
      return true;
    } 
    catch {
      toast.error("Invalid API Key. Please check and try again.");
      return false;
    }
  };

  //save button logic
  const handleSave = async () => {
    const trimmedKey = key.trim();
    if (!trimmedKey) return;

    setIsTesting(true);

    const isValid = await testApiKey(trimmedKey);
    setIsTesting(false);

    if (!isValid) return;

    chrome.storage.sync.set({ geminiAPIKey: trimmedKey }, () => {
      toast.success("Key Saved", {
        position: "top-center",
        autoClose: 4000,
        draggable: true,
        theme: "dark",
      });
      navigate("/");
    });
  };

  return (
    <div className="p-3 w-[380px] bg-amber-100">
      <h2 className="font-[poppins] text-2xl font-semibold mb-2">Set API Key</h2>
      <div className="w-full flex gap-2 font-mono mb-3 items-center">
        <label htmlFor="api-key" className="font-mono text-lg font-bold">Gemini API Key</label>
        <input
          type="text"
          value={key}
          id="api-key"
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your Gemini API key"
          className="w-full border outline-none px-2 rounded text-black"
        />
      </div>
      <div className="mb-5">
        <button
          onClick={handleSave}
          className="px-2 py-1 border text-md bg-red-300 rounded outline-none cursor-pointer disabled:opacity-50"
          disabled={isTesting}
        >
          {isTesting ? "Testing..." : "Save Key"}
        </button>
      </div>
      <hr className="h-px w-full bg-gray-600 mb-3" />
      <div className="flex gap-2 items-center">
        <p className="font-mono text-lg text-red-500 font-bold">Don't have a key?</p>
        <button className="px-2 py-1 border text-md bg-red-300 rounded outline-none cursor-pointer">
          <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Generate Key</a>
        </button>
      </div>
    </div>
  );
};

export default Options;