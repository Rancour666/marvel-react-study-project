import {Helmet} from "react-helmet";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

	const ComicsPage = () => {
		return (
			<>
				<Helmet>
					<meta
						name="description"
						content="Page with list of our Marvel comics"
					/>
					<title>Comics Page</title>
				</Helmet>
				<AppBanner/>
				<ComicsList/>
			</>
		)
	}

export default ComicsPage;