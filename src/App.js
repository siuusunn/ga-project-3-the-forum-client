import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import { SinglePost } from "./components/SinglePost";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import PostsIndex from "./components/PostsIndex";
import CommentThread from "./components/common/CommentThread";

import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";

window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  const [searchedPosts, setSearchedPosts] = useState([]);

  console.log({ searchedPosts });
  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      <Router>
        <Navbar
          setSearchedPosts={setSearchedPosts}
          searchedPosts={searchedPosts}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/commentdev" element={<CommentThread />} />
          <Route path="/posts" element={<PostsIndex />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
