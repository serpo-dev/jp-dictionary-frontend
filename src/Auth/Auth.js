import React, { useEffect } from 'react';

const Auth = (props) => {
    useEffect(() => {
        document.title = 'Auth';
    }, []);
    return (
        <h2>auth</h2>
    );
};

export default Auth;