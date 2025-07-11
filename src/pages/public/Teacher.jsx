import { Box, Button, Container, TextField, Typography, Paper, Stack, Alert } from "@mui/material";
import useTeacher from "@/customHooks/useTeacher";

export default function Teacher() {

	const { surveyId, setSurveyId, teacherCode, setTeacherCode, studentCount, setStudentCount, studentCodes, error, handleOpen, handleClose } = useTeacher();

	return (
		<Container maxWidth="sm" sx={{ mt: 4 }}>
			<Paper elevation={3} sx={{ p: 4 }}>
				{studentCodes.length === 0 ? (
					<>
						<Typography variant="h5" gutterBottom>
							Abrir Encuesta
						</Typography>

						<Stack spacing={2}>
							<TextField
								label="ID de la Encuesta"
								type="number"
								value={surveyId}
								onChange={(e) => setSurveyId(e.target.value)}
							/>
							<TextField
								label="Código del Maestro"
								value={teacherCode}
								onChange={(e) => setTeacherCode(e.target.value)}
								slotProps={{
									input: {
										maxLength: 4
									}
								}}
							/>
							<TextField
								label="Cantidad de Estudiantes"
								type="number"
								value={studentCount}
								onChange={(e) => setStudentCount(e.target.value)}
							/>

							{error && <Alert severity="error">{error}</Alert>}

							<Button
								variant="contained"
								color="primary"
								onClick={handleOpen}
							>
								Abrir
							</Button>
						</Stack>
					</>
				) : (
					<>
						<Typography variant="h6">
							Encuesta #{surveyId} - {studentCount} estudiantes
						</Typography>

						<Box mt={2}>
							<Typography variant="subtitle1" gutterBottom>
								Códigos de Estudiantes:
							</Typography>
							<Paper
								variant="outlined"
								sx={{
									maxHeight: 300,
									overflowY: "auto",
									p: 2,
									fontFamily: "monospace",
								}}
							>
								<Stack spacing={1}>
									{studentCodes.map((code, idx) => (
										<Typography key={idx}>{code}</Typography>
									))}
								</Stack>
							</Paper>
						</Box>

						<Box mt={3}>
							<Button variant="outlined" color="secondary" onClick={handleClose}>
								Listo, ya todos los presentes contestaron
							</Button>
						</Box>
					</>
				)}
			</Paper>
		</Container>
	);
}
