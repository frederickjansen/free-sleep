import { useSchedules } from '@api/schedules';
import { useSettings } from '@api/settings';
import { LOWERCASE_DAYS } from '@/pages/SchedulePage/days.ts';
import ScheduleOverview from '@/pages/SchedulePage/ScheduleOverview.tsx';
import { useScheduleStore } from '@/pages/SchedulePage/scheduleStore.tsx';
import moment from 'moment-timezone';
import { useEffect, useMemo } from 'react';
import PageContainer from '@/pages/shared/PageContainer.tsx';
import SideControl from '@/components/SideControl.tsx';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import type { DayOfWeek } from '@api/schedulesSchema.ts';

const getAdjustedDayOfWeek = (timezone: string | null): DayOfWeek => {
  // Get the current moment in the server's configured timezone
  const now = moment.tz(timezone || 'UTC');
  // Extract the hour of the day in 24-hour format
  const currentHour = now.hour();

  // Adjust for very early morning schedules (before 5 AM = still "yesterday's schedule")
  // This handles overnight schedules (e.g., 10 PM - 6 AM)
  if (currentHour < 5) {
    return now
      .subtract(1, 'day')
      .format('dddd')
      .toLocaleLowerCase() as DayOfWeek;
  } else {
    return now.format('dddd').toLocaleLowerCase() as DayOfWeek;
  }
};

export default function ScheduleIndexPage() {
  const { data: schedules, refetch, isLoading } = useSchedules();
  const { data: settings } = useSettings();
  const { setOriginalSchedules, selectDay } = useScheduleStore();
  const { scheduleId } = useParams();
  const { pathname } = useLocation();

  // A child route is active if we have a scheduleId or are on the 'new' path.
  const isChildRouteActive = useMemo(
    () => !!scheduleId || pathname.endsWith('/schedules/new'),
    [scheduleId, pathname],
  );

  useEffect(() => {
    if (!settings) return;
    const day = getAdjustedDayOfWeek(settings.timeZone);
    selectDay(LOWERCASE_DAYS.indexOf(day));
  }, [settings, selectDay]);

  useEffect(() => {
    if (!schedules) return;
    setOriginalSchedules(schedules);
  }, [schedules, setOriginalSchedules]);

  if (isLoading || !schedules) {
    return null;
  }

  return (
    <PageContainer
      sx={{
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: '1200px',
        },
        mx: 'auto',
        mb: 15,
      }}
    >
      {isChildRouteActive ? (
        <Outlet />
      ) : (
        <>
          <SideControl title={'Schedules'} />
          <ScheduleOverview schedules={schedules} onRefresh={refetch} />
        </>
      )}
    </PageContainer>
  );
}
