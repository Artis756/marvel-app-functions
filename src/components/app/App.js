import AppHeader from "../appHeader/AppHeader";

import { ComicsPage, MainPage } from '../pages'
import { Routes, Route } from "react-router-dom";

const App = () => {

	return (
		<div className="app">
			<AppHeader />
			<main>
				<Routes>
					<Route path={'/'} element={<MainPage />} />
					<Route path={'/comics'} element={<ComicsPage />} />
				</Routes>
			</main>
		</div>
	)
}

export default App;