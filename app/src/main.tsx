import { CssBaseline, GlobalStyles } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AppStoreProvider } from '@state/appStore.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary.tsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import ControlTempPage from './pages/ControlTempPage/ControlTempPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Layout from './components/Layout';
import SchedulePage from './pages/SchedulePage/ScheduleIndexPage.tsx';
import ScheduleNewPage from './pages/SchedulePage/ScheduleNewPage.tsx';
import ScheduleEditPage from './pages/SchedulePage/ScheduleEditPage.tsx';
import SleepPage from './pages/DataPage/SleepPage/SleepPage.tsx';
import DataPage from './pages/DataPage/DataPage.tsx';
import VitalsPage from './pages/DataPage/VitalsPage/VitalsPage.tsx';
import LogsPage from './pages/DataPage/LogsPage/LogsPage.tsx';
import WaterLevelPage from '@/pages/WaterLevelPage/WaterLevelPage.tsx';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#000000',
    },
    primary: {
      main: '#ffffff',
      contrastText: '#000000',
    },
    secondary: {
      main: 'rgba(255, 255, 255, 0.7)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
    },
    grey: {
      100: '#e8eaed',
      300: '#a6adbe',
      400: '#88878c',
      500: '#606060',
      700: '#272727',
      800: '#262626',
      900: '#242424',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 400,
      color: '#ffffff',
    },
    h5: {
      fontWeight: 400,
      color: '#ffffff',
    },
    h6: {
      fontWeight: 400,
      color: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #app': {
          height: '100%',
          width: '100%',
        },
        body: {
          width: '100%',
          overscrollBehavior: 'none',
          overflowX: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Reduce default min width and padding to fit more buttons on mobile
          minWidth: 44,
          padding: '6px 10px',
          '@media (max-width:600px)': {
            minWidth: 40,
            padding: '6px 8px',
          },
        },
        sizeSmall: {
          padding: '4px 8px',
          '@media (max-width:600px)': {
            padding: '3px 6px',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 6,
          '@media (max-width:600px)': {
            padding: 4,
          },
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          paddingLeft: 6,
          paddingRight: 6,
          minWidth: 44,
          '@media (max-width:600px)': {
            paddingLeft: 4,
            paddingRight: 4,
            minWidth: 40,
          },
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <AppStoreProvider>
            <CssBaseline />
            <GlobalStyles
              styles={{
                'html, body': {
                  overscrollBehavior: 'none', // Prevent rubber-banding
                },
              }}
            />
            <BrowserRouter basename="/">
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<SettingsPage />} />
                  <Route path="temperature" element={<ControlTempPage />} />
                  <Route path="left" element={<ControlTempPage />} />
                  <Route path="right" element={<ControlTempPage />} />

                  <Route path="data" element={<DataPage />}>
                    <Route path="sleep" element={<SleepPage />} />
                    <Route path="logs" element={<LogsPage />} />
                    <Route path="vitals" element={<VitalsPage />} />
                  </Route>

                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="schedules" element={<SchedulePage />}>
                    <Route path="new" element={<ScheduleNewPage />} />
                    <Route path=":scheduleId" element={<ScheduleEditPage />} />
                  </Route>
                  <Route path="water-level" element={<WaterLevelPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AppStoreProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
