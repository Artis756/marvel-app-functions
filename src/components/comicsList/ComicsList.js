import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';

const ComicsList = () => {
	const { getComics, loading, error } = useMarvelService();
	const [comics, setComics] = useState([]);
	const [offset, setOffset] = useState(0);
	const [newItemsLoading, setNewItemsLoading] = useState(false);

	const onLoaded = (newComics) => {
		setOffset(offset => offset + 8);
		setComics(comics => [...comics, ...newComics])
		setNewItemsLoading(false);
	}

	const updateComics = (initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true)

		getComics(offset)
			.then(onLoaded)
	}

	useEffect(() => {
		updateComics(true)
	}, [])

	const items = comics.map((comic, index) => <View {...comic} key={index} />)

	const spinner = loading && !newItemsLoading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;

	return (
		<div className="comics__list">
			<ul className="comics__grid">
				{spinner}
				{errorMessage}
				{items}
			</ul>
			<button className="button button__main button__long"
				onClick={() => updateComics()}
				disabled={newItemsLoading}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

const View = ({ thumbnail, title, price }) => {
	return (
		<li className="comics__item">
			<a href="#">
				<img src={thumbnail} alt="x-men" className="comics__item-img" />
				<div className="comics__item-name">{title}</div>
				<div className="comics__item-price">{price}</div>
			</a>
		</li>
	);
}

export default ComicsList;