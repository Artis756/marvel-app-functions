import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
class CharList extends Component {
	state = {
		chars: [],
		loading: true,
		error: false,
		newItemsLoading: false,
		offset: 150,
		charsEnded: false
	}
	marvelService = new MarvelService();

	onLoaded = (newChars) => {
		let ended = false;
		if (newChars.length < 9) ended = true;

		this.setState(({ chars, offset }) => {
			return {
				chars: [...chars, ...newChars],
				loading: false,
				newItemsLoading: false,
				offset: offset + 9,
				charsEnded: ended
			}
		});

	}

	onError = () => {
		this.setState({ loading: false, error: true })
	}

	onLoading = () => {
		this.setState({ error: false, newItemsLoading: true })
	}

	updateData = (offset) => {
		this.onLoading();

		this.marvelService
			.getAllCharacters(offset)
			.then(this.onLoaded)
			.catch(this.onError)
	}

	componentDidMount() {
		this.updateData()
	}

	render() {
		const { loading, error, chars, newItemsLoading, offset, charsEnded } = this.state;
		const { onCharSelected } = this.props;
		const items = chars.map(({ thumbnail, name, id }) => <View thumbnail={thumbnail} name={name} key={id} onCharSelected={() => onCharSelected(id)} />);
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
					onClick={() => this.updateData(offset)}
					disabled={newItemsLoading}
					style={{ display: charsEnded ? 'none' : 'block' }}>
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

const View = ({ thumbnail, name, onCharSelected }) => {
	const objectFit = thumbnail.indexOf('image_not_available') !== -1 ? 'fill' : '';
	return (
		<li className="char__item"
			onClick={onCharSelected}>
			<img src={thumbnail} alt="abyss" style={{ objectFit }} />
			<div className="char__name">{name}</div>
		</li>
	)
}

export default CharList;