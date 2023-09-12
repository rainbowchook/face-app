# Faces App

It is a Single Page Application (SPA) that allows users to detect faces and their associated emotions or sentiments in images. 

This front-end web project was deployed to [https://face-app-lilac.vercel.app/](https://face-app-lilac.vercel.app/).

The GitHub repo of the corresponding API that this front-end app calls is on (https://github.com/rainbowchook/face-app-api)[https://github.com/rainbowchook/face-app-api].  


## Description

This is the front-end part of a full-stack Postgresql-Express-React-NodeJS (PERN) application.  

The front-end app was created with ReactJS and TailwindCSS for custom UI design.  It makes use of a serverless function to redirect HTTP requests to the server as it is hosted 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the TypeScript template.

### Serverless Function

As the app is deployed to Vercel, the serverless function for NodeJS is implemented as required by Vercel.  Each named file in the /api directory is a separate route.  

#### Use of HTTP instead of HTTPS
As this project is deliberately kept low-cost by requiring a new stack to be deployed each time, no domain nor CA was purchased for a secure HTTPS connection.  The stack is always destroyed after testing.

Port 80 will be open, thus the front-end client will make calls to http://<EC2_public_URL>.

As the browser will not allow mixed media content to be served (the server is serving over HTTP instead of HTTPS), all requests from the front-end client will be routed through a serverless function, deployed together with the front-end app to Vercel, thus bypassing browser restrictions.

## References

[Mixed media content: Website delivers HTTPS pages but contains HTTP links](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content/How_to_fix_website_with_mixed_content)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
