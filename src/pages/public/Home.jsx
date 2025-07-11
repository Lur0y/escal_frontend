import { Box, Grid } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import BigButton from "@/components/BigButton";

export default function Home() {

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
                    icon={<HomeOutlinedIcon sx={{ fontSize: 40, mb: 1 }} />} 
                    label='Soy Estudiante' 
                    onClick={() => navigate("/student")}
                />
                <BigButton 
                    icon={<InfoOutlinedIcon sx={{ fontSize: 40, mb: 1 }} />} 
                    label='Soy Maestro' 
                    onClick={() => navigate("/teacher")}
                />
                <BigButton 
                    icon={<SettingsOutlinedIcon sx={{ fontSize: 40, mb: 1 }} />} 
                    label='Soy Administrador' 
                    onClick={() => navigate("/login")}
                />
            </Grid>
        </Box>
    );
}
