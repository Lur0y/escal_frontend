import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Snackbar } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import useTeacherManager from "@/customHooks/useTeacherManager";
import BottomNavigation from "@/components/BottonNavigation";

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
							<TableCell align="right">Acciones</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{
							teachers.length === 0 && (
							<TableRow key={1}>
								<TableCell colSpan={3} align="center">
									No hay maestros registrados
								</TableCell>
							</TableRow>
							)
						}
						{
							teachers.map((teacher) => (
								<TableRow key={teacher.RECORD_id}>
									<TableCell>{teacher.name}</TableCell>
									<TableCell>{teacher.workerId}</TableCell>
									<TableCell align="right">
									<IconButton
										onClick={() => openEditDialog(teacher)}
										color="primary"
										size="small"
									>
										<Edit />
									</IconButton>
									<IconButton
										onClick={() => deleteTeacher(teacher.id)}
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
			<BottomNavigation />
		</>
	);
}
