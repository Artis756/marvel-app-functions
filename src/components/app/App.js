import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import { Component } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

class App extends Component {
	state = {
		charId: null
	}

	onCharSelected = (charId) => {
		this.setState({ charId })
	}

	render() {
		const { charId } = this.state;
		return (
			<div className="app">
				<AppHeader />
				<main>
					<ErrorBoundary>
						<RandomChar />
					</ErrorBoundary>
					<div className="char__content">
						<ErrorBoundary>
							<CharList onCharSelected={this.onCharSelected} />
						</ErrorBoundary>
						<ErrorBoundary>
							<CharInfo charId={charId} />
						</ErrorBoundary>
					</div>
					<img className="bg-decoration" src={decoration} alt="vision" />
				</main>
			</div>
		)
	}
}

export default App;