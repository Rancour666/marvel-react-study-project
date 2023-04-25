import './appHeader.scss';
import '../../style/variables.scss';
import { Link, NavLink } from 'react-router-dom';

const AppHeader = (props) => {
	return (
		<header className="app__header">
			<h1 className="app__title">
				<Link to="/characters">
					<span>Marvel</span> information portal
				</Link>
			</h1>
			<nav className="app__menu">
				<ul>
					<NavLink
						style={({ isActive }) => ({
							color: isActive ? '#9F0013' : 'inherit',
						})}
						to="/characters"
					>
						<span>Characters</span>
					</NavLink>
					/
					<NavLink
						style={({ isActive }) => ({
							color: isActive ? '#9F0013' : 'inherit',
						})}
						to="/comics"
					>
						<span>Comics</span>
					</NavLink>
				</ul>
			</nav>
		</header>
	);
};

export default AppHeader;
