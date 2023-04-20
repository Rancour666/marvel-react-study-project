import {useState} from "react";
import {Helmet} from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearch from "../charSearch/CharSearch";


	const CharactersPage = () => {
		const [selectedChar, setSelectedChar] = useState(null)

		return (
				<>
					<Helmet>
						<meta
							name="description"
							content="Marvel information portal"
						/>
						<title>Marvel information portal</title>
					</Helmet>
					<ErrorBoundary>
						<RandomChar/>
					</ErrorBoundary>
					<div className="char__content">
							<ErrorBoundary>
								<CharList onCharSelected={(id) => setSelectedChar(id)}/>
							</ErrorBoundary>
								<div>
								<ErrorBoundary>
									<CharInfo charId={selectedChar}/>
								</ErrorBoundary>
								<ErrorBoundary>
									<CharSearch />
								</ErrorBoundary>
								</div>
					</div>
					<ErrorBoundary>
						
					</ErrorBoundary>
					<img
						className="bg-decoration"
						src={process.env.PUBLIC_URL + './images/vision.png'}
						alt="vision"/>
				</>
		)
	}

export default CharactersPage;