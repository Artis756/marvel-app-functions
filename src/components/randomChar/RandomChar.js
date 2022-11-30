import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
import { Transition } from 'react-transition-group';

const RandomChar = () => {
	const [char, setChar] = useState(null);
	const { loading, error, getCharacter } = useMarvelService();

	const updateData = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

		getCharacter(id)
			.then(setChar)
	}

	useEffect(() => {
		updateData();
	}, [])

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
	const content = !(spinner || errorMessage || !char) ? <View char={char} /> : null;

	return (
		<div className="randomchar">
			<Transition in={!loading} timeout={duration}>
				{state => (
					<div style={{
						...defaultStyle,
						...transitionStyles[state]
					}}>
						{content}
						{errorMessage}
						{spinner}
					</div>
				)}
			</Transition>
			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!<br />
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">
					Or choose another one
				</p>
				<button className="button button__main"
					onClick={updateData}>
					<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
			</div>
		</div>
	)
}

const View = ({ char: { name, description, homepage, wiki, thumbnail } }) => {
	const objectFit = thumbnail.indexOf('image_not_available') !== -1 ? 'fill' : '';

	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img" style={{ objectFit }} />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{description}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} target='_blank' rel="noreferrer" className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} target='_blank' rel="noreferrer" className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar;