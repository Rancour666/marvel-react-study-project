import { Component } from 'react';

import './randomChar.scss';
//import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/ErrorMessage';

import MarvelService from "../../services/MarvelService";





class RandomChar extends Component {


	state = {
		char:{},
		loading: true,
		error: false
	}

	marvelService = new MarvelService();

	componentDidMount(){
		this.updateCharacter()
		//this.randomCharTimer = setInterval(this.updateCharacter, 3000)
	}

	componentWillUnmount(){
		//clearInterval(this.randomCharTimer)
	}

	onCharLoaded = (char) => {
		this.setState({
			char: char,
			loading:false
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

	updateCharacter = () => {
		const id = Math.floor(Math.random() * (1011400-1011000) + 1011000);
		this.onCharLoading()
		this.marvelService
			.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError)
		
		this.setState({
			error: false
		})
	}




	render(){
		const {char, loading, error} = this.state

		const spinner = loading ? <Spinner/> : null;
		const errorMessage = error ? <Error/> : null;

		const charContent = !(loading || error) ? <View char={char}/> : null

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
	                <button onClick={this.updateCharacter} className="button button__main">
	                    <div className="inner">try it</div>
	                </button>
	                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
	            </div>
	        </div>
	    )
	}
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