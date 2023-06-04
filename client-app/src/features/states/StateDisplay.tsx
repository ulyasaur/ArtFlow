import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../app/themes/theme";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { registerables, Chart } from "chart.js";
import formatDateTime from "../../app/formatting/date/formatDateTime";
import { KeepRecommendation } from "../../app/models/keepRecommendation";
import celsiusToFahrenheit from "../../app/formatting/temperature/celsiusToFahrenheit";

Chart.register(...registerables);

interface Props {
    orderId: number;
    keepRecommendation: KeepRecommendation;
}

export default observer(function StateDisplay({ orderId, keepRecommendation }: Props) {
    const { t } = useTranslation();
    const { orderStore } = useStore();
    const { loadingStatus, states, loadOrderStates } = orderStore;
    const { artpieceStore: { tempUnit } } = useStore();

    const [lightChartData, setLightChartData] = useState<ChartData<'line'> | null>(null);
    const [temperatureChartData, setTemperatureChartData] = useState<ChartData<'line'> | null>(null);
    const [humidityChartData, setHumidityChartData] = useState<ChartData<'line'> | null>(null);

    useEffect(() => {
        loadOrderStates(orderId);

        if (states && states.length > 0) {
            if (tempUnit === 'f') {
                setTemperatureChartData({
                    labels: states.map((data) => formatDateTime(data.checkedOn.toString())),
                    datasets: [
                        {
                            label: t("chart.max").toString(),
                            data: states.map(() => parseFloat(celsiusToFahrenheit(keepRecommendation.maxTemperature).toFixed(2))),
                            borderColor: "red",
                            backgroundColor: "red",
                            borderWidth: 2,
                        },
                        {
                            label: t("chart.min").toString(),
                            data: states.map(() => parseFloat(celsiusToFahrenheit(keepRecommendation.minTemperature).toFixed(2))),
                            borderColor: "red",
                            backgroundColor: "red",
                            borderWidth: 2,
                        },
                        {
                            label: t("state.temperature").toString(),
                            data: states.map((data) => parseFloat(celsiusToFahrenheit(data.temperature).toFixed(2))),
                            backgroundColor: "black",
                            borderColor: "black",
                            borderWidth: 2,
                        }
                    ]
                });
            } else {
                setTemperatureChartData({
                    labels: states.map((data) => formatDateTime(data.checkedOn.toString())),
                    datasets: [
                        {
                            label: t("chart.max").toString(),
                            data: states.map(() => parseFloat(keepRecommendation.maxTemperature.toFixed(2))),
                            borderColor: "red",
                            backgroundColor: "red",
                            borderWidth: 2,
                        },
                        {
                            label: t("chart.min").toString(),
                            data: states.map(() => parseFloat(keepRecommendation.minTemperature.toFixed(2))),
                            borderColor: "red",
                            backgroundColor: "red",
                            borderWidth: 2,
                        },
                        {
                            label: t("state.temperature").toString(),
                            data: states.map((data) => parseFloat(data.temperature.toFixed(2))),
                            backgroundColor: "black",
                            borderColor: "black",
                            borderWidth: 2,
                        }
                    ]
                });
            }

            setHumidityChartData({
                labels: states.map((data) => formatDateTime(data.checkedOn.toString())),
                datasets: [
                    {
                        label: t("chart.max").toString(),
                        data: states.map(() => parseFloat(keepRecommendation.maxHumidity.toFixed(2))),
                        borderColor: "red",
                        backgroundColor: "red",
                        borderWidth: 2,
                    },
                    {
                        label: t("chart.min").toString(),
                        data: states.map(() => parseFloat(keepRecommendation.minHumidity.toFixed(2))),
                        borderColor: "red",
                        backgroundColor: "red",
                        borderWidth: 2,
                    },
                    {
                        label: t("state.humidity").toString(),
                        data: states.map((data) => parseFloat(data.humidity.toFixed(2))),
                        backgroundColor: "black",
                        borderColor: "black",
                        borderWidth: 2,
                    }
                ]
            });

            setLightChartData({
                labels: states.map((data) => formatDateTime(data.checkedOn.toString())),
                datasets: [
                    {
                        label: t("chart.max").toString(),
                        data: states.map(() => parseFloat(keepRecommendation.maxLight.toFixed(2))),
                        borderColor: "red",
                        backgroundColor: "red",
                        borderWidth: 2,
                    },
                    {
                        label: t("chart.min").toString(),
                        data: states.map(() => parseFloat(keepRecommendation.minLight.toFixed(2))),
                        borderColor: "red",
                        backgroundColor: "red",
                        borderWidth: 2,
                    },
                    {
                        label: t("state.light").toString(),
                        data: states.map((data) => parseFloat(data.light.toFixed(2))),
                        backgroundColor: "black",
                        borderColor: "black",
                        borderWidth: 2,
                    }
                ]
            });
        }

    }, [orderId, tempUnit, loadOrderStates]);

    if (loadingStatus || !states) {
        return <LoadingComponent content={t("loading.state").toString()} />
    }

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    margin: "auto",
                    width: "75vw",
                    minHeight: "17vh"
                }}
            >
                <CardHeader
                    sx={{
                        textAlign: "center",
                        backgroundColor: "hotpink",
                        color: "white"
                    }}
                    title={t("state.statistics")}
                    titleTypographyProps={{
                        display: "inline-block",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                />

                {
                    temperatureChartData && humidityChartData && lightChartData &&
                    <CardContent>
                        <div className="chart-container">
                            <h2 style={{ textAlign: "center" }}>{t("state.temperature") + ", °" + tempUnit?.toUpperCase()}</h2>
                            <Line
                                data={temperatureChartData!}
                                options={{
                                    responsive: true,
                                    interaction: {
                                        mode: 'index',
                                        intersect: false,
                                    }
                                    // ,plugins: {
                                    //     title: {
                                    //         display: true,
                                    //         text: t("state.temperature").toString()
                                    //     }
                                    // }
                                }}
                            />
                        </div>
                        <div className="chart-container">
                            <h2 style={{ textAlign: "center" }}>{t("state.humidity") + ", %"}</h2>
                            <Line
                                data={humidityChartData!}
                                options={{
                                    responsive: true,
                                    interaction: {
                                        mode: 'index',
                                        intersect: false,
                                    }
                                    // ,plugins: {
                                    //     title: {
                                    //         display: true,
                                    //         text: t("state.temperature").toString()
                                    //     }
                                    // }
                                }}
                            />
                        </div>
                        <div className="chart-container">
                            <h2 style={{ textAlign: "center" }}>{t("state.light") + ", %"}</h2>
                            <Line
                                data={lightChartData!}
                                options={{
                                    responsive: true,
                                    interaction: {
                                        mode: 'index',
                                        intersect: false,
                                    }
                                    // ,plugins: {
                                    //     title: {
                                    //         display: true,
                                    //         text: t("state.temperature").toString()
                                    //     }
                                    // }
                                }}
                            />
                        </div>
                    </CardContent>
                }
            </Card>
        </ThemeProvider>
    );
})