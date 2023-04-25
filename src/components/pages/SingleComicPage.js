import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import { gsap } from 'gsap';

// import useMarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/Spinner';
// import Error from '../errorMessage/ErrorMessage';
// import AppBanner from '../appBanner/AppBanner';

import './singleComicPage.scss';


// const SingleComicPage = () => {
// 	const {comicId} = useParams();
// 	const [comic, setComic] = useState(null);

// 	const {loading, error, getComic, clearError} = useMarvelService();

// 	useEffect(()=>{
// 		showComic();

// 	}, [comicId])

// 	const onComicLoaded = (comic) => {
// 		setComic(comic);
// 	}


// 	const showComic = () => {
// 		clearError();
		
// 		getComic(comicId)
// 			.then(onComicLoaded)
// 	}



// 	const spinner = loading ? <Spinner/> : null;
// 	const errorMessage = error ? <Error/> : null;
// 	const comicContent = !(loading || error || !comic) ? <View comic={comic}/> : null;



//     return (
// 		<>
// 			<AppBanner/>
// 			{spinner}
// 			{errorMessage}
// 			{comicContent}
// 		</>
		
//     )
// }

const SingleComicPage = ({data}) => {
	const {name,thumbnail, pageCount, price, description, language} = data;

	useEffect(()=>{
		gsap.fromTo(".single-comic__img", {rotation:-5, opacity:0, x:-150} , {rotation:0,opacity:1, x:0, duration:1.6, ease: "elastic"})
		gsap.fromTo(".single-comic__info", {rotation:5, opacity:0, x:180} , {rotation:0,opacity:1.2, x:0, duration:1.3, delay:0.2, ease: "elastic"})
	},[])

	
	return (
		<div className="single-comic">
			<Helmet>
					<meta
						name="description"
						content={`${name} comics book`}
					/>
					<title>{name}</title>
			</Helmet>
			<img src={thumbnail} alt={name} className="single-comic__img"/>
			<div className="single-comic__info">
				<h2 className="single-comic__name">{name}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}$</div>
			</div>
			<Link to='/comics' className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleComicPage;