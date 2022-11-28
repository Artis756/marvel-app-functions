import { useCallback, useState } from "react";

const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const request = useCallback(async (url, headers = { 'Content-Type': 'application/json' }, method = 'GET', body = null) => {
		setError(false);
		setLoading(true);

		try {
			const response = await fetch(url, { method, headers, body })
			if (!response.ok) {
				throw new Error(`Could not fetch ${url}, status: ${response.status}`)
			}

			const data = await response.json()

			setLoading(false)
			return data;

		} catch (error) {
			setLoading(false);
			setError(true);
			throw error;
		}

	}, [])

	return { loading, error, request };
}

export default useHttp;