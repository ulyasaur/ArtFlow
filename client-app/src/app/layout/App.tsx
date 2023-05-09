import { observer } from "mobx-react-lite";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import "../../index.css"
import { Container } from "@mui/material";
import HomePage from "../../features/home/HomePage";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const { userStore } = useStore();
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    let lang = localStorage.getItem("i18nextLng");
    if (lang) {
      i18n.changeLanguage(lang);
    }

    if (userStore.token) {
      userStore.getUser().finally(() => setAppLoaded(true));
    } else {
      setAppLoaded(true);
    }
  }, [userStore, appLoaded, i18n])

  if (!appLoaded) {
    return <LoadingComponent />
  }

  return (
    <Suspense fallback="...loading">
      <ScrollRestoration />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={{ paddingTop: "73px" }}>
            <Outlet />
          </Container>
        </>
      )
      }
    </Suspense>
  );
}

export default observer(App);