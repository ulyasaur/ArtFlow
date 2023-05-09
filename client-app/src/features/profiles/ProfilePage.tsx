import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProfileHeader from "./ProfileHeader";
import { useTranslation } from "react-i18next";

export default observer(function ProfilePage() {
    const { t, i18n } = useTranslation();
    
    const { username } = useParams<string>();
    const { profileStore } = useStore();
    const { loadingProfile, loadProfile, profile } = profileStore;

    useEffect(() => {
        loadProfile(username!);  
    }, [username, profile?.id]);
    
    if (loadingProfile) {
        return <LoadingComponent content={t("loading.profile").toString()} />
    }

    return (
        <>
            {profile && 
                <>
                    <ProfileHeader profile={profile!} />
                </>
            }
        </>
    );
})