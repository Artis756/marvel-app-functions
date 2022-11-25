import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
import PropTypes from 'prop-types'

class CharList extends Component {
	state = {
		chars: [],
		loading: true,
		error: false,
		newItemsLoading: false,
		offset: 150,
		charsEnded: false
	}

	itemsRefs = [];
	marvelService = new MarvelService();

	setRef = elem => {
		this.itemsRefs.push(elem)
	}

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

	changeFocus = (id) => {
		this.itemsRefs.forEach(item => item.classList.remove('char__item_selected'))
		this.itemsRefs[id].classList.add('char__item_selected')
	}

	componentDidMount() {
		this.updateData();
		console.log(this.itemsRefs);
	}

	componentWillUnmount() {
		this.prevRef = null;
		this.currentRef = null;
	}

	renderItems = chars => {
		const { onCharSelected } = this.props;
		const items = chars.map(({ thumbnail, name, id }, index) => {
			const handleEvent = (e, id, index) => {
				if (e.code === 'Space' || e.code === 'Enter') {
					e.preventDefault();
					onCharSelected(id)
					this.changeFocus(index)
				}
			}

			const objectFit = thumbnail.indexOf('image_not_available') !== -1 ? 'fill' : '';
			return (
				<li className="char__item"
					onClick={() => {
						onCharSelected(id)
						this.changeFocus(index)
					}}
					onKeyDown={(e) => handleEvent(e, id, index)}
					tabIndex='0'
					ref={this.setRef}
					key={id}>
					<img src={thumbnail} alt="abyss" style={{ objectFit }} />
					<div className="char__name">{name}</div>
				</li>
			)
		})
		return items;
	}

	render() {
		const { loading, error, chars, newItemsLoading, offset, charsEnded } = this.state;
		const { onCharSelected } = this.props;

		const items = this.renderItems(chars)
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

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
}

export default CharList;