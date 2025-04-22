import React, { useEffect, useState } from "react";

const Options = () => {
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");

  //Load saved key on component mount
  useEffect(() => {
    chrome.storage.sync.get(['geminiAPIKey'], ({geminiAPIKey}) => {
      if(geminiAPIKey){
        setKey(geminiAPIKey);
      }
    })
  },[]);

  //save button logic
  const handleSave = () => {
    if(!key.trim()) return;   //if key not found

    chrome.storage.sync.set({geminiAPIKey: key.trim()} , () => {
      setMessage("Key Saved Successfully");
      setTimeout(() => (
        setMessage('')
      ),2000);
    })
  }

  return (
    <div className="p-3 w-[380px] bg-amber-100">
      <h2 className="font-[poppins] text-2xl font-semibold mb-2">Set ApiKey</h2>

      {/* input field for api key */}
      <div className="w-full flex gap-2 font-mono mb-3">
        <label className="font-mono text-lg font-bold">Gemini Api Key</label>
        <input
          type="text"
          value={key}
          id="api-key"
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your Gemini API key"
          className="w-[55%] border outline-none px-2 rounded text-black"
        />
      </div>

      {/* save btn and message */}
      <div className="mb-5">
        <button 
          onClick={handleSave} 
          className="px-2 py-1 border text-md bg-red-300 rounded outline-none cursor-pointer" 
        > Save Key
        </button>

        {message && <p className="text-green-600">{message}</p>}
      </div>

      <hr className="h-3 w-[97%] text-gray-600" />

      {/* get api key link */}
      <div className="flex gap-2 items-center">
          <p className="font-mono text-lg text-red-500 font-bold">Don't have key </p>
          <button className="px-2 py-1 border text-md bg-red-300 rounded outline-none cursor-pointer">
            <a
              href="https://makersuite.google.com/app/apikey"
              className=""
              target="blank"
            >
            Generate Key
            </a>
          </button>
      </div>

    </div>
  );
};

export default Options;

