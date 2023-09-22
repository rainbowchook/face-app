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
```bash
npm run build
```
Production Run script:
```bash
npm run start
```
Dev Run script:
```bash
npm run dev
```

### Vercel dev setup
This project is deployed to Vercel, utilising a serverless function.  The CRA project can be locally tested together with the serverless function from within a Vercel dev server.

To run the project from within the Vercel dev server: 
1. Install the Vercel CLI globally
```bash
npm i -g vercel
```
2. Verify the version of Vercel CLI currently being used
```bash
vercel --version
```
3. Login and authenticate with <code>vercel login</code> before accessing resources or performing administrative tasks i.e. deploying to Vercel from a terminal environment.  Alternatively, <code>--token</code> can be passed as an option to a <code>vercel</code> command if a Vercel token was defined.

4. To replicate the Vercel deployment environment locally and test the Vercel project before deploying, use:
```bash
vercel dev
```

#### Change default vercel command settings
The default script run by <code>vercel dev</code> seems to be <code>react-scripts start</code>, but the scripts have been reconfigured to use <code>react-app-rewired start</code>.  Additional configuration is needed to configure <code>vercel dev</code> to run the correct script.  

Create <code>vercel.json</code> with the following code:
```js
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

The types of Props and State are passed in as type parameters e.g. <code>class Home extends Component<{}, AppState></code>, where AppState is defined as an interface within the same file.  Props are defaulted to an empty object {} as none are received in this component.

Props are passed in to Functional Components as type parameters e.g. `const FaceRecognition: React.FC<FaceRecognitionProps>`, where FaceRecognitionProps is defined as an interface within the same file.


### Authentication Context

#### AuthContext
An Authentication Context was created by passing into <code>React.createContext</code> the <code>AuthContext</code> as a type parameter, and the AuthContext passed in contains the default values for the <code>currentUser</code> logged in, as well as the <code>signIn</code>, <code>signOut</code> and <code>addEntriesCount</code> functions.  

#### AuthProvider
The Authentication Provider is a typical React Functional Component, with <code>AuthProviderProps</code> passed in as a type parameter.  As it receives `children` as props, <code>AuthProviderProps</code> type was defined with a `children` property of type `ReactNode`.
```typescript
type AuthProviderProps = {
  children?: ReactNode
}
```

It provides the values of the <code>currentUser</code>, <code>signIn</code>, <code>signOut</code> and <code>addEntriesCount</code> to all children that wrapped within the enclosing `<AuthProvider> ... </AuthProvider>` tags used in the <code>App</code> component.
```typescript
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<null | User>(null)
  const [sessionUser, setSessionUser] = useLocalStorage<null | User>(
    'currentUser',
    currentUser
  )

