import { useSchedules } from '@api/schedules';
import { useAppStore } from '@state/appStore.tsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideControl from '@/components/SideControl.tsx';
import BasicScheduleEdit from '@/pages/SchedulePage/BasicScheduleEdit.tsx';
import ScheduleEditView from '@/pages/SchedulePage/ScheduleEditView.tsx';
import { useScheduleStore } from '@/pages/SchedulePage/scheduleStore.tsx';
import PageContainer from '@/pages/shared/PageContainer.tsx';

export default function ScheduleNewPage() {
  const navigate = useNavigate();
  const { side } = useAppStore();
  const { data: schedules } = useSchedules();
  const { createBlankSchedule, setOriginalSchedules } = useScheduleStore();

  useEffect(() => {
    // Set original schedules if available
    if (schedules) {
      setOriginalSchedules(schedules);
    }
    // Create a blank schedule when component mounts
    createBlankSchedule();
  }, [createBlankSchedule, schedules, setOriginalSchedules]);

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
