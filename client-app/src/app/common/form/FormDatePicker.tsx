import { FormControl, FormControlLabel, TextField, ThemeProvider, Typography } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { theme } from "../../themes/theme";
import { DatePicker, DateTimePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/uk";
import "dayjs/locale/en";
import dayjs, { Dayjs } from "dayjs";

interface Props {
    placeholder?: string;
    name?: string;
    defaultValue?: Date | Dayjs | string;
    label?: string;
}

export default function FormDatePicker(props: Props) {
    const [field, meta, helpers] = useField(props.name!);
    const { setFieldValue } = useFormikContext();

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider adapterLocale={localStorage.getItem("i18nextLng")!} dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                    {...field}
                    onChange={(value) => setFieldValue(props.name!, value, true)}
                    {...props}
                    defaultValue={dayjs(props.defaultValue)}
                />
                {meta.touched && meta.error ? (
                    <Typography color='error'>{meta.error}</Typography>
                ) : null}
            </LocalizationProvider>
        </ThemeProvider>
    )
}