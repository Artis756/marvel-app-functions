import './charList.scss';
import { useEffect, useRef, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
import PropTypes from 'prop-types'

const CharList = ({ onCharSelected }) => {
	const [chars, setChars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(150);
	const [charsEnded, setCharsEnded] = useState(false);

	const itemsRefs = useRef([]);
	const marvelService = new MarvelService();

	const onLoaded = (newChars) => {
		let ended = false;
		if (newChars.length < 9) ended = true;

		setChars(chars => [...chars, ...newChars]);
		setLoading(false);
		setNewItemsLoading(false);
		setOffset(offset => offset + 9);
		setCharsEnded(ended);
	}

	const onError = () => {
		setLoading(false);
		setError(true);
	}

	const onLoading = () => {
		setLoading(false)
		setNewItemsLoading(true)
	}

	const updateData = (offset) => {
		onLoading();

		marvelService
			.getAllCharacters(offset)
			.then(onLoaded)
			.catch(onError)
	}

	const changeFocus = (id) => {
		itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'))
		itemsRefs.current[id].classList.add('char__item_selected')
	}

	useEffect(() => {
		updateData();
	}, [])

	const renderItems = chars => {
		const items = chars.map(({ thumbnail, name, id }, index) => {
			const handleEvent = (e, id, index) => {
				if (e.code === 'Space' || e.code === 'Enter') {
					e.preventDefault();
					onCharSelected(id)
					changeFocus(index)
				}
			}

			const objectFit = thumbnail.indexOf('image_not_available') !== -1 ? 'fill' : '';
			return (
				<li className="char__item"
					onClick={() => {
						onCharSelected(id)
						changeFocus(index)
					}}
					onKeyDown={(e) => handleEvent(e, id, index)}
					tabIndex='0'
					ref={elem=>itemsRefs.current[index] = elem}
					key={id}>
					<img src={thumbnail} alt="abyss" style={{ objectFit }} />
					<div className="char__name">{name}</div>
				</li>
			)
		})
		return items;
	}

	const items = renderItems(chars)
	const spinner = loading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const content = !(spinner || errorMessage) ? items : null;
	return (
		<div className="char__list" >
			{spinner}
			{errorMessage}
			<ul className="char__grid">
				{content}
			</ul>
			<button className="button button__main button__long"
				onClick={() => updateData(offset)}
				disabled={newItemsLoading}
				style={{ display: charsEnded ? 'none' : 'block' }}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
}

export default CharList;