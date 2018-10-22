import React from 'react';
import '.././App.css';

const Home = () => (
    <div className='home box'>
        <h2>Hello World!</h2>
        <p>This is TODO APP page.</p>
        <ul>Here U can:
            <li>walk through the pages,</li>
            <li>look at the TODO list,</li>
            <li>add new todo,</li>
            <li>filter it</li>
            <li>and watch its description</li>
        </ul>
    </div>
);

export default Home;