import useHttp from '../hooks/http.hook';

const useMarvelService = () => {
	const { loading, error, request } = useHttp();

	const _apiKey = 'apikey=70188d3e9736e22562d84fdd1a130aeb';
	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _baseOffset = 150;

	const getAllCharacters = async (offset = _baseOffset) => {
		const response = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
		return response.data.results.map(_transformCharacter)
	}

	const getCharacter = async (id) => {
		const response = await request(`${_apiBase}characters/${id}?${_apiKey}`)
		return _transformCharacter(response.data.results[0])
	}

	const getComic = async (id) => {
		const response = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComic(response.data.results[0]);
	}

	const getComics = async (comicsOffset) => {
		const response = await request(`${_apiBase}comics?limit=8&offset=${comicsOffset}&${_apiKey}`);
		return response.data.results.map(_transformComic);
	}

	const _transformCharacter = (response) => {
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

	const _transformComic = ({ id, title, prices, thumbnail: { path, extension }, description, pageCount, textObjects }) => {
		return {
			id,
			title,
			description: description?.length ? description : 'There is no description',
			pageCount: pageCount ? pageCount + ' pages' : 'There is no information about the number of pages',
			price: prices[0].price === 0 ? 'not available' : prices[0].price + '$',
			thumbnail: `${path}.${extension}`,
			language: textObjects[0]?.language
		}
	}

	return { loading, error, getAllCharacters, getCharacter, getComics, getComic }
}

export default useMarvelService