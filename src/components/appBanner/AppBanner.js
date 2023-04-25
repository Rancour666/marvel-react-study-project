import { useEffect } from 'react';

import './appBanner.scss';
import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';

import { gsap } from 'gsap';

const AppBanner = () => {

	useEffect(() => {
		gsap.fromTo('.app__banner', {scale:0.5, opacity:0}, {scale:1, opacity:1, duration: 0.6})
	}, [])

    return (
        <div className="app__banner">
            <img src={avengers} alt="Avengers"/>
            <div className="app__banner-text">
                New comics every week!<br/>
                Stay tuned!
            </div>
            <img src={avengersLogo} alt="Avengers logo"/>
        </div>
    )
}

export default AppBanner;