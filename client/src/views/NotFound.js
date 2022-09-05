import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import Header from '../components/Header';

const NotFound = () => {

    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../assets/lotties/404.json')
        })
    },[])
    
    return (
        <>
            <Header/>
            <div className="container" ref={container}></div>
        </>
    )
}

export default NotFound;