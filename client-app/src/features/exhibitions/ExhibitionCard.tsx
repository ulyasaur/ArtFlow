import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { theme } from "../../app/themes/theme";
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, ThemeProvider } from "@mui/material";
import { router } from "../../app/router/router";
import FestivalIcon from '@mui/icons-material/Festival';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import formatDate from "../../app/formatting/date/formatDate";
import { Exhibition } from "../../app/models/exhibition";

interface Props {
    exhibition: Exhibition;
    actions?: boolean;
}

export default observer(function ExhibitionCard({ exhibition, actions }: Props) {
    const { exhibitionStore, userStore } = useStore();
    const { currentUser } = userStore;
    const { deleteExhibition } = exhibitionStore;

    return (
        <ThemeProvider theme={theme}>
            <ListItem
                key={exhibition.exhibitionId}
                secondaryAction={
                    actions
                        ? exhibition.organiser.id === currentUser?.id
                            ? <IconButton onClick={() => deleteExhibition(exhibition.exhibitionId)}>
                                <DeleteOutlineIcon />
                            </IconButton>
                            : null
                        : null
                }
            >
                <ListItemAvatar
                    onClick={() => router.navigate(`/exhibitions/${exhibition.exhibitionId}`)}
                >
                    <Avatar>
                        <FestivalIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    onClick={() => router.navigate(`/exhibitions/${exhibition.exhibitionId}`)}
                    primary={exhibition.name}
                    secondary={
                        <>
                            <CalendarMonthIcon fontSize="inherit" />
                            {
                                formatDate(exhibition.startDate.toString()) === formatDate(exhibition.endDate.toString())
                                    ? ` ${formatDate(exhibition.startDate.toString())}`
                                    : ` ${formatDate(exhibition.startDate.toString())} - ${formatDate(exhibition.endDate.toString())}`
                            }
                        </>
                    }
                />
            </ListItem>
        </ThemeProvider>
    );
})
