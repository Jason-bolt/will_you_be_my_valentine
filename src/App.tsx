import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ValentineDisplay from "./pages/ValentineDisplay"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valentine/:messageToken" element={<ValentineDisplay />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
