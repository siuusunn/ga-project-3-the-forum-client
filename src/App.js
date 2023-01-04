import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import SinglePost from './components/SinglePost';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import PostsIndex from './components/PostsIndex';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <div id='app' style={({ height: '100vh' }, { display: 'flex' })}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<PostsIndex />} />
          <Route path='/posts/create' element={<CreatePost />} />
          <Route path='/posts/:id' element={<SinglePost />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
