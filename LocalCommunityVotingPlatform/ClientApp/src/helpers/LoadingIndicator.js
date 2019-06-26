import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress &&
        <Loader style="loader" type="Circles" color="#534F9D" height="100" width="100" />
    )
}

export default LoadingIndicator;