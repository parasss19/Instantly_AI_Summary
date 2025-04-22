import React, { useEffect, useState } from "react";
import { GoLink } from "react-icons/go";

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
    <>
      <h2 className="">AI Summary Settings</h2>

      {/* input field for api key */}
      <div className="">
        <label className="">Gemini Api Key</label>
        <input
          type="text"
          value={key}
          id="api-key"
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your Gemini API key"
          className=""
        />
      </div>

      {/* get api key link */}
      <div>
        <p className="">
          Get Your API Key from{" "}
          <a
            href="https://makersuite.google.com/app/apikey"
            className=""
            target="blank"
          >
            Link <GoLink />
          </a>
        </p>
      </div>

      {/* save btn and message */}
      <div>
        <button onClick={handleSave} className="" >Save Settings</button>
        {message && <p className="text-green-600">{message}</p>}
      </div>
    </>
  );
};

export default Options;

