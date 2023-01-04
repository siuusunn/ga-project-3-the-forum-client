import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Register from './components/Register';
import PostsIndex from './components/PostsIndex';

function App() {
  return (
    <div id='app' style={({ height: '100vh' }, { display: 'flex' })}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<PostsIndex />} />
          <Route path='/posts/create' element={<CreatePost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
