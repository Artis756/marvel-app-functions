import errorImg from './error.gif'

const ErrorMessage = () => {
	return (
		<img src={errorImg} style={{ margin: '0 auto', width: '200px', display: 'block' }} alt='Error' />
	)
}
export default ErrorMessage