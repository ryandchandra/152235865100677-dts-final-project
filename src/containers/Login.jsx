import React, { useState, useEffect } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../authentication/firebase';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Login = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const onSubmit = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const email = data.get('email');
            const password = data.get('password');
        
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        document.title = "DAN | Login"
    }, [])

    return (
        <Box
            sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: "80vh"
            }} >
            <Box component="form" noValidate onSubmit={onSubmit}>
                <Typography variant="h4" >Login</Typography>
                <Divider style={{ width: "100%", margin: "1rem 0" }}></Divider>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password" />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }} >
                    Login
                </Button>
                <Typography>{error}</Typography>
                <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>Already have an account? Login</Link>
            </Box>
        </Box>
    )
}

export default Login;