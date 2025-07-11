import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Snackbar } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import useTeacherManager from "@/customHooks/useTeacherManager";

export default function TeacherManager() {
	
	const { teachers, openDialog, editingTeacher, name, setName, workerId, setWorkerId, snackbar, openAddDialog, openEditDialog, closeDialog, saveTeacher, deleteTeacher, closeSnackbar } = useTeacherManager();

	return (
		<>
			<Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
				<Typography variant="h4" mb={3}>
					Administración de Maestros
				</Typography>

				<Button variant="contained" onClick={openAddDialog} sx={{ mb: 2 }}>
					Añadir Maestro
				</Button>

				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Nombre</TableCell>
							<TableCell>Matrícula</TableCell>
							<TableCell align="center">Acciones</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{
							teachers.length === 0 && (
							<TableRow key='no_key'>
								<TableCell colSpan={3} align="center">
									No hay maestros registrados
								</TableCell>
							</TableRow>
							)
						}
						{
							teachers.map((teacher) => (
								<TableRow key={teacher.RECORD_id}>
									<TableCell>{teacher.teacher_name}</TableCell>
									<TableCell>{teacher.worker_id}</TableCell>
									<TableCell align="right">
										<Box sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-around'
										}}>
											<IconButton
												onClick={() => openEditDialog(teacher)}
												color="primary"
												size="small"
											>
												<Edit />
											</IconButton>
											<IconButton
												onClick={() => deleteTeacher(teacher.RECORD_id)}
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
				<Dialog open={openDialog} onClose={closeDialog}>
					<DialogTitle>{editingTeacher ? "Editar Maestro" : "Añadir Maestro"}</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							label="Nombre"
							fullWidth
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							margin="dense"
							label="Matrícula"
							fullWidth
							value={workerId}
							onChange={(e) => setWorkerId(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
					<Button onClick={closeDialog}>Cancelar</Button>
					<Button variant="contained" onClick={saveTeacher}>
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
