import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Snackbar, Autocomplete, InputLabel } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import useCourseManager from "../../customHooks/useCourseManager";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

export default function CourseManager() {
	
	const { surveyData, setSurveyData, teachers, saveSurvey, closeSurveyDialog, openSurveyDialog, courses, openDialog, editingCourse, name, setName, snackbar, openAddDialog, openEditDialog, closeDialog, saveCourse, deleteCourse, closeSnackbar, openSurveyDialogFn } = useCourseManager();

	return (
		<>
			<Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
				<Typography variant="h4" mb={3}>
					Administración de Cursos
				</Typography>

				<Button variant="contained" onClick={openAddDialog} sx={{ mb: 2 }}>
					Añadir Curso
				</Button>

				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Nombre</TableCell>
							<TableCell align="center">Acciones</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{
							courses.length === 0 && (
							<TableRow key='no_key'>
								<TableCell colSpan={3} align="center">
									No hay cursos registrados
								</TableCell>
							</TableRow>
							)
						}
						{
							courses.map((course) => (
								<TableRow key={course.RECORD_id}>
									<TableCell>{course.course_name}</TableCell>
									<TableCell align="right">
										<Box sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-around'
										}}>
											<IconButton
												onClick={() => openSurveyDialogFn(course)}
												size="small"
											>
												<DriveFileMoveIcon />
											</IconButton>
											<IconButton
												onClick={() => openEditDialog(course)}
												color="primary"
												size="small"
												
											>
												<Edit />
											</IconButton>
											<IconButton
												onClick={() => deleteCourse(course.RECORD_id)}
												color="error"
												size="small"
												
											>
												<Delete />
											</IconButton>
										</Box>
									</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
				<Dialog open={openDialog} onClose={closeDialog} fullWidth>
					<DialogTitle>{editingCourse ? "Editar Curso" : "Añadir Curso"}</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							label="Nombre"
							value={name}
							onChange={(e) => setName(e.target.value)}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
					<Button onClick={closeDialog}>Cancelar</Button>
					<Button variant="contained" onClick={saveCourse}>
						Guardar
					</Button>
					</DialogActions>
				</Dialog>
				<Dialog open={openSurveyDialog} onClose={closeSurveyDialog} fullWidth>
					<DialogTitle sx={{textAlign: 'center'}}>Crear una encuesta de: {editingCourse?.course_name}</DialogTitle>
					<DialogContent>
						<Autocomplete
							sx={{my: 2}}
							options={teachers.map((teacher) => ({
								label: teacher.teacher_name,
								id: teacher.RECORD_id
							}))}
							renderInput={(params) => <TextField {...params} label="Seleccione el Maestró que impartirá el curso" required />}
							value={surveyData.teacher}
							onChange={(_, v) => setSurveyData({...surveyData, teacher: v})}
							
						/>
						<TextField 
							sx={{my: 2}}
							label='Inicio del Curso'
							fullWidth
							type="date"
							value={surveyData.courseStartsAt}
							onChange={(e) => setSurveyData({...surveyData, courseStartsAt: e.target.value})}
							slotProps={{
								inputLabel: {
									shrink: true,
								}
							}}
							required
						/>
						<TextField 
							sx={{my: 2}}
							label='Fin  del Curso'
							fullWidth
							type="date"
							value={surveyData.courseEndsAt}
							onChange={(e) => setSurveyData({...surveyData, courseEndsAt: e.target.value})}
							slotProps={{
								inputLabel: {
									shrink: true,
								}
							}}
							required
						/>
					</DialogContent>
					<DialogActions>
					<Button onClick={closeSurveyDialog}>Cancelar</Button>
					<Button variant="contained" onClick={saveSurvey}>
						Crear encuesta
					</Button>
					</DialogActions>
				</Dialog>
				

				<Snackbar
					open={snackbar.open}
					onClose={closeSnackbar}
					message={snackbar.message}
					autoHideDuration={3000}
				/>
			</Box>
		</>
	);
}
