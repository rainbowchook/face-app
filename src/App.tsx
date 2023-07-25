import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
  
}

export default App;
