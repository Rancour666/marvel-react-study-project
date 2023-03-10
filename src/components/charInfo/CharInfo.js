import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';


import './charInfo.scss';


const CharInfo = (props) => {
	const [char, setChar] = useState(null);


	const {loading, error, getCharacter, clearError} = useMarvelService();

	useEffect(()=>{
		updateCharacter();

	}, [props.charId])




	const updateCharacter = () => {
		if(!props.charId){
			return
		}

		getCharacter(props.charId)
			.then(onCharLoaded)
	}

	
	const onCharLoaded = (char) => {
		setChar(char);
	}

	const skeleton = char || loading || error ? null : <Skeleton/>
	const spinner = loading ? <Spinner/> : null;
	const errorMessage = error ? <Error/> : null;
	const charContent = !(loading || error || !char) ? <View char={char}/> : null
	
	return (
		<div className="char__info">
			{skeleton}
			{spinner}
			{errorMessage}
			{charContent}
		</div>
	)


}

const View = ({char}) => {
	const {name,description, thumbnail, homepage, wiki, comicses} = char

	let comicsesList = <li className="char__comics-item">There is no comicses with that character</li>
	if(comicses.length > 0) {
		comicsesList = comicses.map((comics, i) => {
			if(i > 9) return

			return (
				<Link to={`/comics/${comics.resourceURI.replace('http://gateway.marvel.com/v1/public/comics/', '')}`}
				 //href ={comics.resourceURI} 
				 key={i} className="char__comics-item">{comics.name}</Link>
			)
			
		})
	}
	

	const thumbStyle = thumbnail.includes('image_not_available') ? {objectFit:'contain'} : null;

	return (
		<>
			<div className="char__basics">
				<img style={thumbStyle} src={thumbnail} alt={name}/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comicsesList}
			</ul>
		</>
	)
}


export default CharInfo;