import { observer } from "mobx-react-lite";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../app/themes/theme";
import { ErrorMessage, Field, Formik } from "formik";
import { useStore } from "../../app/stores/store";
import { LoadingButton } from "@mui/lab";
import FormTextField from "../../app/common/form/FormTextField";
import * as Yup from "yup";
import FormDropDown from "../../app/common/form/FormDropDown";
import { useTranslation } from "react-i18next";

interface Props {
  setValue: any;
}

export default observer(function RegisterForm({ setValue }: Props) {
  const { t, i18n } = useTranslation();
  const { userStore } = useStore();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
          initialValues={{ firstName: "", lastName: "", username: "", role: "", email: "", password: "", error: null }}
          onSubmit={(values, { setErrors }) => userStore.register(values).catch(error =>
            setErrors({ error }))}
          validationSchema={Yup.object({
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            username: Yup.string().required(),
            role: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
          })}
        >
          {({ handleSubmit, isSubmitting, errors }) => (
            <form autoComplete="false" onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {t("signup.signup")}
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormTextField
                        required
                        label={t("userform.firstName").toString()}
                        placeholder={t("userform.firstName").toString()}
                        name="firstName"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        required
                        label={t("userform.lastName").toString()}
                        placeholder={t("userform.lastName").toString()}
                        name="lastName"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        required
                        label={t("userform.username").toString()}
                        placeholder={t("userform.username").toString()}
                        name="username"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormDropDown
                        required
                        label={t("userform.role").toString()}
                        placeholder={t("userform.role").toString()}
                        name="role"
                        options={["ArtOwner", "Organiser", "Driver"]}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        required
                        label={t("userform.email").toString()}
                        placeholder={t("userform.email").toString()}
                        name="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        required
                        label={t("userform.password").toString()}
                        placeholder={t("userform.password").toString()}
                        name="password"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ErrorMessage
                        name="error"
                        render={() =>
                          <Typography color="error">
                            {errors.error}
                          </Typography>}
                      />
                    </Grid>
                  </Grid>
                  <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {t("signup.signup-action")}
                  </LoadingButton>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link onClick={() => setValue("1")} variant="body2">
                      {t("signup.login")}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </form>)}
        </Formik>
      </Container>
    </ThemeProvider>
  );
})