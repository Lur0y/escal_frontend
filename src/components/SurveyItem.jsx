import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function SurveyItem({ question, value, onChange }) {
	
	const ratingOptions = [
		{ label: "Insuficiente", value: 4 },
		{ label: "Suficiente", value: 6 },
		{ label: "Bueno", value: 8 },
		{ label: "Excelente", value: 10 },
	];

	return (
		<Box mb={3}>
			<FormControl component="fieldset" fullWidth>
				<FormLabel component="legend">{question.question_text}</FormLabel>
				<RadioGroup
					row
					value={value || ""}
					onChange={(e) => onChange(question.RECORD_id, Number(e.target.value))}
				>
					{ratingOptions.map((opt) => (
						<FormControlLabel
							key={opt.value}
							value={opt.value}
							control={<Radio />}
							label={opt.label}
						/>
					))}
				</RadioGroup>
			</FormControl>
		</Box>
	);
}
