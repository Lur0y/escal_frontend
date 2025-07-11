import { BottomNavigation as MUIBottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '@/customHooks/useAuth';

export default function BottomNavigation({value, setValue}) {

	const { logout } = useAuth();
	
	function handleLogout(){

		logout();

	}

	return (
		<Paper 
			sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} 
			elevation={3}
		>
			<MUIBottomNavigation
				showLabels
				value={value}
				onChange={(__, newValue) => {
					setValue(newValue);
				}}
			>
			<BottomNavigationAction label="Cursos" icon={<SchoolIcon />} />
			<BottomNavigationAction label="Maestros" icon={<PersonIcon />} />
			<BottomNavigationAction label="Cerrar sesión" icon={<LogoutIcon />} onClick={handleLogout} />
			</MUIBottomNavigation>
		</Paper>
	);
}
