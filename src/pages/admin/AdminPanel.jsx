import { Box, Grid } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import BigButton from "@/components/BigButton";
import useAuth from '@/customHooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
       <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#fafafa",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
            }}
        >
            <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ maxWidth: 600 }}>
                <BigButton 
                    icon={<SchoolIcon sx={{ fontSize: 40, mb: 1 }} />} 
                    label='Cursos' 
                    onClick={() => navigate("/admin/courses")}
                />
                <BigButton 
                    icon={<PersonIcon sx={{ fontSize: 40, mb: 1 }} />} 
                    label='Maestros' 
                    onClick={() => navigate("/admin/teachers")}
                />
                <BigButton 
                    icon={<LogoutIcon sx={{ fontSize: 40, mb: 1 }} />} 
                    label='Cerrar sesión' 
                    onClick={logout}
                />
            </Grid>
        </Box>
    );

}