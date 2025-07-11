import { Box, CircularProgress, Typography } from "@mui/material";
import useAdmins from "@/api/useAdmins";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoadAdmin() {

	const { loadDefaultAdmins } = useAdmins();
	const navigate = useNavigate();

	async function loadAdmins(){

		await loadDefaultAdmins();
		navigate('/home');

	}

	useEffect(() => {
		loadAdmins();
	}, []);

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100vh"
			bgcolor="#f5f5f5"
		>
			<CircularProgress color="primary" />
			<Typography variant="h6" mt={2} color="textSecondary">
				...Cargando administrador...
			</Typography>
		</Box>
	);
}
