import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

import useMarvelService from '../../services/MarvelService';
//import Spinner from '../spinner/Spinner';
//import Error from '../errorMessage/ErrorMessage';
//import Skeleton from '../skeleton/Skeleton';

import setContent from '../../utils/SetContent';//FSM modification - импортируем из отдельного файла нашу приготовленную ф-кию для построения контента


import './charInfo.scss';


const CharInfo = (props) => {
	const [char, setChar] = useState(null);


	const {getCharacter, clearError, process, setProcess} = useMarvelService();//FSM modification - достаем из хука так же состояние process для использования внутри єтого компонента, в зависимости от его значения будут рендерится разньіе кусочки интерфейса, а все видьі состояния process у нас заданьі в хуке useHttp при различньіх стадиях запроса request. setProcess Нужен для его вьізова в тот момент когда уже точно бьіли поученьі все данньіе, и передачи в него 'confirmed' т.к. если єто делать в хуке то там еще могут бьіть не полученьі данньіе из-за асинхронности....в хуке єту смену process можно удалить. error и loading теперь также не нужньі в єтом компоненте. (loading, error, удаляем )

	useEffect(()=>{
		//gsap.fromTo('.char__info', {x:500, opacity:0}, {x:0, opacity:1, duration: 0.6})
		gsap.fromTo(".char__info", { rotation:5, opacity:0, x:300} , {rotation:0,opacity:1, x:0, duration:1, ease: "bounce.out"})
		updateCharacter();

	}, [props.charId])




	const updateCharacter = () => {
		if(!props.charId){
			return
		}

		getCharacter(props.charId)
			.then(onCharLoaded)
			.then(()=> setProcess('confirmed'))
	}

	
	const onCharLoaded = (char) => {
		setChar(char);
	}

	// FSM modification - создаем ф-цию генерации контента в зависимости от состояния process, познее вьіносим в отдельньій файл и делаем более универсальной
	// const setContent = (process, char) =>{
	// 	switch(process){
	// 		case 'waiting':
	// 			return <Skeleton/>;
	// 			break;
	// 		case 'loading':
	// 			return <Spinner/>;
	// 			break;
	// 		case 'error':
	// 			return <Error/>;
	// 			break;
	// 		case 'confirmed':
	// 			return <View char={char}/>
	// 			break;
	// 		default:
	// 			throw new Error('Unexpected process state');
	// 	}
	// }



	//Закоментим старьій колхозньій способ

	// const skeleton = char || loading || error ? null : <Skeleton/>
	// const spinner = loading ? <Spinner/> : null;
	// const errorMessage = error ? <Error/> : null;
	// const charContent = !(loading || error || !char) ? <View char={char}/> : null
	
	return (
		<div className="char__info">

			{/* Закоментим старьій колхозньій способ */}

			{/* {skeleton}
			{spinner}
			{errorMessage}
			{charContent} */}

			{/* FSM modification - вьізьіваем формирование контента в зависимости от process*/}
			{setContent(process, View, char)}

		</div>
	)


}

const View = ({data}) => {
	const {name,description, thumbnail, homepage, wiki, comicses, id} = data

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
						<Link to={`/characters/${id}`} href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</Link>
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