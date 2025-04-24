<h1>AI SUMMARIZER ✨</h1>

<div id="top" align="center">
  <img src="https://res.cloudinary.com/dxxeks4o5/image/upload/v1745479328/788DBFD3-5754-4152-B063-F24BC5E0B472_maifpf.png" alt="ext img" width="400" style="margin-right: 10px;" />
  <img src="https://res.cloudinary.com/dxxeks4o5/image/upload/v1745479464/D766A9EA-9860-40D8-9BC8-FE6D43659163_b4l8ve.png" alt="ext img" width="400" />
</div>

<br>

## 🧠 AI Summary for Blogs and Articles - Chrome Extension
### 🎯 Aim:
- To provide users with **instant AI-powered summaries** of any webpage content in various formats — brief, detailed, or bullet-point — directly from the Chrome toolbar.

### 🥅 Goals:
- 🧠 Help users digest large articles in seconds.
- ⚡ Eliminate the need to read full content for key insights.
- 🔒 Let users use their own Gemini API key for full control and privacy.
- 📚 Provide customizable summary formats to suit every reader.
  
<br>

## 🚀 Features

- 🔍 **One-click summarization** of any webpage content
- 📝 Choose summary type: Brief, Detailed, or Bullet Points
- 🔐 API key stored securely via Chrome Storage
- 🧩 Simple Options Page to set your Gemini API key
- 📋 Copy summary to clipboard
- ✨ Auto-scroll output area with rich formatting support via markdown

  <br>

## 🧑‍💻 Tech Stack

| Tech        | Description                           |
|-------------|---------------------------------------|
| **React**   | Modern Frontend library               |
| **Vite**| Build Tool                                |
| **Tailwind Css**   | For Styling                    |
| **Gemini Pro API** | For AI summaries               |
| **Chrome's `storage.sync`** | for saving API keys   |


<br>

> **Note**: If you are new to open source contributions, you can refer to [this](https://opensource.guide/how-to-contribute/) guide by GitHub.

<br>


## 📁 Folder Structure

```text
AI Chrome Extension
├── public
│   ├── icon.png
│   ├── ai.png
│   ├── manifest.json
│   └── scripts
│       ├── background.js
│       └── content.js      
├── src
│   ├── options 
│   │   └── Options.jsx
│   ├── popup
│   │   └── Popup.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx 
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```


## Installation
1. **Clone the repository**

```sh
   git clone https://github.com/yourusername/AI-summarizer-Extension.git
   cd AI-summarizer-Extension
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Build the extension**
   ```sh
   npm run build
   ```
``` This generates a dist/ folder with the compiled extension.```

4. **Load it into Chrome**
- Open Chrome and go to chrome://extensions
- Enable Developer Mode
- Click "Load unpacked"
- Select the dist/ folder

<br>

## 📜 License
This project is licensed under the MIT License.

## 🤠 Project Admin 

<a href="https://github.com/parasss19"> <img src="https://res.cloudinary.com/dxxeks4o5/image/upload/v1695653091/admin_bdga2f_yla8qm.png" height="80px"/></a>

<p align="right">(<a href="#top">Back to top</a>)</p>