import { useEffect } from 'react';
import useApiCall from '../api/useApiCall';

export default function Test(){

	const { apiCallStart, apiCallEnd } = useApiCall();

	useEffect(() => {
		
		apiCallStart();
		setTimeout(()=>{apiCallEnd();}, 2 * 1000);

	}, []);

	return(
		<>
			<h1>Hola!</h1>
		</>
	);

}