import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import HandGesturesGame from "./pages/HandGesturesGame.jsx";
import BodyPoseGame from "./pages/BodyPoseGame.jsx";
import SerialConsole from "./pages/SerialConsole.jsx";


function App() {

  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        {/* Pages */}
        <Route exact path="/hand-gestures-game" element={<HandGesturesGame />} />
        <Route exact path="/body-pose-game" element={<BodyPoseGame />} />
        <Route exact path="/serial-console" element={<SerialConsole />} />
      </Routes>
    </Router>
  )
}

export default App
