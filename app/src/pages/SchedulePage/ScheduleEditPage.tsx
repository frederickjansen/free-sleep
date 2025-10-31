import { useSchedules } from '@api/schedules';
import type { DayOfWeek } from '@api/schedulesSchema';
import ScheduleEditView from '@/pages/SchedulePage/ScheduleEditView.tsx';
import BasicScheduleEdit from '@/pages/SchedulePage/BasicScheduleEdit.tsx';
import { useScheduleStore } from '@/pages/SchedulePage/scheduleStore.tsx';
import { useAppStore } from '@state/appStore.tsx';
import { useEffect } from 'react';
import PageContainer from '@/pages/shared/PageContainer.tsx';
import SideControl from '@/components/SideControl.tsx';
import { useNavigate, useParams } from 'react-router-dom';

export default function ScheduleEditPage() {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const { side } = useAppStore();
  const { data: schedules } = useSchedules();
  const { setOriginalSchedules, loadScheduleForEditing } = useScheduleStore();

  useEffect(() => {
    if (!schedules || !scheduleId) return;

    // First, set original schedules in the store
    setOriginalSchedules(schedules);

    const sideSchedules = schedules[side];

    // Check if schedule entity exists
    if (!sideSchedules.schedules?.[scheduleId]) {
      console.error(`Schedule ${scheduleId} not found`);
      // Redirect to overview if schedule doesn't exist
      navigate('/schedules', { replace: true });
      return;
    }

    // Find which days are assigned to this schedule
    const assignments = sideSchedules.assignments;
    if (!assignments) {
      console.error('No assignments found');
      navigate('/schedules', { replace: true });
      return;
    }

    const assignedDays: DayOfWeek[] = (
      Object.entries(assignments) as [DayOfWeek, string][]
    )
      .filter(([_, id]) => id === scheduleId)
      .map(([day]) => day);

    if (assignedDays.length === 0) {
      console.error(`Schedule ${scheduleId} has no assigned days`);
      navigate('/schedules', { replace: true });
      return;
    }

    // Load the schedule for editing (now originalSchedules is guaranteed to be set)
    loadScheduleForEditing(scheduleId, assignedDays);
  }, [
    schedules,
    scheduleId,
    side,
    setOriginalSchedules,
    loadScheduleForEditing,
    navigate,
  ]);

  const handleBack = () => {
    navigate('/schedules');
  };

  if (!schedules) {
    return null;
  }

  const sideSchedules = schedules[side];
  const isBasicMode = sideSchedules.mode === 'basic';

  return (
    <PageContainer
      sx={{
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: '800px',
        },
        mx: 'auto',
        mb: 15,
      }}
    >
      <SideControl title={'Schedules'} />

      {isBasicMode ? (
        <BasicScheduleEdit onBack={handleBack} />
      ) : (
        <ScheduleEditView onBack={handleBack} />
      )}
    </PageContainer>
  );
}
