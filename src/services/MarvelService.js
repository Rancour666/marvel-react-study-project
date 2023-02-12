class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=dc43332e01ba7f440a672d07b8902bde';
	charLimit = 'limit=9&';
	_baseOffset = 210;

	getResource = async(url) => {
		let res = await fetch(url);

		if (!res.ok){
			throw new Error (`Could not fetch ${url}, status: ${res.status}`)
		}

		return await res.json();
	} 

	getAllCharacters = async (offset= this._baseOffset) => {
		const res = await this.getResource(`${this._apiBase}characters?${this.charLimit}offset=${offset}&${this._apiKey}`)
		return res.data.results.map(char => this._transformCharacter(char))
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
		return this._transformCharacter(res.data.results[0])
	}

	//getCharacterComicses = async (id) => {
	//	const res = await this.getResource(`${this._apiBase}characters/${id}/comics?${this._apiKey}`)
	//	return res.data.results.map(comics => this._transformComics(comics))
	//}

	_transformCharacter = (char) => {
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

	//_transformComics = (comics) => {
	//	return {
	//		title: comics.title,
	//		id: comics.id
	//	}
	//}


}

export default MarvelService;