import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

//import {CharactersPage, ComicsPage,Page404, SingleComicPage} from "../pages";
//import Page404 from "../pages";

const Page404 = lazy(() => import("../pages/404"))
const CharactersPage = lazy(() => import("../pages/CharactersPage"))
const ComicsPage = lazy(() => import("../pages/ComicsPage"))
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"))
//import decoration from '../../resources/img/vision.png';


const App = () => {

	return (
		<Router>
			<div className="app">
				<AppHeader/>
				<main>
					<Suspense fallback={<div><Spinner/></div>}>
						<Routes>
							<Route path='/' element={<CharactersPage/>}/>
							<Route path='/comics' element={<ComicsPage/>}/>
							<Route path='/comics/:comicId' element={<SingleComicPage/>}/>
							<Route path='*' element={<Page404/>}/>
						</Routes>
					</Suspense>

				</main>
			</div>
		</Router>

	)


}

export default App;