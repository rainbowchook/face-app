# Faces App

It is a Single Page Application (SPA) that allows users to detect faces and their associated emotions or sentiments in images. 

This front-end web project was deployed to [https://face-app-lilac.vercel.app/](https://face-app-lilac.vercel.app/).

The GitHub repo of the corresponding API that this front-end app calls is on (https://github.com/rainbowchook/face-app-api)[https://github.com/rainbowchook/face-app-api].  

## Description

This is the front-end part of a full-stack Postgresql-Express-React-NodeJS (PERN) application.  

The front-end app was created with ReactJS, TypeScript and TailwindCSS for custom UI design.  It makes use of a serverless function on Vercel to redirect HTTP requests to the server hosted on an EC2 Spot Instance.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the TypeScript template.

## Common Use Case

1. The user navigates to the root URL and clicks on the logo to begin.  If the user was previously logged in, the user's name will be displayed.

2. If the user is not yet logged in, the user will be taken to the Sign In page.  A previously registered user can log in with email and password.

3. If the user is not registered, the user can click on the Register link and register with name, email and password.  Registering will log the user in.

4. If the user is successfully logged in or is not signed out from a previous session, the user will be taken to the Home page to submit an image URL.  The user name and rank will be displayed.

5. Upon clicking the submit button, a spinner will be displayed as the request is being processed.

6. Once the image request is successfully processed, the faces detected on the image will be overlaid with bounding boxes, each labeled with the dominant sentiment and percentage accuracy to two decimal places.  The user's rank will be incremented for each image submission.

7. On user signout, the user is navigated to the SignIn page if the user is still on the Home page, which is a protected route.

## Available Scripts

### npm scripts defined in package.json ###
The <code>npm</code> package manager is used.  From the package.json: 

Build script:
```
npm run build
```
Production Run script:
```
npm run start
```
Dev Run script:
```
npm run dev
```

### Vercel dev setup
This project is deployed to Vercel, utilising a serverless function.  The CRA project can be locally tested together with the serverless function from within a Vercel dev server.

To run the project from within the Vercel dev server: 
1. Install the Vercel CLI globally
```
npm i -g vercel
```
2. Verify the version of Vercel CLI currently being used
```
vercel --version
```
3. Login and authenticate with <code>vercel login</code> before accessing resources or performing administrative tasks i.e. deploying to Vercel from a terminal environment.  Alternatively, <code>--token</code> can be passed as an option to a <code>vercel</code> command if a Vercel token was defined.

4. To replicate the Vercel deployment environment locally and test the Vercel project before deploying, use:
```
vercel dev
```

#### Change default vercel command settings
The default script run by <code>vercel dev</code> seems to be <code>react-scripts start</code>, but the scripts have been reconfigured to use <code>react-app-rewired start</code>.  Additional configuration is needed to configure <code>vercel dev</code> to run the correct script.  

Create <code>vercel.json</code> with the following code:
```
{
  "devCommand": "npm run dev"
}
```
Add `"dev": "npm run start"` to `"scripts"` in the <code>package.json</code>.

Alternatively, just set the `"devCommand"` to `"npm run start"` in <code>vercel.json</code> without having to create the additional `"dev"` script in <code>package.json</code>.

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

5. /utilities stores reusable utility functions that are pure functions, like the <code>truncate</code> function for formatting a number by truncating it to two decimal places.

### Functional vs Class Components

Only two smart components are class-based components: Home and App.  All others are React Functional Components, or FC as the alias.  

The types of Props and State are passed in as type parameters e.g. <code>class Home extends Component<{}, AppState></code>, where AppState is defined as an interface within the same file.

Props are passed in to Functional Components as type parameters e.g. `const FaceRecognition: React.FC<FaceRecognitionProps>`, where FaceRecognitionProps is defined as an interface within the same file.


### Authentication Context

#### useAuth() custom hook to provide AuthContext

#### Use of local storage to persist user auth status


### Challenges

#### Use of react-app-rewired

Use of `declare context` in the Home class component required use of TypeScript namespaces, which are not supported in Babel by default.  
```typescript
import { AuthContext, User } from '../../contexts/AuthContext'

static contextType = AuthContext
declare context: React.ContextType<typeof AuthContext> 
```  

To enable TypeScript namespaces, `@babel/plugin-transform-typescript` has to be added to the Babel configuration before all other plugins.

Instead of running the `eject` script that comes with Create React App to customise one line for the Babel configuration, the [customize-cra](https://github.com/arackaf/customize-cra/) library that depends on the [react-app-rewired](https://github.com/timarney/react-app-rewired) library was installed in order to tweak the create-react-app configuration by adding plugins, loaders, etc.

1. Install customize-cra and react-app-rewired:
```
npm i customize-cra react-app-rewired --save-dev
```
2. Create the <code>config-overrides.js</code> file at the project root folder with the following code:
```
const { useBabelRc, override } = require("customize-cra");
// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc());
```
3. Create the <code>.babelrc</code> file at the project root folder and define the following plugin:
```
{
  "plugins": [
    [
      "@babel/plugin-transform-typescript",
      {
        "allowDeclareFields": true
      }
    ]
  ]
}
```
Alternatively, directly register the Babel plugin(s) in <code>config-overrides.js</code> without the need for a separate <code>/babelrc</code> file:
```
const {
    override,
    addExternalBabelPlugin
  } = require("customize-cra");

module.exports = override(
    addExternalBabelPlugin([
        "@babel/plugin-transform-typescript",
        { allowNamespaces: true }
    ])
);
```
Or:
```
// Overrides create-react-app webpack configs without ejecting
// https://github.com/timarney/react-app-rewired

const { addBabelPlugins, override } = require("customize-cra");
module.exports = override(
  ...addBabelPlugins(
    "babel-plugin-myPlugin"
    /* Add plug-in names here (separate each value by a comma) */
  )
);
```
4. In the package.json, 'flip' the existing calls to `react-scripts` for start, build and test:
```
  /* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```
5. As this is a TypeScript project, a compile error will be generated as the <code>config-overrides.js</code> file is CommonJS.  Changing the code to ESM with <code>import</code> statements still produces an error as a call is made to another <code>config-overrides.js</code> from within <code>/node_modules</code> folder. In the <code>tsconfig.json</code> file, change the `module` key value from `esnext` to `CommonJS`.

#### Serverless Function

As the app is deployed to Vercel, the serverless function for NodeJS is implemented as required by Vercel.  

Pre-requisite: The serverless function makes an async call to the backend server using Axios.  Install Axios library first: <code>npm i axios</code>

1. Create an <code>/api</code> folder at the project root directory.

2. Create a file <code>proxy.ts</code> in the <code>/api</code> folder.  Each named file in the /api directory is a separate route.

3. As this is a TypeScript file, the type definitions must be installed: <code>npm i @vercel/node --save-dev</code>.  The request and response objects passed to the handler function will be of types <code>VercelRequest</code> and <code>VercelResponse</code>

4. Define an async function in <code>proxy.ts</code> to forward the request to the backend server using Axios.

5. The `backendUrl` is obtained as part of the query parameter, which is then passed as a url string to an axios call with the same request method, headers and body as the originating call from the client app.

6. The response from the backend server is passed back to the client.  Otherwise, an error is putput to the console and a 500 internal server error returned.

##### Use of HTTP instead of HTTPS
As this project is deliberately kept low-cost by requiring a new stack to be deployed each time, no domain nor CA was purchased for a secure HTTPS connection.  The stack is always destroyed after testing.

Port 80 will be open, thus the front-end client will make calls to http://<EC2_public_URL>.

As the browser will not allow mixed media content to be served (the server is serving over HTTP instead of HTTPS), all requests from the front-end client will be routed through a serverless function, deployed together with the front-end app to Vercel, thus bypassing browser restrictions.


## Enhancements/Todos

Possible refactoring:

### Get a ref to the image
1. In the Home component, the calculateFaceLocations function gets a direct reference to the DOM object that is the image element by using <code>const image = document.getElementById('inputImage') as HTMLImageElement</code>.  A ref can be defined in the Home component to access the element <code>const imgRef = useRef()</code>, and then passed to the FaceRecognition component to be assigned to the <code>ref</code> attribute of the image element: <code><img ref={imgRef} /></code>.  After mounting, access the DOM element with <code>imgRef.current</code>.

### Implement component separation to replace repeated UI features:
Smart components are app-level components that perform functions and keep track of state, while dumb components just render UI based on props received and may manage own state but do not impact app-level state.  Smart components that were situated in this folder could have gone into their own /container folder if the project scales.  Traditionally, smart components are class-based and passes props to presentational components.  

1. The FaceRecognition component could have rendered a dumb FaceRecognitionWithBoundingBoxes component by passing in the bounding box and sentiments data.
2. A Navigation container could have rendered dumb NavigationUserLoggedOut and NavigationUserLoggedIn components by passing in the currentUser logged in.  

### Centralise fetch API logic in custom hook
1. Centralise fetch API functionality in the custom hook useFetchAPI, which will return the loading, error or data states to the Home, Register and SignIn components that call fetch API.
2. The URL fetched can be constructed from within the useFetchAPI hook by concatenating the URL of the serverless function with the required endpoint of the backend API as part of the query parameter.

### Create a main route configuration file or router based on routes data
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

#### Allowing TypeScript namespaces in Create-React-App by installing Babel plugin for TypeScript

[Simplest way to install Babel plugins in Create React App](https://dev.to/ansonh/simplest-way-to-install-babel-plugins-in-create-react-app-7i5)

[How to allow namespaces in CRA?](https://stackoverflow.com/questions/61240655/how-to-allownamespaces-in-cra)

[@babel/plugin-transform-typescript](https://babeljs.io/docs/babel-plugin-transform-typescript)

[@babel/preset-typescript](https://babeljs.io/docs/babel-preset-typescript)

[React App Rewired GitHub repo](https://github.com/timarney/react-app-rewired)

#### Others

[React useRef() Hook Explained in 3 steps](https://dmitripavlutin.com/react-useref/)

[React API reference: useRef](https://react.dev/reference/react/useRef)

[React project folder structure ](https://blog.webdevsimplified.com/2022-07/react-folder-structure/)

[Categorizing Components into Smart & Dumb Components, in React](https://www.digitalocean.com/community/tutorials/react-smart-dumb-components)

[Dumb components and smart components](https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43)

[React 18 Improves Application Performance - useTransition hook to defer/interrupt rendering of low-priority task to keep the UI interactive](https://vercel.com/blog/how-react-18-improves-application-performance)

### Vercel

[Vercel CLI: Overview](https://vercel.com/docs/cli)

[Vercel CLI: dev](https://vercel.com/docs/cli/dev)

[Vercel Serverless Functions `type: "module"` got error](https://github.com/orgs/vercel/discussions/1225)

### TypeScript

[TypeScript file extension for JSX should be <code>.tsx</code> instead of <code>.ts</code>](https://stackoverflow.com/a/57947249)

[Difference between esnext, es6, es2015 module targets](https://github.com/microsoft/TypeScript/issues/24082)

[TypeScript Namespaces and Modules](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html)

### Others

[Truncate decimal numbers in JavaSript](https://stackoverflow.com/a/64082140)

[process not defined in browser](https://www.reddit.com/r/reactjs/comments/m452dv/processenv_process_is_not_defined/?rdt=57516)

[Mixed media content: Website delivers HTTPS pages but contains HTTP links](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content/How_to_fix_website_with_mixed_content)

[Web API error - This request has been blocked; the content must be served over HTTPS](https://stackoverflow.com/a/52133425)

[W3C Accessibility Checker](https://www.accessibilitychecker.org/guides/wcag/)

