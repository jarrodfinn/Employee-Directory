import React from 'react';
import Wrapper from './components/wrapper';
import Header from './components/header';
import Main from './components/main';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="body">
              <Wrapper>
        <Header />
        <Main />
      </Wrapper>

      </div>
    </div>
  );
}

export default App;
