import { Box, Button, TextField, Typography, Alert, Paper } from "@mui/material";
import SurveyItem from "@/components/SurveyItem";
import useStudent from "@/customHooks/useStudent";

export default function Student() {

	const  { questions, surveyId, studentCode, comments, error, submitted, handleLoadSurvey, handleSubmit, handleAnswerChange, setSurveyId, setStudentCode, setComments, setSubmitted } = useStudent();

	if (submitted) {
		return <Typography variant="h4" mt={5}>¡Encuesta enviada!</Typography>;
	}

	return (
		<Box>
			<Paper elevation={3} sx={{ p: 3, my: 4, mx: 4 }}>
				<Typography variant="h4" gutterBottom textAlign="center">
					Encuesta para Estudiantes
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: { xs: 'column', sm: 'row' },
						justifyContent: 'space-between',
						gap: 2,
						width: '100%',
					}}
				>
					<TextField
						label="ID de Encuesta"
						variant="outlined"
						value={surveyId}
						onChange={(e) => setSurveyId(e.target.value)}
					/>

					<TextField
						label="Código de Alumno (4 dígitos)"
						variant="outlined"
						value={studentCode}
						onChange={(e) => setStudentCode(e.target.value)}
						error={!!studentCode && !/^\d{4}$/.test(studentCode)}
						helperText={
							studentCode && !/^\d{4}$/.test(studentCode)
								? "Debe contener exactamente 4 dígitos"
								: ""
						}
					/>
					<Button
						variant="contained"
						onClick={handleLoadSurvey}
					>
						Cargar Encuesta
					</Button>
				</Box>
			</Paper>
			{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

			{questions.length > 0 && (
				<Box>
					{questions.map((q) => (
						<SurveyItem
							key={q.RECORD_id}
							question={q}
							value={answers[q.RECORD_id]}
							onChange={handleAnswerChange}
						/>
					))}

					<TextField
						label="Comentarios (opcional)"
						value={comments}
						onChange={(e) => setComments(e.target.value)}
						fullWidth
						multiline
						rows={3}
						sx={{ mb: 3 }}
					/>

					<Button variant="contained" onClick={handleSubmit}>
						Enviar Encuesta
					</Button>
				</Box>
			)}
		</Box>
	);
}