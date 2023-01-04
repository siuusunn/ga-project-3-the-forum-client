import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import {
  MenuOutlined,
  LoginOutlined,
  HomeOutlined,
  PostAddOutlined,
  LibraryBooksOutlined,
  HowToRegOutlined
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { collapseSidebar } = useProSidebar();
  return (
    <Sidebar style={{ height: '100vh' }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlined />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: 'center' }}
        >
          <h2>Forum</h2>
        </MenuItem>
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
        <MenuItem icon={<LoginOutlined />} routerLink={<Link to='/login' />}>
          Login
        </MenuItem>
        <MenuItem
          icon={<HowToRegOutlined />}
          routerLink={<Link to='/register' />}
        >
          Register
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
