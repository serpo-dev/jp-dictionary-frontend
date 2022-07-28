import React, { useEffect } from 'react';

const Home = (props) => {
    useEffect(() => {
        document.title = 'Home';
    }, []);
    return (
        <h2>home</h2>
    );
};

export default Home;