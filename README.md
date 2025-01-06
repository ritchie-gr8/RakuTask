
# Task Management App 

## Overview
This is a task management application I developed to enhance my skills in React and Node.js. The app utilizes the following technologies:

- **Backend**: Express.js 🖥️ 
- **Frontend**: React ⚛️, TailwindCSS 🌬️, Framer Motion 🎞️ 
- **Database**: MongoDB 🗃️

One key feature of this app is that it doesn't rely on third-party authentication systems; instead, I built a custom user authentication system using JWT. 🔒
You can try the live version of the app here: [https://raku-task.vercel.app/](https://raku-task.vercel.app/) 
While the app is fully functional, there is still room for improvement and optimization. I plan to continuously refine the app, adding new features and enhancing the user experience. ✨

### Backend Env

Create a `.env` file in the backend folder and add the following environment variables:
```
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
CLIENT_URL=http://localhost:3000
PORT=8000
EMAIL_SERVICE=Gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_SERVICE_PORT=587
USER_EMAIL=<your_email>
EMAIL_PASSWORD=<your_email_password>
```

### Frontend Setup

Modify the `serverUrl` variable in the following files:

-   `app/context/taskContext.js`
-   `app/context/userContext.js`

Set `serverUrl` to either `localhost` for local development or `prod` for production:

```
const serverUrl = process.env.REACT_APP_ENV === 'production' ? 'https://your-production-url.com' : 'http://localhost:8000';
```
