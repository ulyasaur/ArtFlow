import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ThemeProvider, Typography } from '@mui/material';
import { theme } from '../themes/theme';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';

interface Props {
  content?: string;
}

export default function LoadingComponent({ content }: Props) {
  const { t } = useTranslation();

  return (
    <Suspense>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            marginTop: "46vh"
          }}
        >
          <CircularProgress sx={{ padding: "5px" }} />
          <Typography fontSize="14pt">
            {content || t("loading.app")}
          </Typography>
        </Box>
      </ThemeProvider>
    </Suspense>
  );
}