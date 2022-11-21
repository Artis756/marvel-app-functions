import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
class CharList extends Component {
	state = {
		chars: [],
		loading: true,
		error: false
	}

	marvelService = new MarvelService();

	onLoaded = (newChars) => {
		this.setState(({ chars }) => {
			return {
				chars: [...chars, ...newChars],
				loading: false
			}
		});
	}

	onError = () => {
		this.setState({ loading: false, error: true })
	}

	onLoading = () => {
		this.setState({ loading: true, error: false })
	}

	updateData = () => {
		this.onLoading()
		this.marvelService
			.getAllCharacters()
			.then(this.onLoaded)
			.catch(this.onError)
	}

	componentDidMount() {
		this.updateData()
	}


	render() {
		const { loading, error, chars } = this.state;
		const items = chars.map(({ thumbnail, name, id }) => <View thumbnail={thumbnail} name={name} key={id} />);
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
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}

}

const View = ({ thumbnail, name }) => {
	const objectFit = thumbnail.indexOf('image_not_available') !== -1 ? 'fill' : '';
	return (
		<li className="char__item">
			<img src={thumbnail} alt="abyss" style={{objectFit}} />
			<div className="char__name">{name}</div>
		</li>
	)
}

export default CharList;