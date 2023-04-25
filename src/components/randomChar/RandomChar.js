import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import './randomChar.scss';
//import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

import useMarvelService from "../../services/MarvelService";

//import Spinner from '../spinner/Spinner';
//import Error from '../errorMessage/ErrorMessage';

import setContent from '../../utils/SetContent';


const RandomChar = () => {

	const [char, setChar] = useState(null);

	const {getCharacter, clearError, process, setProcess} = useMarvelService();//(loading, error, удаляем )


	useEffect(() => {
		gsap.fromTo('.randomchar', {scale:0.5, opacity:0, y:100}, {scale:1, opacity:1, y:0, duration: 0.6})
		updateCharacter();
	}, [])

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const updateCharacter = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
		getCharacter(id)
			.then(onCharLoaded)
			.then(()=> setProcess('confirmed'));
	}

	


	//const spinner = loading ? <Spinner/> : null;
	//const errorMessage = error ? <Error/> : null;
	//const charContent = !(loading || error || !char) ? <View char={char}/> : null
	

	return (
		<div className="randomchar">
			{/* {spinner}
			{errorMessage}
			{charContent} */}

			{setContent(process, View, char)}

			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!<br/>
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">
					Or choose another one
				</p>
				<button onClick={updateCharacter} className="button button__main">
					<div className="inner">try it</div>
				</button>
				{/* <img src={process.env.PUBLIC_URL + './images/mjolnir.png'} alt="mjolnir" className="randomchar__decoration"/> */}
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
			</div>
		</div>
	)

}

const View = ({data}) => {
	
	const {name,description, thumbnail, homepage, wiki, id} = data

	const thumbStyle = thumbnail.includes('image_not_available') ? {objectFit:'contain'} : null;

	useEffect(()=>{
		gsap.fromTo(".randomchar__block", {rotation:25, opacity:0, y:-300} , {rotation:0,opacity:1, y:0, duration:1, ease: "bounce.out"})
	 },[])
	
	return (
		<div className="randomchar__block">
			<img style={thumbStyle} src={thumbnail} alt="Random character" className="randomchar__img"/>
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{description}</p>
				<div className="randomchar__btns">
					<Link to={`/characters/${id}`} href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</Link>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}



export default RandomChar;