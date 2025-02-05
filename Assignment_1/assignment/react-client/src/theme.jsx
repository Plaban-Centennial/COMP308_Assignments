// filepath: /e:/College/Semester_6/COMP308_004_Emerging_Technologies/Assignments/Assignment_1/assignment/react-client/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff1744', // Red accent color
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Segoe UI, Arial, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#ff1744', // Red color for the AppBar
        },
      },
    },
  },
});

export default theme;