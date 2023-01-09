import adminPic from '../assets/adminPic.png';
import Search from './common/Search';

import { Container, Box, Avatar } from '@mui/material';

const DefaultLandingComponent = () => {
  console.log(adminPic);

  return (
    <Container maxWidth='sm' sx={{ mt: 15 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Avatar
          src={adminPic}
          alt='admin-profile-picture'
          sx={{ width: 250, height: 250, mb: 3 }}
        />
        <Box>
          <h3>
            Hello, I'm the very loved and respected administrator of this forum.
          </h3>
          <p>
            Start browsing posts by clicking on the post titles on the left.
          </p>
          <p>Make your own post by clicking "Add a New Post" on the sidebar!</p>
          <p>Or search for posts using the seach bar below!</p>
          <br></br>
        </Box>
        <Search />
      </Box>
    </Container>
  );
};

export default DefaultLandingComponent;
