import {useState} from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";


	const CharactersPage = () => {
		const [selectedChar, setSelectedChar] = useState(null)

		return (
				<>
					<ErrorBoundary>
						<RandomChar/>
					</ErrorBoundary>
					<div className="char__content">
							<ErrorBoundary>
								<CharList onCharSelected={(id) => setSelectedChar(id)}/>
							</ErrorBoundary>
							<ErrorBoundary>
								<CharInfo charId={selectedChar}/>
							</ErrorBoundary>
					</div>
					<img
						className="bg-decoration"
						src={process.env.PUBLIC_URL + './images/vision.png'}
						alt="vision"/>
				</>
		)
	}

export default CharactersPage;