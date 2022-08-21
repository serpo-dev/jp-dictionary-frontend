import React from 'react';
import { useNavigate, useParams } from 'react-router';


const NotFound = () => {
    const navigate = useNavigate();
    navigate('../');

    return (<></>)
};

export default NotFound;