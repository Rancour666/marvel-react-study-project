import useHttp from "../hooks/http.hook";




const useMarvelService = () => {
	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=dc43332e01ba7f440a672d07b8902bde';//apikey=c5d6fc8b83116d92ed468ce36bac6c62
	const charLimit = 'limit=9&';
	const comicsesLimit = 'limit=8&';

	const _baseOffset = 0;

	const {loading, error, request, clearError} = useHttp();



	const getAllCharacters = async (offset= _baseOffset) => {
		const res = await request(`${_apiBase}characters?${charLimit}offset=${offset}&${_apiKey}`)
		return res.data.results.map(char => _transformCharacter(char))
	}

	

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
		return _transformCharacter(res.data.results[0])
	}

	const getAllComicses = async (offset= _baseOffset) => {
		const res = await request(`${_apiBase}comics?${comicsesLimit}offset=${offset}&${_apiKey}`)
		return res.data.results.map(comics => _transformComics(comics))
	}

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
		return _transformComics(res.data.results[0])
	}




	const _transformCharacter = (char) => {
		
		return {
			name:char.name,
			description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
			thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage:char.urls[0].url,
			wiki:char.urls[1].url,
			id: char.id,
			comicses: char.comics.items
		}
	}

	const _transformComics = (comics) => {
		return {
			name:comics.title,
			thumbnail:comics.thumbnail.path + '.' + comics.thumbnail.extension,
			id: comics.id,
			price:comics.prices[0].price,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			language: comics.textObjects[0]?.language || "en-us",
		}
	}

	return {loading, error, request, clearError, getAllCharacters, getCharacter, getAllComicses, getComic}

}

export default useMarvelService;