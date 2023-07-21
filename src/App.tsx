import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Logo from './components/Logo'

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <Navigation />
        <Logo />
        {/* <ImageLinkForm />
        <FaceRecognition /> */}
      </div>
    );
  }
  
}

export default App;
