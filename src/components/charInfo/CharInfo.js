import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
import Skeleton from '../skeleton/Skeleton';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const CharInfo = ({ charId }) => {
	const [char, setChar] = useState(null);
	const { loading, error, getCharacter } = useMarvelService();
	const updateData = () => {
		if (!charId) return;

		getCharacter(charId)
			.then(d => setChar(d))
	}

	useEffect(() => {
		updateData();
	}, [charId])

	const spinner = loading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const skeleton = !(error || loading || char) ? <Skeleton /> : null;
	const content = !(spinner || errorMessage || !char) ? <View char={char} /> : null;

	return (
		<div className="char__info" >
			{spinner}
			{errorMessage}
			{skeleton}
			{content}
		</div>
	)
}

const View = ({ char: { thumbnail, name, homepage, wiki, description, comics } }) => {
	const items = comics.map(({ name, resourceURI }) => {
		const id = resourceURI.split('/').pop();

		if (!name) return 'There are no comics';
		return (
			<li className="char__comics-item" key={name}>
				<Link to={`/comics/${id}`} href={resourceURI}>{name}</Link>
			</li>
		)
	})
	const objectFit = thumbnail.indexOf('image_not_available') !== -1 ? 'fill' : '';
	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={`${name}`} style={{ objectFit }} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{items}
			</ul>
		</>
	)
}

CharInfo.propTypes = {
	charId: PropTypes.number
}

export default CharInfo;