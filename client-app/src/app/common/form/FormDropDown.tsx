import { MenuItem, TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    required?: boolean;
    options: string[];
}

export default function FormDropDown(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <>
            <TextField
                fullWidth
                select
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                {...field}
                {...props}
            >
                {props.options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </>
    );
}