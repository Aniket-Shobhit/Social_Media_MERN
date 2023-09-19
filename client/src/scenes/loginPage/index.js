import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form.js';

const LoginPage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    return (
    <Box>
        <Box
            width="100%"
            p="1rem 6%"
            textAlign="center"
            position="sticky"
            top="0"
            zIndex="100"
            paddingBottom='0rem'
        >
            <Typography fontWeight="bold" fontSize='4rem' color="primary" sx={{ textShadow: '2px 2px 6px rgba(255, 255, 255, 0.5), -2px -2px 6px rgba(255, 255, 255, 0.5)' }}>
                SOCIOVERSE
            </Typography>
        </Box>
        <Form />
    </Box>
    );
};

export default LoginPage;