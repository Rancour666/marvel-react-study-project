import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

import {Helmet} from "react-helmet";

// import useMarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/Spinner';
// import Error from '../errorMessage/ErrorMessage';
// import AppBanner from '../appBanner/AppBanner';

import './singleCharacterPage.scss';


// const SingleCharacterPage = () => {
// 	const {characterId} = useParams();
// 	const [char, setChar] = useState(null);

// 	const {loading, error, getCharacter, clearError} = useMarvelService();

// 	useEffect(()=>{
// 		showChar();

// 	}, [characterId])

// 	const onCharLoaded = (char) => {
// 		setChar(char);
// 	}


// 	const showChar = () => {
// 		clearError();
		
// 		getCharacter(characterId)
// 			.then(onCharLoaded)
// 	}



// 	const spinner = loading ? <Spinner/> : null;
// 	const errorMessage = error ? <Error/> : null;
// 	const charContent = !(loading || error || !char) ? <View char={char}/> : null;


// 	return (
// 		<>
// 			<AppBanner/>
// 			{spinner}
// 			{errorMessage}
// 			{charContent}
// 		</>
		
// 	)
// }

const SingleCharacterPage = ({data}) => {
	const {name,thumbnail, description} = data;

	useEffect(()=>{
		gsap.fromTo(".single-character__img", { opacity:0, y:150} , {opacity:1, y:0, duration:1.6, ease: "elastic"})
		gsap.fromTo(".single-character__info", { opacity:0, y:180} , {opacity:1.2, y:0, duration:1.3, delay:0.2, ease: "elastic"})
	},[])



	return (
		<div className="single-character">
			<Helmet>
				<meta
					name="description"
					content={`${name} character info`}
				/>
				<title>{name}</title>
			</Helmet>
			<img src={thumbnail} alt={name} className="single-character__img"/>
			<div className="single-character__info">
				<h2 className="single-character__name">{name}</h2>
				<p className="single-character__descr">{description}</p>
			</div>
			<Link to='/characters' className="single-character__back">Back to all</Link>
		</div>
		
	)
}

export default SingleCharacterPage;