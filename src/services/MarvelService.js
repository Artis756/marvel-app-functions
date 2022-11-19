export default class MarvelService {
	_apiKey = 'apikey=70188d3e9736e22562d84fdd1a130aeb';
	_apiBase = 'https://gateway.marvel.com:443/v1/public/'
	getData = async (url) => {
		let response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Could not fetch ${url}, status: ${response.status}`)
		}

		return await response.json()
	}
	getAllCharacters = async () => {
		const response = await this.getData(`${this._apiBase}characters?limit=9&offset=150&${this._apiKey}`)
		return response.map(this._transformCharacter)
	}

	getCharacter = async (id) => {
		const response = await this.getData(`${this._apiBase}characters/${id}?${this._apiKey}`)
		return this._transformCharacter(response.data.results[0])
	}

	_transformCharacter = (response) => {
		const { id, name, description, thumbnail: { path, extension }, urls } = response
		return {
			id,
			name,
			description: !description ? 'There is no description' : description.length > 210 ? description.slice(0, 220) + '...' : description,
			thumbnail: `${path}.${extension}`,
			homepage: urls[0].url,
			wiki: urls[1].url
		}
	}
}