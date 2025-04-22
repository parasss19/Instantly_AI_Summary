import { Routes, Route } from 'react-router-dom';
import Popup from './popup/Popup'
import Options from './options/Options';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Popup/>} />
        <Route path="/options" element={<Options />} />
      </Routes>
    </>
  )
}

export default App
