import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";


import useMarvelService from '../../services/MarvelService';
//import Spinner from '../spinner/Spinner';
//import Error from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

import setContent from '../../utils/SetContent';


const SinglePage = ({Component, dataType}) => {

	const {id} = useParams();
	const [data, setData] = useState(null);

	const {loading, error, getCharacter, getComic, clearError, process, setProcess} = useMarvelService();

	useEffect(()=>{

		updateData();
	}, [id])

	const onDataLoaded = (data) => {
		setData(data);
	}


	const updateData = () => {
		clearError();

		switch (dataType) {
			case 'comic':
				getComic(id)
					.then(onDataLoaded)
					.then(()=> setProcess('confirmed'));
				break;

			case 'character':
				getCharacter(id)
					.then(onDataLoaded)
					.then(()=> setProcess('confirmed'));
			break;
			default:
				return;
		}
	}



	//const spinner = loading ? <Spinner/> : null;
	//const errorMessage = error ? <Error/> : null;
	//const content = !(loading || error || !data) ? <Component data={data}/> : null;


	return (
		<>
			<AppBanner/>
			{/* {spinner}
			{errorMessage}
			{content} */}

			{setContent(process, Component, data)}

		</>
		
	)

}

export default SinglePage;