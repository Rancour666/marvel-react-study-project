import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from "../../services/MarvelService";

import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/ErrorMessage';


import './comicsList.scss';

import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = (props) => {

	const [comicses, setComicses] = useState([]);

	const [offset, setOffset] = useState(0);
	const [newComicsesLoading, setNewComicsesLoading] = useState(false);
	const [comicsesEnded, setComicsesEnded] = useState(false);



	const {loading, error, getAllComicses, clearError} = useMarvelService();

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

	}

	const onComicsesListLoaded = (newComicsesList) => {
		setComicses([ ...newComicsesList]);
		setNewComicsesLoading(false);
		setComicsesEnded(newComicsesList.length < 8 ? true : false);
	}

	const renderComicsesList = (comicses) =>{
		const comicsesList = comicses.map((comics, i) => {
			const delay = 300 + i*75;
			return (
				<SwitchTransition mode='out-in'>
					<CSSTransition key={comics.id} timeout={delay} classNames={"comics__item"} mountOnEnter>
						<li tabIndex ={0}>
							<Link to={`/comics/${comics.id}`}>
								<img src={comics.thumbnail} alt="ultimate war" className="comics__item-img"/>
								<div className="comics__item-name">{comics.name}</div>
								<div className="comics__item-price">{comics.price ? comics.price + '$' : 'NOT AVAILABLE'}</div>
							</Link>
						</li>
					</CSSTransition>
				</SwitchTransition>

						
			)
		})

		return (
			<ul className="comics__grid">
				{comicsesList}
			</ul>
		)
	}


	const comicsesList = renderComicsesList(comicses);
	const spinner = loading && !newComicsesLoading ? <Spinner/> : null;
	const errorMessage = error ? <Error/> : null;


	return (
		<div className="comics__list">
			{spinner}
			{errorMessage}
			{comicsesList}
			<div style ={{'display': 'flex','justifyContent': 'center' }}>
				<button
					style ={{'display': offset ? 'block' : 'none', 'margin':'15px 30px 30px 30px' }}
					id='prevComics'
					disabled={newComicsesLoading}
					onClick={(e) => offsetChange(offset,e)}
					className="button button__secondary button__long">
					<div className="inner">load prev</div>
				</button>
				<button
					style ={{'display': comicsesEnded ? 'none' : 'block', 'margin':'15px 30px 30px 30px' }}
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