import AppHeader from "../appHeader/AppHeader";

import { ComicsPage, MainPage, NotFoundPage, SingleComicPage } from '../pages'
import { Routes, Route } from "react-router-dom";

const App = () => {

	return (
		<div className="app">
			<AppHeader />
			<main>
				<Routes>
					<Route path={'/'} element={<MainPage />} />
					<Route path={'/comics'} element={<ComicsPage />} />
					<Route path={'/comics/:id'} element={<SingleComicPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</main>
		</div>
	)
}

export default App;