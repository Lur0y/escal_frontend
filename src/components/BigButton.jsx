import { Button, Grid, Typography } from "@mui/material";

export default function BigButton({onClick, icon, label}){

	return(
		<Grid container justifyContent="center">
			<Button
				variant="outlined"
				onClick={onClick}
				sx={{
					width: 180,
					height: 180,
					borderRadius: 3,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					textTransform: "none",
					fontSize: 18,
					fontWeight: "bold",
				}}
			>
				{icon}
				<Typography>{label}</Typography>
			</Button>
		</Grid>
	);

}