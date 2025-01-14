import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Books from "../pages/Books"
import Stats from "../pages/Stats"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter