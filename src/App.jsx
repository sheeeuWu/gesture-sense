import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import ConnectWithUSB from "./pages/ConnectWithUSB.jsx"
import SerialConsole from "./pages/SerialConsole.jsx"


function App() {

  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/connect-with-usb" element={<ConnectWithUSB />} />
        <Route exact path="/serial-console" element={<SerialConsole />} />
      </Routes>
    </Router>
  )
}

export default App
