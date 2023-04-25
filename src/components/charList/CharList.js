import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes  from 'prop-types';
import { gsap } from 'gsap';

import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/ErrorMessage';



import './charList.scss';
//import abyss from '../../resources/img/abyss.jpg';


//FSM modification - создаем ф-цию генерации контента в зависимости от состояния process, переданного в нее компонента Component и состояния newCharsLoading
const setContent = (process, Component, newCharsLoading) =>{
	switch(process){
		case 'waiting':
			return <Spinner/>;
		case 'loading':
			
			return <Spinner minHeight = {'1014px'}/>; // если новьіе персонажи грузятся то показьіваем компонент с персонажами
			//return newCharsLoading ? <Component /> : <Spinner minHeight = {'1014px'}/>; // если новьіе персонажи грузятся то показьіваем //компонент с персонажами
		case 'error':
			return <Error/>;
		case 'confirmed':
			gsap.fromTo('.char__block', {x:-100, opacity:0}, {x:0, opacity:1, duration: 0.6})
			return <Component/>
		default:
			throw new Error('Unexpected process state');
	}
}




const CharList = (props) => {
	console.log('render CharList')

	const [chars, setChars] = useState([]);

	const [offset, setOffset] = useState(0);
	const [newCharsLoading, setNewCharsLoading] = useState(false);
	const [charEnded, setCharEnded] = useState(false);

	const {getAllCharacters, clearError, process, setProcess} = useMarvelService();

	useEffect(()=>{
		
		onRequest()
		// eslint-disable-next-line
	},[])

	const offsetChange = (offset, e) =>{
		console.log("offsetChange !")
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
		console.log("onRequest")
		clearError();
		getAllCharacters(offset)
			.then(onCharListLoaded)
			.then(()=> setProcess('confirmed'))


	}

	const onCharListLoaded = (newCharList) => {
		console.log("onCharListLoaded")
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

	// useEffect(()=>{
	// 	//gsap.from(itemRefs, {opacity: 0, y: 50, stagger: 0.1, duration: 0.5});

	// 	gsap.fromTo(itemRefs.current[0], {scale:0.5, opacity:0}, {scale:1, opacity:1, duration: 0.6})

	// },[])



	const renderList = (chars) =>{
		const charList = chars.map((char, i) => {
			const thumbStyle = char.thumbnail.includes('image_not_available') ? {objectFit:'cover', width:'auto'} : null;
			
			return (

					<li
						key={char.id}
						ref={(el) => (itemRefs.current[i] = el)}
						tabIndex ={0}
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
			)
		})

		
		return (
			<ul className="char__grid">
					{charList}
			</ul>
		)
	}


	const elements = useMemo(()=> {
		
		return setContent(process, () => renderList(chars), newCharsLoading)
	}, [process])




	return (
		<div className="char__list">
			<div className='char__block'>
				{elements}
			</div>
				

			<div className="char__buttons" style ={{'display': 'flex' }}>
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




export default CharList;