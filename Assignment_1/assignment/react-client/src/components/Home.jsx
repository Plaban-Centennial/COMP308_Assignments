
import React, { Component }  from 'react';
//
// this is the home page component
function Home(props)
{
    return (
        <div>
            <h2>Game Library Management System</h2>
            <p>Game Library Management System with CRUD Operations.</p>
        </div>
    );
}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default Home;