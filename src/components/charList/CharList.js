import { Component } from 'react';
import PropTypes  from 'prop-types';

import MarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/ErrorMessage';

import './charList.scss';
//import abyss from '../../resources/img/abyss.jpg';






class CharList extends Component {
	state = {
		chars:[],
		loading: true,
		error: false,
		offset:220,
		newCharsLoading: false,
		charEnded: false
	}



	marvelService = new MarvelService();

	componentDidMount(){
		this.onRequest()
	}



	onRequest = (offset) => {
		this.onNewCharListLoading()
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}

	onCharListLoaded = (newCharList) => {

		this.setState(({chars, offset}) => ({
			chars:[...chars, ...newCharList],
			loading:false,
			newCharsLoading:false,
			offset: offset + 9,
			charEnded: newCharList.length < 9 ? true : false
		}))
	}

	onNewCharListLoading = () => {
		this.setState({
			newCharsLoading:true
		})
	}

	onCharLoading = () => {
		this.setState({
			loading:true
		})
	}
	onError = () => {
		this.setState({
			loading:false,
			error: true
		})
	}



	

	//setItemRef = (elem) => {
	//	this.itemRefs = elem 
	//}
//
	//onFocus = (e)=>{
//
	//	document.querySelectorAll('.char__item').forEach(item => item.classList.remove('char__item_selected'))
	//	e.currentTarget.classList.add('char__item_selected');
	//	e.currentTarget.focus();
	//}


	renderList(chars){

		const charList = chars.map((char) => {
			const thumbStyle = char.thumbnail.includes('image_not_available') ? {objectFit:'contain'} : null;

			return (
				<li
					onFocus={(e) => {
						this.props.onCharSelected(char.id);
						//this.onFocus(e)
					}}
					ref={this.setItemRef}
					key={char.id}
					tabIndex ={0}
					onKeyDown={(e) => {
						
						if (e.key === ' ' || e.key === "Enter") {
							if(e.key === ' '){
								e.preventDefault();
							}
							this.props.onCharSelected(char.id);
							//this.onFocus(e)
						}
					}}
					className="char__item">
					<img style={thumbStyle} src={char.thumbnail} alt="abyss"/>
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


	render(){
		const {chars, loading, error, offset, newCharsLoading, charEnded} = this.state

		
		const charList = this.renderList(chars)

		const spinner = loading ? <Spinner/> : null;
		const errorMessage = error ? <Error/> : null;

		const charListContent = !(loading || error) ? charList : null

		

		
		return (
			<div className="char__list">
				{spinner}
				{errorMessage}
				{charListContent}
				 <button style ={{'display': charEnded ? 'none' : 'block' }} disabled={newCharsLoading} onClick={() => this.onRequest(offset)} className="button button__main button__long">
					  <div className="inner">load more</div>
				 </button>
			</div>
		)
	}

}

CharList.propTypes ={
	onCharSelected: PropTypes.func.isRequired
}




export default CharList;