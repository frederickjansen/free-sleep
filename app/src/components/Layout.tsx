import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import ErrorDisplay from '../pages/shared/ErrorDisplay';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <Box
      id="Layout"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        position: 'relative',
      }}
    >
      <ErrorDisplay />
      {/* Renders current route */}
      <Box
        sx={{
          flexGrow: 1,
          paddingBottom: {
            xs: 'calc(56px + env(safe-area-inset-bottom))',
            md: '64px',
          },
        }}
      >
        <Outlet />
      </Box>
      <Navbar />
    </Box>
  );
}
