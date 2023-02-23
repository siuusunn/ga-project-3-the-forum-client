# GA-PROJECT-3-THE-FORUM

## Project Description

The Forum is a full stack MERN app that features a discussion board which allows registered users to create posts, search posts, like/ dislike posts and create comments. My focus on this project was implementing the sidebar, the user functionalities in both back end and front end, e.g. register/ login, profile page, edit profile, change password, the design of the app, and general project management. We implemented the Agile workflow in this project with the help of Trello which made the development process seamless. As with most of my projects, I like to inject a little bit of humor in it - the more the users click around the app, the more they will find out that the Admin is suspiciously totalitarian!

## Deployment Link

https://alicelo-theforum.netlify.app/

## Working Team & Timeframe

Working team:

- Alice Lo (https://github.com/siuusunn)
- Louis Grant (https://github.com/ljsgrant/)
- Parul Singh (https://github.com/ParulSingh16/)

Timeframe:

04/01/2023 - Project start
05/01/2023 - MVP done
08/01/2023 - Project finish

## Technologies Used

Front End: React, Node, HTML, CSS, Sass, Mater

Back End: MongoDB, Express, Cloudinary

Development Tools: Visual Code Studio

Other: Trello, Excalidraw

## Installation

Run these commands at the root of the code folder:

### API

To install node modules:
`$ npm install`

To start the back end server:
`$ npm run dev`

### Client

To install node modules:
`$ npm install`

To start the app:
`$ npm start`

## Brief

The brief we received was to create a full stack app using MongoDb, Express, React and Node. The app must have an authentication function and at least two models on the back end and multiple components on the front end. What the app does and what the models are like are completely up to our creativity!

## Planning

Right off the bat the team and I wanted to do an app with some social aspects instead of a plain “login and display info” app. We decided to create a discussion-board type of app that utilizes the MERN stack. We looked at some of our favorite discussion boards as references and inspirations such as Reddit and LIHKG. Then we went straight to creating a basic wireframe, identified the MVP features, advanced functionalities and stretch goals.

![Planning_Image](./assets/Planning-README.png)

As we would start from the back end first, we also decided on what models and controllers we would need, and what components we would need for the front end. We also discussed what our strengths were, who was most confident in doing which part. Based on these feedbacks, I then set up the Trello board with the responsibilities broken down in cards for the team to see and set the timeline for the project so that everyone knew what needed to be done by what time. We also agreed to jump on a video call during development so that we could ask questions, discuss, and brainstorm together.

Divide and conquer!

## Code Process

The development is divided into three phases: MVP, Second stage features, and stretch goals. We started building the back end first before moving on to the front end.

My responsibilities for this project are:
Back end: Creating basic project framework for the team to work on, User model, User controller, Registration & Login, Seed file
Front end: Sidebar, Register, Login, Profile page, Add New Post, Default Landing Page, Revamping the Home page and Search Bar, general design and styling of the front end interface
Other: Project management

These are all divided into respective cards on our project’s Trello board so we can track the progress and make sure no one is blocked, along with the help of daily stand-ups and constant communications on Zoom and Slack.

### User Model & Verifications

I built the user model and verifications using `mongoose`, `mongoose-hidden`, `mongoose-unique-validator`, `bcrypt` and `regex`. It provided users a secured way of registering and logging in.

```js
userSchema.pre('save', function encryptPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(mongooseHidden({ defaultHidden: { password: true } }));

userSchema.plugin(mongooseUniqueValidator);
```

### User Controller

I created the functions to register, login, get all users’ info, get a single user’s info, and edit a single user to prepare for the features we planned for the front end client.

```js
async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = user.validatePassword(req.body.password);

    if (!isValidPassword) {
      return res.status(403).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      SECRET,
      { expiresIn: '12h' }
    );

    return res.status(202).send({
      token,
      message: `Welcome back, ${user.username}!`
    });
  } catch (e) {
    next(e);
  }
}
```

### Sidebar

I implemented a responsive Side Bar as Nav Bar using `react-pro-sidebar` package, and customized it using the package’s API and MUI. Some menu items are different depending on the current user’s login status. This functionality uses a custom hook I created named `useAUtheticated`:

```js
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AUTH } from '../lib/auth';

export const useAuthenticated = () => {
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(AUTH.getPayload());
  }, [pathname]);

  return [isLoggedIn, setIsLoggedIn];
};
```

A toggle button for dark mode was also added in the latter stage of development as it was one of the stretch goals.

![Sidebar_Image](./assets/SideBar-README.gif)

### Register & Login

I built the forms in register and login component with MUI. They offer standard register and login functions, and also allows users to upload a profile picture of their choices. I added the password visibility toggle button after seeing my teammate struggling with entering the correct passwords!

![Sidebar_Image](./assets/Register-README.png)

### Profile

I started with a very basic profile component that only shows profile picture, username, date of registration and user id. Then I made some slight changes in the `User` model and `Post` controller so that I can add a component that shows all the posts made by the user and respective buttons to go to the particular posts. And as one of the stretch goals, I added the Edit Profile & Password feature, the page shows the updated profile page instantly without having to manually reload.

Results:
![Profile__Image2](./assets/Profile2-README.png)

Users will not see the Edit Profile button if they are viewing another user’s profile page. I achieved this by using conditional rendering:

![Profile__Image](./assets/Profile-README.gif)

```
{isEditMode ? (
  <>
     <Box>
      <Button onClick={handleSaveChanges} variant='contained'sx={{ mr: 2 }}>
      Save Changes
      </Button>
      <Button onClick={toggleEditMode} variant='outlined'>
      Cancel
      </Button>
     </Box>
  </>
) : (
    <Button onClick={toggleEditMode} variant='outlined'>
    Edit Profile & Password
    </Button>
    )}
  </>
)}
```

Results:

![Profile__Image2](./assets/Profile2-README.png)

User has to option to edit profile details without uploading a new profile picture, I handled this in the `handleSaveChanges()`:

```js
     if (file !== '') {
       const imageData = new FormData();
       imageData.append('file', file);
       imageData.append(
         'upload_preset',
         process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
       );


       const cloudinaryResponse = await API.POST(
         API.ENDPOINTS.cloudinary,
         imageData
       );


       const imageId = cloudinaryResponse.data.public_id;


       const apiReqBody = {
         ...formFields,
         cloudinaryImageId: imageId
       };
```

### Profile Picture

Derived from the `Profile` component, I refactored the Profile Picture into a reusable component that can be used by the team. The component was built using Cloudinary packages.

```js
export default function ProfilePicture({
  cloudinaryImageId,
  imageWidth,
  imageHeight
}) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    }
  });

  const myImage = cld.image(cloudinaryImageId);

  myImage
    .resize(
      thumbnail()
        .width(imageWidth)
        .height(imageHeight)
        .gravity(focusOn(FocusOn.face()))
    ) // Crop the image, focusing on the face.
    .roundCorners(byRadius(50));

  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
}
```

### Add New Post

This component is where I experimented with the checkbox using `useState`, `handleTick()` and conditional rendering:

![AddNewPost__Image](./assets/AddNewPost-README.gif)

### Default Landing Page for Post Index

I noticed that the right hand side of the client shows a big blank space when users first navigate to the All Post page, hence I created a Default Landing Page component and added it to the PostIndex component. This is also where I relocated the Search Bar to and revamped it with MUI:

![DefaultLandingPage__Image](./assets/DefaultLandingPage-README.png)

Sidenote: I also added the feature to show how long ago the post was added using `moment(post?.createdAt).fromNow()`.

### Home

I revamped the Home component and added a simple slidable card that shows all the users on the platform. When the picture is clicked, it will take users to that particular user’s profile page.

![Home__Image](./assets/Home-README.gif)

### Dark Mode

On the last day of the project, I added the functionality to allow users to toggle dark mode. A toggle button was added to the Side Bar. I used the local storage to store the theme info so that the theme stays the same even after the page refreshes.

```js
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
```

```js
<MenuItem>
  {theme === 'light' ? (
    <Switch onClick={toggleTheme} />
  ) : (
    <Switch onClick={toggleTheme} defaultChecked />
  )}
  Dark Mode
</MenuItem>
```

### Styling

After I finished the components that I was responsible for, and completed the stretch goals. I spent time on styling using CSS, Sass and MUI’s built-in styling to improve the UI and to make sure the front end feels cohesive.

### Project Management

I created the cards and tracked the progress on Trello constantly to make sure we were on track and on time, and most importantly, to not block anyone. Very happy to say that we successfully implemented the Agile workflow on this project without any blockage!

![Trello__Image](./assets/Trello-README.png)

## Challenges

### Rich Text Editor

One of the stretch goals for me is to implement a Rich Text Editor. After lots of trials and errors when experimenting with several RTE packages, I could not find a good solution to serialize the returned data, so I reverted back to using a plain text editor due to time constraints, but this is something I definitely would like to tackle if I have time in the future.

### Working in a Bigger Team

Even though we are in the same team, every team member has their own style of writing codes. So initially it takes a bit of time to read everyone’s codes and understand how to work with them.

## Wins

### Agile Workflow and Collaborations

One of our main focuses was to avoid blockage during development and we implemented the agile workflow, and communicated constantly which made the development process very seamless! This app would not be possible in this short amount of time if we did not have 3 people working on it. I really appreciate everyone’s input on this. We hopped on a video call every day when we were developing, so that we can constantly bounce ideas off each other, help each other debug, and ask questions. It was truly an enjoyable process and I am very proud of this collaboration!

### Features & Styling

Given the short timeframe to work on this project, I am very happy that we developed an app that has a lot of features for both users and admin. It is a feature-rich app that has cohesive and clean design, and a tongue-in-cheek theme.

### Constant Improvements on the App

As we were developing the app, we were on zoom calls constantly and often sparked new ideas on how to make the app better. It was a great experience as it taught me that there is always room for improvements - even when the app was considered “done”, there was always something else that we could add to make it better for the user e.g. dark mode, edit profile, edit comment etc.

## Key Learnings/ Takeaways

### Using MERN

This project was a great practice to polish my skills. In the classworks and previous projects we used public APIs to build our apps, but in this project we designed and built an API that best suits our needs. I think this was a very good exercise for us to learn how to design an API and think about the data structure so that we built an efficient and solid back end to support our data needs and the front end. We also worked with React and Node more in-depth and in a larger-scale which mimicked real-life development processes and it had trained me in thinking in React terms and how to utilize the framework in practical ways.

### Using and choosing npm packages

Not all npm packages are built equally! In this project I experimented with a lot of different packages out there, some worked, some didn’t. It was a hard journey where I had to go through some packages that were not managed/ stopped being updated or just did not work. It was a very valuable lesson on how to choose packages based on what I need and how to use them.

### How to work in a bigger team without blockage or merge conflicts

It was easy to avoid blockage or merge conflicts when working on a small scale project with another person. But when it comes to a larger-scale project like this one with a team of three, I foresaw that it would severely hinder our development if it happened, which was why I set up the Trello board at the beginning, and we also double checked with other teammates on Zoom calls when we started working on a new component or had to make changes on an existing component to prevent this.

## Bugs

### Users cannot like/ dislike a comment, it is showing undefined

> Possible reason: It is not defined yet in the model and controller. And there is no function to update the data on click.

### Search Bar results does not clear when the input field is cleared

> Possible reason: Did not write a conditional statement to stop the app from rendering the results if the input is empty

## Future Improvements

### Improved layout of Side Bar

Ideally I would like the User functions (login, register) and Dev Info to sit at the bottom of the sidebar to avoid clustering everything on top, and it would make the sidebar more appealing to look at.

### Separate the Edit Profile, Change Password and Change Profile Picture functionalities on Profile

At the moment if a user wants to edit their profile, they cannot do so without also changing the password. I would like to break the “edit profile”
