import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomeFeed from "./routes/homefeed";

function App() {
  return (
    <div className="App">
      <HomeFeed />
    </div>
  );
}

export default App;