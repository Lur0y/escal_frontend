import { Box, Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import useLogin from '@/customHooks/useLogin';

export default function Login() {

    const { handleChange, handleLogin, credentials } = useLogin();

    return (
        <Box
            sx={{
                margin: 0,
                height: '100vh',
                maxHeight: '100%',
                bgcolor: '#f0f2f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
            }}
        >
            <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 3 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Autenticación
                </Typography>

                <form onSubmit={handleLogin}>
                    <TextField
                        label="Usuario"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type="username"
                        required
                    />
                    <TextField
                        label="Contraseña"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type="password"
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3, py: 1.5 }}
                    >
                        Ingresar
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}