import {useState} from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
//import Error from '../errorMessage/ErrorMessage';

import './charSearch.scss';


const CharSearch = (props) => {

	const [char, setChar] = useState(null);

	const {loading, getCharacterByName, clearError} = useMarvelService();


	const onCharLoaded = (char) => {
		setChar(char);
	}

	const updateCharacterByName = (name) => {
		clearError();
		getCharacterByName(name)
			.then(onCharLoaded);

	}

	const { register, handleSubmit, formState: { errors } } = useForm();


	const results = !char ? null : char.length > 0 ? 
							<div className="char__search-wrapper">
								<div className="char__search-success">There is! Visit <span className="char__search-error">{char[0].name}</span> page?</div>
								<Link to={`/characters/${char[0].id}`} className="button button__secondary">
									<div className="inner">To page</div>
								</Link>
							</div> : 
							<div className="char__search-error">
								The character was not found. Check the name and try again
							</div>




	return(
		<div className="char__search-form">
				<form onSubmit={handleSubmit(({charName}) => updateCharacterByName(charName))}>
					<label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
					<div className="char__search-wrapper">
						<input 
							{...register("charName", { required: "This field is required!", minLength: {value:2, message:'Minimum 2 simbols' }})}
							id="charName" 
							name='charName' 
							type='text' 
							placeholder="Enter name"/>
						<button 
							type='submit' 
							className="button button__main"
							disabled={loading}
							>
							<div className="inner">find</div>
							</button>
					</div>
				</form>
			{results}
			<div className="char__search-critical-error">{errors.charName?.message}</div>
		</div>
	)

}

export default CharSearch;