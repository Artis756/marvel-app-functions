import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../error/Error"

const NotFoundPage = () => {
	const navigate = useNavigate();
	const goBack = () => navigate(-1)
	return (
		<>
			<ErrorMessage />
			<p style={{ textAlign: 'center', fontWeight: '700', fontSize: '30px', margin: '15px 0 0' }}>Page not found</p>
			<button className="button button__main" style={{ margin: '20px auto 0 ', display: 'block' }}
				onClick={goBack}>
				<div className="inner">Go Back</div>
			</button>
		</>
	)
}

export default NotFoundPage;