...

  const authContextValue: AuthContextType = {
    currentUser,
    signIn,
    signOut,
    addEntriesCount,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
```

The AuthProvider keeps two states, <code>currentUser</code> and <code>sessionUser</code>, with the <code>useState()</code> and <code>useLocalStorage()</code> hooks respectively.  The <code>currentUser</code> is the user that logged in via the app, and the <code>sessionUser</code> is the user that was stored in the local storage as the last user logged in.  

A <code>useEffect()</code> hook will update the <code>sessionUser</code> to the <code>currentUser</code> if the <code>currentUser</code> changes.
```typescript
  useEffect(() => {
    if (!sessionUser || sessionUser !== currentUser) {
      setSessionUser(currentUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])
```

Other functions defined in the <code>AuthProvider</code> are <code>signIn</code>, <code>signOut</code> and <code>addEntriesCount</code> functions:

<code>signIn(user: User): void</code> sets the <code>currentUser</code>.

<code>signOut(): void</code> sets the <code>currentUser</code> to <code>null</code>.

<code>addEntriesCount(entries: number): void</code> sets the<code>currentUser</code> with an updated value for the `entries` property.

#### useAuthContext() custom hook to provide AuthContext

Instead of accessing the <AuthContext</code> directly from <code>React.useContext()</code> hook, a custom hook was created to return the <code>AuthContext</code>.  

#### useLocalStorage() to persist user auth status

A custom hook, <code>useLocalStorage</code>, was created to use local storage to store the authentication status of the current user, in the <code>AuthProvider</code> component.

Instead of passing in an initial state value to `React.useState()` hook, a function can be passed in as a parameter instead - in this case, a `React.useCallback()` function that reads the `initialValue` of a `key` in the local storage.

A `storedValue` of type T is set to the `initialValue` of the `key` passed in as parameters to the `useLocalStorage` hook, returning an array consisting of a `storedValue` of type T and a `setValue` function of type `SetValue<T>`, following the return type of a `React.useState()` hook:
```typescript
export function useLocalStorage<T> (key: string, initialValue: T): [T, SetValue<T>] {

...

  return [storedValue, setValue]
}
```

As `localStorage` is only available to the `window` object within a browser, there is a check for whether `window` is `undefined` before getting or setting the value of a `key`.  

A `React.useEffect()` hook sets the `storedValue` to the new `initialValue` passed in to the `useLocalStorage` hook.

If the local storage returns `null` for a particular `key`, the `storedValue` will be initialised to the `initialValue`.  If not, the value for `key` stored in the local storage will be parsed into a JSON object of type T and returned.  

A `setValue` function is defined so that the new value is set in the local storage with the `key` and stringified version of the new `storedValue`.  

### Challenges

#### Use of react-app-rewired

Use of `declare context` in the Home class component required use of TypeScript namespaces, which are not supported in Babel by default.  
```typescript
import { AuthContext, User } from '../../contexts/AuthContext'

static contextType = AuthContext
declare context: React.ContextType<typeof AuthContext> 
```

When building the CRA app with the 'declare' field, an error similar to this is produced: 
```
TypeScript 'declare' fields must first be transformed by @babel/plugin-transform-typescript.
If you have already enabled that plugin (or '@babel/preset-typescript'), make sure that it runs before any plugin related to additional class features:
 - @babel/plugin-proposal-class-properties
 - @babel/plugin-proposal-private-methods
 - @babel/plugin-proposal-decorators
```

To enable TypeScript namespaces, `@babel/plugin-transform-typescript` with `allowDeclareFields: true` has to be added to the Babel configuration.  

Instead of running the `eject` script that comes with Create React App to customise one line for the Babel configuration, the [customize-cra](https://github.com/arackaf/customize-cra/) library that depends on the [react-app-rewired](https://github.com/timarney/react-app-rewired) library was installed in order to tweak the create-react-app configuration by adding plugins, loaders, etc.

1. Install customize-cra and react-app-rewired:
```bash
npm i customize-cra react-app-rewired --save-dev
```
2. Create the <code>config-overrides.js</code> file at the project root folder with the following code:
```js
const { useBabelRc, override } = require("customize-cra");
// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc());
```
3. Create the <code>.babelrc</code> file at the project root folder and define the following plugin:
```js
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
```js
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
```js
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
```diff
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

##### Alternative solution

For TS pre 3.7:
```diff
static contextType = AuthContext
- declare context: React.ContextType<typeof AuthContext>
+ context!: React.ContextType<typeof AuthContext>
```
Recommended by VS Code IDE:
```
(property) Home.context: AuthContextType | undefined
If using the new style context, re-declare this in your class to be the React.ContextType of your static contextType. Should be used with type annotation or static contextType.

static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
@see — https://react.dev/reference/react/Component#context
```

#### Serverless Function

As the app is deployed to Vercel, the serverless function for NodeJS is implemented as required by Vercel.  

Pre-requisite: The serverless function makes an async call to the backend server using Axios.  Install Axios library first: <code>npm i axios</code>

1. Create an <code>/api</code> folder at the project root directory.

2. Create a file <code>proxy.ts</code> in the <code>/api</code> folder.  Each named file in the /api directory is a separate route.

3. As this is a TypeScript file, the type definitions must be installed: <code>npm i @vercel/node --save-dev</code>.  The request and response objects passed to the handler function will be of types <code>VercelRequest</code> and <code>VercelResponse</code>

4. Define an async function in <code>proxy.ts</code> to forward the request to the backend server using Axios.

5. The `backendUrl` is obtained as part of the query parameter, which is then concatenated with the `serverUrl` and passed as a url string to an axios call with the same request method, headers and body as the originating call from the client app.  

6. The response from the backend server is passed back to the client.  Otherwise, an error is putput to the console and a 500 internal server error returned to the client.  The detailed error can be viewed on the server console or from the error logs in the Vercel dashboard.

##### 
From Chrome DevTools, open the Network tab and submit a request to remote server to register a user e.g. POST /users endpoint.  

##### Example of a successful response:
Successful registration returns a `User` object:
```js
{
    "id": 4,
    "name": "test3",
    "email": "test3@test.com",
    "entries": "0",
    "joined": "2023-09-12T07:26:59.992Z"
}
```

```
Request URL:
https://face-app-lilac.vercel.app/api/proxy?backendUrl=http://<EC2_PUBLIC_URL>.<AWS_REGION>.compute.amazonaws.com/users
Request Method:
POST
Status Code:
201
Remote Address:
<REMOTE_HOST_IP>:443
Referrer Policy:
strict-origin-when-cross-origin
```

##### Example of an error response:
Unsuccessful registration returns a 500 error response:
```js
{"error":"Internal Server Error"}
```
```
Request URL:
https://face-app-lilac.vercel.app/api/proxy?backendUrl=http://<EC2_PUBLIC_URL>.<AWS_REGION>.compute.amazonaws.com/users
Request Method:
POST
Status Code:
500
Remote Address:
<REMOTE_HOST_IP>:443
Referrer Policy:
strict-origin-when-cross-origin
```

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

### Convert into PWA
This app can be converted into a Progressive Web App (PWA) without much code change, aloowing users to have an app-like experience on their mobile devices without installing a native app.  For the browser to detect the web app as an installable PWA, a service worker and web manifest must be present in the app.

#### Service worker
Enable the service worker functionality (client-side proxies that pre-cache key resources like text, images, and other content), improving browser speed.  PWAs added to the homescreen load faster and work offline when there is an active service worker.  

##### Creating service worker with CRA custom template
If creating a CRA project from scratch with custom templates via <code>npx create-react-app my-app --template cra-template-pwa-typescript</code> for TypeScript (or <code>npx create-react-app my-app --template cra-template-pwa</code>), switch the <code>serviceWorker.unregister()</code> to <code>serviceWorker.register()</code>. This will generate an offline-first service worker to automatically pre-cache all local assets and update them when there is an updated deployment.  A <code>service-worker.js</code> file and a <code>serviceWorkerRegistration</code> file will be created in the /src folder.

##### Converting existing React app to PWA
If not creating a CRA project from scratch with the <code>cra-template-pwa-typescript</code> (or <code>cra-template-pwa</code> template), then follow the following steps to [create and install the service worker](https://engineering.99x.io/converting-react-app-into-a-pwa-43a247c35886).

Start by creating a <code>public/serviceWorker.js</code> file to install the service worker (SW), listen for requests/serve offline cached data and activate the SW:
```js
const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('Opened cache');

			return cache.addAll(urlsToCache);
		})
	);
});

