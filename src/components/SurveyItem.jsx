import { Box, TextField, Autocomplete, Typography } from "@mui/material";

export default function SurveyItem({ questionText, questionId, value, updateAnswerValue }) {

	const ratingOptions = [
		{ label: "Insuficiente", value: 4 },
		{ label: "Suficiente", value: 6 },
		{ label: "Bueno", value: 8 },
		{ label: "Excelente", value: 10 },
	];

	return (
		<Box mb={3}>
			<Typography>
				{questionText}
			</Typography>
			<Autocomplete
				sx={{ mt: 2 }}
				options={ratingOptions}
				renderInput={(params) => <TextField {...params} label="Seleccione una opción" required />}
				value={value}
				onChange={(_, v) => updateAnswerValue({ questionId: questionId, value: v })}
			/>
		</Box>
	);
}
