import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./pages/Register"
// import Login from "./pages/Login"
// import Write from "./pages/Write"
// import Home from "./pages/Home"
// import Single from "./pages/Single"

const router = <BrowserRouter>
<Routes>
  <Route path="/" element={<div>This is Home </div>} />
</Routes>
<Routes>
  <Route path="/register" element={<Register/>} />
</Routes>
</BrowserRouter>

function App() {
  return <div>{router }</div>;
}

export default App;