// Listen for requests
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then(() => {
			return fetch(event.request).catch(() => caches.match('offline.html'));
		})
	);
});

// Activate the SW
self.addEventListener('activate', (event) => {
	const cacheWhitelist = [];
	cacheWhitelist.push(CACHE_NAME);

	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			)
		)
	);
});
```

Add the following script to the <code>index.html</code>:
```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./serviceWorker.js')
        .then((reg) => console.log('Success: ', reg.scope))
        .catch((err) => console.log('Failure: ', err));
      });
    }
</script>
```

#### Web manifest
Modify the web manifest file <code>manifest.json</code> to add metadata like name, icons and start URL (location of index document to start when opening the app e.g. <code>index.html</code>) for the app so that the user can add the web app to the mobile device's homescreen or desktop, mimicking installation of a native app.  Splash icons that are 512x512 pixels in size should be defined in the /public/images folder for the home screen, app launcher, task switcher, splash screen, etc.  

#### Lighthouse Audit
Then generate the Lighthouse report in Chrome browser's DevTools to confirm that the app is indeed an installable PWA, among other things.  An audit checklist is generated for aspects of PWA like performance, accessibility, PWAs, etc.

## CI/CD

Continuous Integration and Continuous Deployment is achieved by integrating the Vercel for GitHub app and granting access to the face-app GitHub project.  Vercel for GitHub automatically deploys PRs to Vercel, allowing every PR to be previewed live, without any configuration required.

#### Enhancements/Todo
A GitHub action could also be configured to deploy to Vercel with the Vercel CLI and a Vercel token stored as a GitHub Actions secret.

## References

### React 

#### React Context API

[Use React Context for Auth](https://dayvster.com/blog/use-context-for-auth)

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

[TypeScript 'declare' fields must first be trasnformed by @babel/plugin-transform-typescript](https://stackoverflow.com/questions/70690029/typescript-declare-fields-must-first-be-transformed-by-babel-plugin-transform)

[How to allow namespaces in CRA?](https://stackoverflow.com/questions/61240655/how-to-allownamespaces-in-cra)

[@babel/plugin-transform-typescript](https://babeljs.io/docs/babel-plugin-transform-typescript)

[@babel/preset-typescript](https://babeljs.io/docs/babel-preset-typescript)

[React App Rewired GitHub repo](https://github.com/timarney/react-app-rewired)

#### Converting React App to PWA

[Converting React App into a PWA](https://engineering.99x.io/converting-react-app-into-a-pwa-43a247c35886)

[The Ultimate Guide to Converting React Apps to Progressive Web Apps](https://dev.to/icyybee/the-ultimate-guide-to-converting-react-apps-to-progressive-web-apps-1pnp)

[Converting Existing React App to PWA](https://medium.com/swlh/converting-existing-react-app-to-pwa-3c7e4e773db3)

[Create React App: Making a Progressive Web App](https://create-react-app.dev/docs/making-a-progressive-web-app/)

[Build a progressive web app (PWA) with React](https://blog.logrocket.com/building-pwa-react/)

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

[TypeScript useLocalStorage custom hook](https://usehooks-ts.com/react-hook/use-local-storage)

### Others

[Truncate decimal numbers in JavaSript](https://stackoverflow.com/a/64082140)

[process not defined in browser](https://www.reddit.com/r/reactjs/comments/m452dv/processenv_process_is_not_defined/?rdt=57516)

[Mixed media content: Website delivers HTTPS pages but contains HTTP links](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content/How_to_fix_website_with_mixed_content)

[Web API error - This request has been blocked; the content must be served over HTTPS](https://stackoverflow.com/a/52133425)

[W3C Accessibility Checker](https://www.accessibilitychecker.org/guides/wcag/)

