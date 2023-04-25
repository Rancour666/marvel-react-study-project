import { useState, useEffect, useMemo} from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

import useMarvelService from "../../services/MarvelService";

import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/ErrorMessage';

import './comicsList.scss';

//FSM modification - создаем ф-цию генерации контента в зависимости от состояния process, переданного в нее компонента Component и состояния newCharsLoading
const setContent = (process, Component, newComicsesLoading) =>{
	switch(process){
		case 'waiting':
			return <Spinner/>;
		case 'loading':
			return <Spinner minHeight = {'852px'}/>; // если новьіе персонажи грузятся то показьіваем компонент с персонажами
		case 'error':
			return <Error/>;
		case 'confirmed':
			//gsap.fromTo('.comics__list', {scale:2, opacity:0}, {scale:1, opacity:1, duration: 0.6})
			gsap.fromTo('.comics__block', {x:-100, opacity:0}, {x:0, opacity:1, duration: 0.6})

			return <Component/>
		default:
			throw new Error('Unexpected process state');
	}
}

//import uw from '../../resources/img/UW.png';
//import xMen from '../../resources/img/x-men.png';

const ComicsList = (props) => {

	const [comicses, setComicses] = useState([]);

	const [offset, setOffset] = useState(0);
	const [newComicsesLoading, setNewComicsesLoading] = useState(false);
	const [comicsesEnded, setComicsesEnded] = useState(false);



	const {getAllComicses, clearError, process, setProcess} = useMarvelService();//(loading, error, удаляем )

	useEffect(()=>{
		onRequest()
	},[])

	const offsetChange = (offset, e) =>{
		let offsetStep;
		let newOffset;

		setNewComicsesLoading(!newComicsesLoading);
		if(e.currentTarget.id === 'nextComics'){
			
			offsetStep = 8
		}
		if(e.currentTarget.id === 'prevComics'){

			offsetStep = -8
		}

		newOffset = offset + offsetStep;
		setOffset(newOffset);
		
		if(newOffset < 0) {
			newOffset = 0;
			setOffset(0);
		}

		onRequest(newOffset);

	}




	const onRequest = (offset) => {

		clearError();
		getAllComicses(offset)
			.then(onComicsesListLoaded)
			.then(()=> setProcess('confirmed'))
		
	}

	const onComicsesListLoaded = (newComicsesList) => {
		setComicses([ ...newComicsesList]);
		setNewComicsesLoading(false);
		setComicsesEnded(newComicsesList.length < 8 ? true : false);
		//gsap.fromTo(".comics__item", {opacity: 0, scale: 0.5, y: 60}, {opacity:1, scale: 1, y: 0, ease: "power1.in", duration:0.3,stagger: {amount: 0.2, grid: "auto",from: "edges"}})
	}

	const renderComicsesList = (comicses) =>{
		
		const comicsesList = comicses.map((comics) => {
			return (
					
						<li className="comics__item" tabIndex ={0} key={comics.id} >
							<Link to={`/comics/${comics.id}`}>
								<img src={comics.thumbnail} alt="ultimate war" className="comics__item-img"/>
								<div className="comics__item-name">{comics.name}</div>
								<div className="comics__item-price">{comics.price ? comics.price + '$' : 'NOT AVAILABLE'}</div>
							</Link>
						</li>

						
			)
		})

		return (
			<ul className="comics__grid">
					{comicsesList}
			</ul>
		)
	}


	//const comicsesList = renderComicsesList(comicses);
	//const spinner = loading && !newComicsesLoading ? <Spinner/> : null;
	//const errorMessage = error ? <Error/> : null;

	const elements = useMemo(()=> {
		return setContent(process, () => renderComicsesList(comicses), newComicsesLoading)
	}, [process])

	return (
		<div className="comics__list">
			{/* {spinner}
			{errorMessage}
			{comicsesList} */}

			<div className='comics__block'>
				{elements}
			</div>
			

			<div style ={{'display': 'flex','justifyContent': 'center' }}>
				<button
					style ={{'display': offset ? 'block' : 'none', 'margin':'30px 30px 30px 30px' }}
					id='prevComics'
					disabled={newComicsesLoading}
					onClick={(e) => offsetChange(offset,e)}
					className="button button__secondary button__long">
					<div className="inner">load prev</div>
				</button>
				<button
					style ={{'display': comicsesEnded ? 'none' : 'block', 'margin':'30px 30px 30px 30px' }}
					id='nextComics'
					disabled={newComicsesLoading}
					onClick={(e) => offsetChange(offset,e)}
					className="button button__main button__long">
					<div className="inner">load next</div>
				</button>
			</div>
        </div>
    )
}

export default ComicsList;