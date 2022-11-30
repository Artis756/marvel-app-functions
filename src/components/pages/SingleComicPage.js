import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
import { Transition } from 'react-transition-group';
const SingleComicPage = () => {
	const [comic, setComic] = useState(null);
	const { getComic, loading, error } = useMarvelService();
	const { id } = useParams();

	useEffect(() => {
		getComic(id)
			.then(setComic)
	}, []);

	const duration = 300;

	const defaultStyle = {
		transition: `opacity ${duration}ms linear`,
		opacity: 0,
	}

	const transitionStyles = {
		entering: { opacity: 1 },
		entered: { opacity: 1 },
		exiting: { opacity: 0 },
		exited: { opacity: 0 },
	};

	const spinner = loading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const content = !(spinner || errorMessage || !comic) ? <View {...comic} /> : null;

	return (
		<>
			{spinner}
			{errorMessage}

			<Transition in={!loading} timeout={duration}>
				{state => (
					<div style={{
						...defaultStyle,
						...transitionStyles[state]
					}}>
						{content}
					</div>
				)}
			</Transition>
		</>
	)
}

const View = ({ thumbnail, title, description, pageCount, language, price }) => {
	return (
		<div className="single-comic">
			<img src={thumbnail} alt="x-men" className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}</div>
			</div>
			<Link to='/comics' className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleComicPage;