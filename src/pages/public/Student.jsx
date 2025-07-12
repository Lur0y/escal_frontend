import { Box, Button, TextField, Typography, Alert, Paper } from "@mui/material";
import SurveyItem from "@/components/SurveyItem";
import useStudent from "@/customHooks/useStudent";

export default function Student() {

	const { answers, updateAnswerValue, surveyId, studentCode, comments, error, submitted, handleLoadSurvey, handleSubmit, setSurveyId, setStudentCode, setComments } = useStudent();

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

			{answers.length > 0 && (
				<Box sx={{ mx: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Paper
						elevation={2}
						sx={{ p: 2, borderRadius: 2, mb: 3 }}
					>
						{answers.map((ans) => (
							<SurveyItem
								key={ans.question_id}
								questionText={ans.question_text}
								questionId={ans.question_id}
								updateAnswerValue={updateAnswerValue}
								value={ans.answer_value}
							/>
						))}
					</Paper>

					<TextField
						label="Comentarios (opcional)"
						value={comments}
						onChange={(e) => setComments(e.target.value)}
						fullWidth
						multiline
						rows={3}
						sx={{ mb: 3 }}
					/>

					<Button variant="contained" onClick={handleSubmit} sx={{ mb: 3 }}>
						Enviar Encuesta
					</Button>
				</Box>
			)}
		</Box>
	);
}