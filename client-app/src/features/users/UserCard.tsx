import { observer } from "mobx-react-lite";
import { User } from "../../app/models/user";
import { Typography, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { router } from "../../app/router/router";
import userPlaceHolder from "../../assets/user.png";

interface Props {
    user: User;
    description: string;
}

export default observer(function UserCard({ user, description }: Props) {    

    return (
        <>
            <Typography sx={{ paddingLeft: "20px" }} color="textSecondary">
                {description}
            </Typography>
            <ListItem>
                <ListItemAvatar
                    onClick={() => router.navigate(`/profile/${user.username}`)}
                >
                    <Avatar src={user.photo ? user.photo?.url : userPlaceHolder} />
                </ListItemAvatar>
                <ListItemText
                    onClick={() => router.navigate(`/profile/${user.username}`)}
                    primary={user.firstName + " " + user.lastName}
                    secondary={`@${user.username}`}
                />
            </ListItem>
        </>
    );
})