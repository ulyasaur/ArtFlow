import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, Grid, ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import PhotoCropper from "./PhotoCropper";
import PhotoDropzone from "./PhotoDropzone";
import { theme } from "../../themes/theme";
import { useTranslation } from "react-i18next";

interface Props {
    loading: boolean;
    uploadPhoto?: (file: Blob) => void;
    uploadPhotoWithId?: (file: Blob, id: any) => void;
    id?: any;
    open: boolean;
    handleClose: (open: boolean) => void;
    cropperProps: {}
}

export default observer(function PhotoUploadWidget({ loading, uploadPhoto, uploadPhotoWithId, id, open, handleClose, cropperProps }: Props) {
    const { t } = useTranslation();
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => {
                id
                    ? uploadPhotoWithId!(blob!, id)
                    : uploadPhoto!(blob!)
            });
            setFiles([]);
            handleClose(false);
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => {
                return URL.revokeObjectURL(file.preview);
            });
        }
    }, [files])

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                fullWidth
                open={open}
                onClose={() => {
                    setFiles([]);
                    handleClose(false);
                }} >
                <Card>
                    <CardHeader
                        sx={{
                            textAlign: "center",
                            backgroundColor: "hotpink",
                            color: "white"
                        }}
                        title={t("photo.upload")}
                        titleTypographyProps={{
                            display: "inline-block",
                            fontSize: "13pt",
                            fontWeight: "bold"
                        }}
                    />
                    <CardContent>
                        <Grid container>
                            <Grid xs={12} >
                                <Typography color="hotpink" sx={{ marginBottom: "2vh" }}>{t("photo.add")}</Typography>
                                <PhotoDropzone setFiles={setFiles} />
                            </Grid>
                            <Grid sx={{ mt: "5vh" }} xs={5.9}>
                                <Typography color="hotpink" sx={{ marginBottom: "2vh" }}>{t("photo.resize")}</Typography>
                                {files && files.length > 0 &&
                                    <PhotoCropper setCropper={setCropper} imagePreview={files[0].preview} props={cropperProps} />
                                }
                            </Grid>
                            <Grid xs={0.2} />
                            <Grid sx={{ mt: "5vh" }} xs={5.9}>
                                <Typography color="hotpink" sx={{ marginBottom: "2vh" }}>{t("photo.preview")}</Typography>
                                {files && files.length > 0 &&
                                    <>
                                        <div className="img-preview" style={{ height: 200, overflow: "hidden" }} />
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                    <DialogActions>
                        {files && files.length > 0 &&
                            <Box>
                                <Button variant="contained" onClick={onCrop} >{t("photo.ok")}</Button>
                                <Button disabled={loading} onClick={() => {
                                    setFiles([]);
                                    handleClose(false);
                                }}>
                                    {t("photo.cancel")}
                                </Button>
                            </Box>
                        }
                    </DialogActions>
                </Card>
            </Dialog>

        </ThemeProvider>
    );
}) 