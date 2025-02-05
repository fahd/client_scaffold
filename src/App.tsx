import BoardProvider from "./contexts/boardContext";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BoardProvider>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BoardProvider>
  );
}

export default App;
