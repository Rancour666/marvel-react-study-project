import { lazy, Suspense,createRef} from "react";
import { BrowserRouter as Router, Route, Routes,createBrowserRouter,RouterProvider,NavLink,useLocation,useOutlet } from "react-router-dom";
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import './app.scss';

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

//import {CharactersPage, ComicsPage,Page404, SingleComicPage} from "../pages";
//import Page404 from "../pages";

const Page404 = lazy(() => import("../pages/404"))
const CharactersPage = lazy(() => import("../pages/CharactersPage"))
const ComicsPage = lazy(() => import("../pages/ComicsPage"))
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"))
const SingleCharacterPage = lazy(() => import("../pages/SingleCharacterPage"))
const SinglePage = lazy(() => import("../pages/SinglePage"))

//import decoration from '../../resources/img/vision.png';

const routes = [
	{ path: '/characters', name: 'Characters', element: <CharactersPage />, nodeRef: createRef()},
	{ path: '/comics', name: 'Comics', element: <ComicsPage />, nodeRef: createRef()},
	{ path: '/comics/:id', name: 'SingleComic', element: <SinglePage Component = {SingleComicPage} dataType = "comic"/>, nodeRef: createRef()},
	{ path: '/characters/:id', name: 'SingleCharacter', element: <SinglePage Component = {SingleCharacterPage} dataType = "character"/>, nodeRef: createRef()},
	{ path: '*', name: '404', element: <Page404 />, nodeRef: createRef()},
]

const router = createBrowserRouter([
	{
	  path: '/',
	  element: <Example />,
	  children: routes.map((route) => ({
		 index: route.path === '/',
		 path: route.path === '/' ? undefined : route.path,
		 element: route.element,
	  })),
	},
 ])


function Example() {
	const location = useLocation()
	const currentOutlet = useOutlet()
	const { nodeRef } =
		routes.find((route) => route.path === location.pathname) ?? {}
	return (
		<div className="app">
			<AppHeader/>
				<Suspense fallback={<div><Spinner/></div>}>
					<SwitchTransition>
						<CSSTransition
							key={location.pathname}
							nodeRef={nodeRef}
							timeout={300}
							classNames="page"
							unmountOnExit
						>
							{(state) => (
								<main ref={nodeRef} className="page">
									{currentOutlet}
								</main>
							)}
						</CSSTransition>
					</SwitchTransition>
				</Suspense>
			
		</div>
	)
}



const App = () => {

	return (
		<RouterProvider router={router} />
		// <Router>
		// 	<div className="app">
		// 		<AppHeader/>
		// 		<main>
		// 			<Suspense fallback={<div><Spinner/></div>}>
		// 				<Routes>
		// 					<Route path='/' element={<CharactersPage/>}/>
		// 					<Route path='/comics' element={<ComicsPage/>}/>
		// 					<Route path='/comics/:comicId' element={<SingleComicPage/>}/>
		// 					<Route path='*' element={<Page404/>}/>
		// 				</Routes>
		// 			</Suspense>
		// 		</main>
		// 	</div>
		// </Router>
	)


}



export default App;