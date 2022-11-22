import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';

class RandomChar extends Component {
	state = {
		char: {},
		loading: true,
		error: false
	}

	marvelService = new MarvelService();

	onLoaded = (char) => {
		this.setState({ char, loading: false });
	}

	onError = () => {
		this.setState({ loading: false, error: true })
	}

	onLoading = () => {
		this.setState({ loading: true, error: false })
	}

	updateData = () => {
		this.onLoading()
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.marvelService
			.getCharacter(id)
			.then(this.onLoaded)
			.catch(this.onError)
	}

	componentDidMount() {
		this.updateData()
	}

	render() {
		const { char, loading, error } = this.state;
		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const content = !(spinner || errorMessage) ? <View char={char} /> : null;
		return (
			<div className="randomchar">
				{spinner}
				{content}
				{errorMessage}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button className="button button__main"
						onClick={this.updateData}>
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		)
	}
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