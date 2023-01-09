import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuthenticated } from './hooks/useAuthenticated';
import { API } from './lib/api';

import EditPost from './components/EditPost';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import { SinglePost } from './components/SinglePost';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import PostsIndex from './components/PostsIndex';
import CommentThread from './components/common/CommentThread';
import AccountNotifications from './components/AccountNotifications';

import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    API.POST(API.ENDPOINTS.notificationsForUser, {}, API.getHeaders())
      .then(({ data }) => {
        setNotifications(data);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log({ searchedPosts });
  return (
    <div id='app' style={({ height: '100vh' }, { display: 'flex' })}>
      <Router>
        <Navbar
          setSearchedPosts={setSearchedPosts}
          searchedPosts={searchedPosts}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<PostsIndex />} />
          <Route path='/posts/create' element={<CreatePost />} />
          <Route path='/posts/:id' element={<SinglePost />} />
          <Route path='/posts/:id/edit' element={<EditPost />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/notifications' element={<AccountNotifications notifications={notifications} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
