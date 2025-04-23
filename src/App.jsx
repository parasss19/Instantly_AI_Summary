import { Routes, Route, HashRouter } from 'react-router-dom';
import Popup from './popup/Popup'
import Options from './options/Options';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <HashRouter>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Popup/>} />
        <Route path="/options" element={<Options />} />
      </Routes>
      </HashRouter>
    </>
  )
}

export default App
