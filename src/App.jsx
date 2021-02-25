import React, { useState, useEffect } from 'react';
import './App.css';
import PlayBar from './PlayBar/PlayBar.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PlayBar />
      </header>
    </div>
  );
}

export default App;
