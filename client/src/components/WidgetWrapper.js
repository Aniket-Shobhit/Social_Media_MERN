import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
    padding: '.5rem 1.5rem 0.75rem 1.5rem',
    backgroundColor: theme.palette.background.alt,
    borderRadius: '0.75rem',
    border: `1px solid ${theme.palette.mode==='dark' ? 'gray':'black'}`,
    boxShadow: `0px 0px 10px 0px ${theme.palette.mode === 'dark'? 'rgba(255,255,255,0.75)':'rgba(0,0,0,1)'}`,
}));

export default WidgetWrapper;