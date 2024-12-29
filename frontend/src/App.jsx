import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Write from "./pages/Write"
import Home from "./pages/Home"
import Single from "./pages/Single"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./style.scss"

const Layout = ()=>{
  return(
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/> 
    </div>
  )
}

const router = (
  <BrowserRouter>
    <Routes>
      {/* Layout Route with Nested Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} /> {/* This is equivalent to path="/" */}
        <Route path="/post/:id" element={<Single />} />
        <Route path="write" element={<Write />} />
      </Route>
      {/* Register Route */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
    </Routes>
  </BrowserRouter>
);

function App() {
  return <div className="app">
    <div className="container">
      {router }
    </div>
    </div>;
}



export default App;
