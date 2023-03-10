import { useState, useEffect, useRef } from 'react';
import PropTypes  from 'prop-types';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/ErrorMessage';

import './charList.scss';
//import abyss from '../../resources/img/abyss.jpg';






const CharList = (props) => {

	const [chars, setChars] = useState([]);

	const [offset, setOffset] = useState(0);
	const [newCharsLoading, setNewCharsLoading] = useState(false);
	const [charEnded, setCharEnded] = useState(false);

	const {loading, error, getAllCharacters, clearError} = useMarvelService();

	useEffect(()=>{
		onRequest()
	},[])

	const offsetChange = (offset, e) =>{
		let offsetStep;
		let newOffset;

		setNewCharsLoading(!newCharsLoading);
		if(e.currentTarget.id === 'next'){
			
			offsetStep = 9
		}
		if(e.currentTarget.id === 'prev'){

			offsetStep = -9
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
		getAllCharacters(offset)
			.then(onCharListLoaded)

	}

	const onCharListLoaded = (newCharList) => {
		setChars([ ...newCharList]);
		setNewCharsLoading(false);
		setCharEnded(newCharList.length < 9 ? true : false);
	}

	const itemRefs = useRef([]);

	const onFocus = (id)=>{
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	}



	const renderList = (chars) =>{
		const charList = chars.map((char, i) => {
			const thumbStyle = char.thumbnail.includes('image_not_available') ? {objectFit:'contain'} : null;
			const delay = 300 + i*75;
			return (
				<SwitchTransition mode='out-in'>
					<CSSTransition key={char.id} timeout={delay} classNames={"char__item"} mountOnEnter>
						<li
							ref={(el) => (itemRefs.current[i] = el)}
							tabIndex ={0}
							//style={{'transition':`all ${delay}ms ease`}}
							onClick={() => {
								props.onCharSelected(char.id);
								onFocus(i)
							}}
							onKeyDown={(e) => {
								if (e.key === ' ' || e.key === "Enter") {
									if(e.key === ' '){
										e.preventDefault();
									}
									props.onCharSelected(char.id);
									onFocus(i)
								}
							}}
							className="char__item">
							<img
								style={thumbStyle}
								src={char.thumbnail}
								alt="abyss"/>
							<div className="char__name">{char.name}</div>

						</li>
					</CSSTransition>
					</SwitchTransition>
			)
		})
		return (
			<TransitionGroup component={'ul'}  className="char__grid">
				{charList}
			</TransitionGroup>
		)
	}

	const charList = renderList(chars)

	const spinner = loading && !newCharsLoading ? <Spinner/> : null;
	const errorMessage = error ? <Error/> : null;
	//const charListContent = !(loading || error) ? charList : null



	return (
		<div className="char__list">
			{spinner}
			{errorMessage}
			{charList}
			<div style ={{'display': 'flex' }}>
				<button
					style ={{'display': offset ? 'block' : 'none' }}
					id='prev'
					disabled={newCharsLoading}
					onClick={(e) => offsetChange(offset,e)}
					className="button button__secondary button__long">
					<div className="inner">load prev</div>
				</button>
				<button
					style ={{'display': charEnded ? 'none' : 'block' }}
					id='next'
					disabled={newCharsLoading}
					onClick={(e) => offsetChange(offset,e)}
					className="button button__main button__long">
					<div className="inner">load next</div>
				</button>
			</div>
			
		</div>
	)


}

CharList.propTypes ={
	onCharSelected: PropTypes.func.isRequired
}



export default CharList;