import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Snackbar } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import useCourseManager from "../../customHooks/useCourseManager";

export default function CourseManager() {
	
	const { courses, openDialog, editingCourse, name, setName, snackbar, openAddDialog, openEditDialog, closeDialog, saveCourse, deleteCourse, closeSnackbar } = useCourseManager();

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
							<TableCell align="right">Acciones</TableCell>
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
										sx={{ ml: 1 }}
									>
										<Delete />
									</IconButton>
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
