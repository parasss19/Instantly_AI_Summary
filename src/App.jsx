import { Routes, Route, HashRouter } from 'react-router-dom';
import Popup from './popup/Popup'
import Options from './options/Options';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <HashRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Popup/>} />
        <Route path="/options" element={<Options />} />
      </Routes>
      </HashRouter>
    </>
  )
}

export default App
