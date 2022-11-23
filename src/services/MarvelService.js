export default class MarvelService {
	_apiKey = 'apikey=70188d3e9736e22562d84fdd1a130aeb';
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_baseOffset = 150;
	getData = async (url) => {
		let response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Could not fetch ${url}, status: ${response.status}`)
		}

		return await response.json()
	}
	getAllCharacters = async (offset = this._baseOffset) => {
		const response = await this.getData(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
		return response.data.results.map(this._transformCharacter)
	}

	getCharacter = async (id) => {
		const response = await this.getData(`${this._apiBase}characters/${id}?${this._apiKey}`)
		return this._transformCharacter(response.data.results[0])
	}

	_transformCharacter = (response) => {
		const { id, name, description, thumbnail: { path, extension }, urls, comics: { items } } = response
		return {
			id,
			name,
			description: !description ? 'There is no description' : description.length > 210 ? description.slice(0, 220) + '...' : description,
			thumbnail: `${path}.${extension}`,
			homepage: urls[0].url,
			wiki: urls[1].url,
			comics: items.length > 9 ? items.slice(0, 9) : items.length === 0 ? ['There are no comics'] : items
		}
	}
}