import React from 'react';
import logo from './logo.svg';
import './App.css';

const Post = () => {
  return (
    <div className='vstack'>
      <h3>Title</h3>
      <h4>username</h4>
    </div>
  );
};

function App() {
  return (
    <div className='vstack center'>
      <h1>Header</h1>
      <Post />
      <Post />
    </div>
  );
}

export default App;
