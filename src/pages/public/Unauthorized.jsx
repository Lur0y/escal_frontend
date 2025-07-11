import { Box, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#f5f5f5",
                px: 2,
            }}
        >
            <LockOutlinedIcon sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
            <Typography variant="h4" gutterBottom>
                Acceso Denegado
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                No tienes permisos para acceder a esta página.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/home")}>
                Volver al inicio
            </Button>
        </Box>
    );
}
