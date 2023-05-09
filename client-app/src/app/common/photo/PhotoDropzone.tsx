import { ThemeProvider, Typography } from '@mui/material';
import { useCallback } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import { useDropzone } from 'react-dropzone';
import { observer } from 'mobx-react-lite';
import { theme } from '../../themes/theme';
import { useTranslation } from 'react-i18next';

interface Props {
    setFiles: (files: any) => void;
}

export default observer(function PhotoDropzone({ setFiles }: Props) {
    const { t } = useTranslation();
    const dzStyles = {
        border: "dashed 3px hotpink",
        borderColor: "hotpink",
        borderRadius: "5px",
        paddingTop: "5px",
        textAlign: "center" as "center",
        height: "10vh"
    }

    const dzActive = {
        borderColor: "green"
    }

    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <ThemeProvider theme={theme}>
            <div {...getRootProps()} style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}>
                <input {...getInputProps()} />
                <UploadIcon fontSize='large' color='primary' />
                <Typography color="hotpink">{t("photo.drop")}</Typography>
            </div>
        </ThemeProvider>
    )
})