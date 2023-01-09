import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu
} from 'react-pro-sidebar';
import { useAuthenticated } from '../hooks/useAuthenticated';
import {
  MenuOutlined,
  LoginOutlined,
  HomeOutlined,
  PostAddOutlined,
  LibraryBooksOutlined,
  HowToRegOutlined,
  LogoutOutlined,
  AccountCircleOutlined,
  InfoOutlined,
  Add,
  GitHub,
  LinkedIn
} from '@mui/icons-material';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AUTH } from '../lib/auth';
import { Divider } from '@mui/material';
import { Switch } from '@mui/material';

const devLinks = {
  GitHub: {
    siuusunn: 'https://github.com/siuusunn/',
    ljsgrant: 'https://github.com/ljsgrant/',
    ParulSingh16: 'https://github.com/ParulSingh16/'
  },
  LinkedIn: {
    siuusunn: 'https://www.linkedin.com/in/alice-lo-09921896/',
    ljsgrant: 'https://www.linkedin.com/in/louisgrant/',
    ParulSingh16: 'https://www.linkedin.com/in/parul-singh-b330b5204/'
  }
};

export default function Navbar({ searchedPosts, setSearchedPosts }) {
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const redirectLink = (siteName, url) => {
    return (
      <>
        <a href={url} target='_blank' rel='noreferrer'>
          {siteName}
        </a>
      </>
    );
  };

  const logout = () => {
    AUTH.deleteToken();
    setIsLoggedIn(false);
    navigate('/');
  };

  const { collapseSidebar } = useProSidebar();

  return (
    <Sidebar
      style={{
        height: '100vh'
      }}
    >
      <Menu>
        <MenuItem
          icon={<MenuOutlined />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: 'center' }}
        >
          <h2>The Forum</h2>
        </MenuItem>

        <Divider className='divider' />
        <MenuItem icon={<HomeOutlined />} routerLink={<Link to='/' />}>
          Home
        </MenuItem>

        <MenuItem
          icon={<LibraryBooksOutlined />}
          routerLink={<Link to='/posts' />}
        >
          All Posts
        </MenuItem>

        <MenuItem
          icon={<PostAddOutlined />}
          routerLink={<Link to='/posts/create' />}
        >
          Add a New Post
        </MenuItem>
        <Divider className='divider' />
        {isLoggedIn ? (
          <>
            <MenuItem
              icon={<AccountCircleOutlined />}
              routerLink={<Link to={`/profile/${AUTH.getPayload().userId}`} />}
            >
              Profile
            </MenuItem>
            <MenuItem
              icon={<LogoutOutlined />}
              routerLink={<Link to='/' />}
              onClick={logout}
            >
              Log out
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              icon={<LoginOutlined />}
              routerLink={<Link to='/login' />}
            >
              Login
            </MenuItem>
            <MenuItem
              icon={<HowToRegOutlined />}
              routerLink={<Link to='/register' />}
            >
              Register
            </MenuItem>
          </>
        )}

        <Divider className='divider' />
        <SubMenu label='Dev Info' icon={<InfoOutlined />}>
          <SubMenu label='siuusunn' icon={<Add />}>
            <MenuItem icon={<GitHub />}>
              {redirectLink('GitHub', devLinks.GitHub.siuusunn)}
            </MenuItem>
            <MenuItem icon={<LinkedIn />}>
              {redirectLink('LinkedIn', devLinks.LinkedIn.siuusunn)}
            </MenuItem>
          </SubMenu>
          <SubMenu label='ljsgrant' icon={<Add />}>
            <MenuItem icon={<GitHub />}>
              {redirectLink('GitHub', devLinks.GitHub.ljsgrant)}
            </MenuItem>
            <MenuItem icon={<LinkedIn />}>
              {redirectLink('LinkedIn', devLinks.LinkedIn.ljsgrant)}
            </MenuItem>
          </SubMenu>
          <SubMenu label='ParulSingh16' icon={<Add />}>
            <MenuItem icon={<GitHub />}>
              {redirectLink('GitHub', devLinks.GitHub.ParulSingh16)}
            </MenuItem>
            <MenuItem icon={<LinkedIn />}>
              {redirectLink('LinkedIn', devLinks.LinkedIn.ParulSingh16)}
            </MenuItem>
          </SubMenu>
        </SubMenu>
        <Divider />
        <MenuItem>
          <Switch onClick={toggleTheme} />
          Dark Mode
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
