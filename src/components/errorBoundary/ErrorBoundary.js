import { Component } from "react";
import ErrorMessage from "../error/Error";

export default class ErrorBoundary extends Component {
	state = {
		error: false
	}

	componentDidCatch(error) {
		this.setState({ error: true })
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />
		}
		return this.props.children
	}
}