import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
import Skeleton from '../skeleton/Skeleton';
class CharInfo extends Component {
	state = {
		char: null,
		loading: false,
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
		const { charId } = this.props;
		if (!charId) return;

		this.onLoading();
		this.marvelService
			.getCharacter(charId)
			.then(this.onLoaded)
			.catch(this.onError)
	}

	componentDidMount() {
		this.updateData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.charId !== this.props.charId) {
			this.updateData()
		}
	}

	render() {
		const { loading, error, char } = this.state;
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
}

const View = ({ char: { thumbnail, name, homepage, wiki, description, comics } }) => {
	const items = comics.map(({ name, resourceURI }) => {
		return (
			<li className="char__comics-item" key={name}>
				<a href={resourceURI}>{name}</a>
			</li>
		)
	})
	const objectFit = thumbnail.indexOf('image_not_available') !== -1 ? 'fill' : '';
	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={`${name}`} style={{objectFit}}/>
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

export default CharInfo;