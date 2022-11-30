import './charList.scss';
import { useEffect, useRef, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
import PropTypes from 'prop-types'
import {
	CSSTransition,
	TransitionGroup,
} from 'react-transition-group';


const CharList = ({ onCharSelected }) => {
	const [chars, setChars] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(150);
	const [charsEnded, setCharsEnded] = useState(false);

	const itemsRefs = useRef([]);
	const { loading, error, getAllCharacters } = useMarvelService();

	const onLoaded = (newChars) => {
		let ended = false;
		if (newChars.length < 9) ended = true;

		setChars(chars => [...chars, ...newChars]);
		setNewItemsLoading(false);
		setOffset(offset => offset + 9);
		setCharsEnded(ended);
	}

	const updateData = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true)

		getAllCharacters(offset)
			.then(onLoaded)
	}

	const changeFocus = (id) => {
		itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'))
		itemsRefs.current[id].classList.add('char__item_selected')
	}

	useEffect(() => {
		updateData(offset, true);
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
				<CSSTransition
					timeout={500}
					key={id}
					classNames='item'>
					<li className="char__item"
						onClick={() => {
							onCharSelected(id)
							changeFocus(index)
						}}
						onKeyDown={(e) => handleEvent(e, id, index)}
						tabIndex='0'
						ref={elem => itemsRefs.current[index] = elem}
					>
						<img src={thumbnail} alt="abyss" style={{ objectFit }} />
						<div className="char__name">{name}</div>
					</li>
				</CSSTransition>
			)
		})
		return items;
	}

	const items = renderItems(chars)
	const spinner = loading && !newItemsLoading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const content = !(spinner || errorMessage) ? items : null;
	return (
		<div className="char__list" >
			{spinner}
			{errorMessage}
			<TransitionGroup className="char__grid">
				{content}
			</TransitionGroup>
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