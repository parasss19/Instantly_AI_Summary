import { Routes, Route } from 'react-router-dom';
import Popup from './popup/Popup'
import Options from './options/Options';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Popup/>} />
        <Route path="/options" element={<Options />} />
      </Routes>
    </>
  )
}

export default App
