import { Box, Button, Typography } from '@mui/material';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

export default function RouteErrorComponent() {
  // useRouteError() captures the error thrown by a loader, action, or component
  const error = useRouteError();
  const navigate = useNavigate();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  console.error('Route Error:', error);

  useEffect(() => {
    // Reset the query error boundary when this component mounts
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  // Check if it's a network/API error
  let isNetworkError = false;
  let title = 'Something Went Wrong';
  let message = 'An unexpected error occurred. Please try again.';

  if (isRouteErrorResponse(error)) {
    // This is an error from a loader/action response (e.g., 404, 503)
    if (error.status >= 500) {
      isNetworkError = true;
    }
    title = isNetworkError ? 'Unable to Connect to Server' : error.statusText;
    message =
      (error.data as any)?.message ||
      'Please check your connection and try again.';
  } else if (error instanceof Error) {
    // This is a standard JavaScript error
    if (
      error.message.includes('Network') ||
      error.message.includes('fetch') ||
      (error as any).code === 'ECONNREFUSED'
    ) {
      isNetworkError = true;
    }

    title = isNetworkError
      ? 'Unable to Connect to Server'
      : 'An Error Occurred';
    message = isNetworkError
      ? 'Please check that your Eight Sleep device is powered on and connected to your network.'
      : error.message;
  }

  // For development, show the full error
  if (import.meta.env.DEV) {
    return (
      <Box sx={{ p: 4, color: 'white' }}>
        <h1>Route Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
        <Button onClick={() => navigate(0)}>Try Again</Button>
      </Box>
    );
  }

  // Production-friendly error display
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        px: 3,
        color: '#fff',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 4, color: 'text.secondary', maxWidth: 600 }}
      >
        {message}
      </Typography>
      <Button
        onClick={() => {
          // navigate(0) reloads the current route, re-running the loader
          navigate(0);
        }}
        variant="contained"
        size="large"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
        }}
      >
        Try Again
      </Button>
    </Box>
  );
}
