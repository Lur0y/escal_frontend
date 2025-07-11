import { Box, Typography, Button } from "@mui/material";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
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
            <SearchOffOutlinedIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
            <Typography variant="h4" gutterBottom>
                404 - Página No Encontrada
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                Lo sentimos, la página que buscas no existe o fue eliminada.
            </Typography>
            <Button variant="contained" color="error" onClick={() => navigate("/home")}>
                Volver al inicio
            </Button>
        </Box>
    );
}
