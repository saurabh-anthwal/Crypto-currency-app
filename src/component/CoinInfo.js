import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/Api";
import { CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const chartDays = [
  {
    label:"24 Hours",
    value:1,
  },
  {
    label:"30 Days",
    value:30,
  },
  {
    label:"3 Months",
    value:90,
  },
  {
    label:"1 Years",
    value:365,
  }

]

const CoinInfo = ({ coin }) => {

  console.log("page", coin.id);

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  console.log("datass:", historicData);
  return (
    <div>
      {!historicData ? (
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      ) : (
        <>
          <Line className="chart"
            style={{ width: "60vw" }}
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} `
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  labels: `Price (Past ${days} Days) in ${currency}`,
                  borderColor: "gray",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  readius: 1,
                },
              },
            }}
          />
          <div className="chart-btn" style={{display:"flex",justifyContent:"space-around",width:"100%",margin:"10px"}}>
            {chartDays.map((day)=>(
              <button>{day.label}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
