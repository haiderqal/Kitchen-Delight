import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NavBar from "./routes/navbar";
import CreatePost from "./routes/createpost";
import PostDetails from "./routes/postdetails";
import EditPost from "./routes/editpost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index={true} path="/" element={<App />} />
          <Route index={true} path="/createPost" element={<CreatePost />} />
          <Route
            index={true}
            path="/postDetails/:id"
            element={<PostDetails />}
          />
          <Route index={true} path="/editPost/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);