import FavoriteIcon from '@mui/icons-material/Favorite';
import Header from '@/pages/DataPage/Header.tsx';
import PageContainer from '@/pages/shared/PageContainer.tsx';

export default function VitalsPage() {
  return (
    <PageContainer sx={{ gap: 1 }}>
      <Header title="Vitals" icon={<FavoriteIcon />} />
    </PageContainer>
  );
}
