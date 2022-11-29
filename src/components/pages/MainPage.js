import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const MainPage = () => {
	const [charId, setCharId] = useState(null);

	const onCharSelected = (charId) => {
		setCharId(charId)
	}

	return (
		<>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected} />
				</ErrorBoundary>
				<ErrorBoundary>
					<CharInfo charId={charId} />
				</ErrorBoundary>
			</div>
			<img src={decoration} alt="vision" className="bg-decoration" />
		</>
	)
}

export default MainPage;