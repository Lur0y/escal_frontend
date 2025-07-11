import { Box, Button, Typography, Grid } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const buttons = [
        {
            label: "Soy Estudiante",
            icon: <HomeOutlinedIcon sx={{ fontSize: 40, mb: 1 }} />,
            onClick: () => navigate("/student"),
        },
        {
            label: "Soy Administrador",
            icon: <SettingsOutlinedIcon sx={{ fontSize: 40, mb: 1 }} />,
            onClick: () => navigate("/login"),
        },
        {
            label: "Soy Maestro",
            icon: <InfoOutlinedIcon sx={{ fontSize: 40, mb: 1 }} />,
            onClick: () => navigate("/teacher"),
        },
    ];

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
                {/* Botón superior (centro) */}
                <Grid container justifyContent="center">
                    <Button
                        variant="outlined"
                        onClick={buttons[0].onClick}
                        sx={{
                            width: 180,
                            height: 180,
                            borderRadius: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textTransform: "none",
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        {buttons[0].icon}
                        <Typography>{buttons[0].label}</Typography>
                    </Button>
                </Grid>

                {/* Botones inferiores en fila */}
                <Grid container justifyContent="space-between" spacing={4}>
                    {[buttons[1], buttons[2]].map(({ label, icon, onClick }) => (
                        <Grid
                            key={label}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Button
                                variant="outlined"
                                onClick={onClick}
                                sx={{
                                    width: 180,
                                    height: 180,
                                    borderRadius: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textTransform: "none",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}
                            >
                                {icon}
                                <Typography>{label}</Typography>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}
