
import Login from "./pages/Login.jsx"
import Browse from "./pages/Browse.jsx"
import Signup from "./pages/Signup.jsx"
import Translate from "./pages/Translate.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (
    <>

<BrowserRouter>
        <Routes>
          <Route index element={<Signup/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path="translate" element={<Translate/>}/>
          <Route path="browse" element={<Browse/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
