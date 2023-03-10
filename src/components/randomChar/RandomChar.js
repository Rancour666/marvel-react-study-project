import { useState, useEffect } from 'react';

import './randomChar.scss';
//import thor from '../../resources/img/thor.jpeg';
//import mjolnir from '../../resources/img/mjolnir.png';

import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/ErrorMessage';

import useMarvelService from "../../services/MarvelService";


const RandomChar = () => {

	const [char, setChar] = useState(null);

	const {loading, error, getCharacter, clearError} = useMarvelService();


	useEffect(() => {
		updateCharacter();
	}, [])

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const updateCharacter = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
		getCharacter(id)
			.then(onCharLoaded);
		}


	const spinner = loading ? <Spinner/> : null;
	const errorMessage = error ? <Error/> : null;
	const charContent = !(loading || error || !char) ? <View char={char}/> : null


	return (
		<div className="randomchar">
			{spinner}
			{errorMessage}
			{charContent}
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
				<img src={process.env.PUBLIC_URL + './images/mjolnir.png'} alt="mjolnir" className="randomchar__decoration"/>
			</div>
		</div>
	)

}

const View = ({char}) => {
	
	const {name,description, thumbnail, homepage, wiki} = char

	const thumbStyle = thumbnail.includes('image_not_available') ? {objectFit:'contain'} : null;
	
	return (
		<div className="randomchar__block">
			<img style={thumbStyle} src={thumbnail} alt="Random character" className="randomchar__img"/>
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{description}</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar;