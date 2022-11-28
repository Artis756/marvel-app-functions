import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import { Component, useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";


const App = () => {
	const [charId, setCharId] = useState(null);

	const onCharSelected = (charId) => {
		setCharId(charId)
	}
	return (
		<div className="app">
			<AppHeader />
			<main>
			<ComicsList/>
			</main>
		</div>
	)
}

export default App;