# Faces App

It is a Single Page Application (SPA) that allows users to detect faces and their associated emotions or sentiments in images. 

This front-end web project was deployed to [https://face-app-lilac.vercel.app/](https://face-app-lilac.vercel.app/).

The GitHub repo of the corresponding API that this front-end app calls is on (https://github.com/rainbowchook/face-app-api)[https://github.com/rainbowchook/face-app-api].  

## Description

This is the front-end part of a full-stack Postgresql-Express-React-NodeJS (PERN) application.  

The front-end app was created with ReactJS and TailwindCSS for custom UI design.  It makes use of a serverless function to redirect HTTP requests to the server as it is hosted 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the TypeScript template.

## Common Use Case

1. The user navigates to the root URL and clicks on the logo to begin.  If the user was previously logged in, the user's name will be displayed.

2. If the user is not yet logged in, the user will be taken to the Sign In page.  A previously registered user can log in with email and password.

3. If the user is not registered, the user can click on the Register link and register with name, email and password.  Registering will log the user in.

4. If the user is successfully logged in or is not signed out from a previous session, the user will be taken to the Home page to submit an image URL.  The user name and rank will be displayed.

5. Upon clicking the submit button, a spinner will be displayed as the request is being processed.

6. Once the image request is successfully processed, the faces detected on the image will be overlaid with bounding boxes, each labeled with the dominant sentiment and percentage accuracy to two decimal places.  The user's rank will be incremented for each image submission.

7. On user signout, the user is navigated to the SignIn page if the user is still on the Home page, which is a protected route.

## Architectural Overview

### Folder structure

The React code resides in the /src folder, with the entry point index.ts file located in /src folder.  

```
src
|-- components
|-- contexts
|-- hooks
|-- routes
|-- utilities
```

Other files are split into /components, /contexts, /hooks and /routes folders, according to functionality.  Breakdown of files by folder:

1. /components stores React components that are either presentational components or container components.  
Smart/Container components: App, FaceRecognition, Navigation.  Dumb/UI/Presentational components: ImageLinkForm, Logo, Rank, Spinner, ParticleBackground.

2. /contexts stores a React context files for passing data through the component tree, avoiding prop drilling.  This project defines an Authentication Context, <code>AuthContext</code>, to manage user login state and to pass it through the component tree.

3. /hooks stores custom hooks: useAuthContext, useLocalStorage and useFetchAPI.

4. /routes stores React components for client side routing with the React Router DOM library, without needing a full page reload.  Routes include: Home, ProtectedRoute, Register, Root and SignIn components.

5. /utilities stores reusable utility functions that are pure functions, like the <code>truncate</code> function for formatting a number to a 

### Available Scripts



### Challenges

#### Use of react-app-rewired

Use of createContext in the Home class component

#### Serverless Function

As the app is deployed to Vercel, the serverless function for NodeJS is implemented as required by Vercel.  Each named file in the /api directory is a separate route.  

##### Use of HTTP instead of HTTPS
As this project is deliberately kept low-cost by requiring a new stack to be deployed each time, no domain nor CA was purchased for a secure HTTPS connection.  The stack is always destroyed after testing.

Port 80 will be open, thus the front-end client will make calls to http://<EC2_public_URL>.

As the browser will not allow mixed media content to be served (the server is serving over HTTP instead of HTTPS), all requests from the front-end client will be routed through a serverless function, deployed together with the front-end app to Vercel, thus bypassing browser restrictions.


#### Enhancements/Todos

Possible refactoring:

##### Get a ref to the image
1. In the Home component, the calculateFaceLocations function gets a direct reference to the DOM object that is the image element by using <code>const image = document.getElementById('inputImage') as HTMLImageElement</code>.  A ref can be defined in the Home component to access the element <code>const imgRef = useRef()</code>, and then passed to the FaceRecognition component to be assigned to the <code>ref</code> attribute of the image element: <code><img ref={imgRef} /></code>.  After mounting, access the DOM element with <code>imgRef.current</code>.

##### Implement component separation to replace repeated UI features:
Smart components are app-level components that perform functions and keep track of state, while dumb components just render UI based on props received and may manage own state but do not impact app-level state.  Smart components that were situated in this folder could have gone into their own /container folder if the project scales.  Traditionally, smart components are class-based and passes props to presentational components.  

1. The FaceRecognition component could have rendered a dumb FaceRecognitionWithBoundingBoxes component by passing in the bounding box and sentiments data.
2. A Navigation container could have rendered dumb NavigationUserLoggedOut and NavigationUserLoggedIn components by passing in the currentUser logged in.  

##### Centralise fetch API logic in custom hook
1. Centralise fetch API functionality in the custom hook useFetchAPI, which will return the loading, error or data states to the Home, Register and SignIn components that call fetch API.
2. The URL fetched can be constructed from within the useFetchAPI hook by concatenating the URL of the serverless function with the required endpoint of the backend API as part of the query parameter.

##### Create a main route configuration file or router based on routes data
1. Instead of specifying all the routes in the App component itself, further component separation can be implemented by [placing the routes into a Router component](https://dev.to/kachiic/the-right-way-structure-your-react-router-1i3) that will map over individual pages from another pagesData file that passes in the title, path and element of each route. 

## References

### React 

#### React Context API

[React Context API: A deep dive with examples](https://blog.logrocket.com/react-context-api-deep-dive-examples/)

[User Authentication with Context API and useContext, useState hooks](https://gist.github.com/sineto/52d6a4f634cb51c2a6e6013dc64be47b)

[Codesandbox example of authentication with React Context](https://codesandbox.io/s/authentication-with-react-context-d3x0r)

[React API reference: createContext](https://react.dev/reference/react/createContext)

#### React Router DOM

[React Router Feature OverView](https://reactrouter.com/en/main/start/overview)

[React Router DOM <Routes> component](https://reactrouter.com/en/main/components/routes)

[How to Handle Routing in React apps with React Router DOM v5](https://www.digitalocean.com/community/tutorials/how-to-handle-routing-in-react-apps-with-react-router)

[The Right Way to Structure your React Router](https://dev.to/kachiic/the-right-way-structure-your-react-router-1i3l)

#### Others

[React App Rewired GitHub repo](https://github.com/timarney/react-app-rewired)

[React useRef() Hook Explained in 3 steps](https://dmitripavlutin.com/react-useref/)

[React API reference: useRef](https://react.dev/reference/react/useRef)

[React project folder structure ](https://blog.webdevsimplified.com/2022-07/react-folder-structure/)

[Categorizing Components into Smart & Dumb Components, in React](https://www.digitalocean.com/community/tutorials/react-smart-dumb-components)

[Dumb components and smart components](https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43)

[React 18 Improves Application Performance - useTransition hook to defer/interrupt rendering of low-priority task to keep the UI interactive](https://vercel.com/blog/how-react-18-improves-application-performance)

### Others

[Vercel Serverless Functions `type: "module"` got error](https://github.com/orgs/vercel/discussions/1225)

[Truncate decimal numbers in JavaSript](https://stackoverflow.com/a/64082140)

[process not defined in browser ]

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
