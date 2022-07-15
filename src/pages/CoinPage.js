import { LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../component/CoinInfo";
import { SingleCoin } from "../config/Api";
import { CryptoState } from "../CryptoContext";
import "./Index.css";
import { numberWithCommas } from "../component/banner/Carousel";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  console.log(coin);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className="coin-page">
      {/* SideBar */}
      <div className="left-side">
        <img
          src={coin?.image.large}
          alt={coin?.image}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", fontFamily: "Montserrat" }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            padding: 10,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
            
          }}
        >
          {coin?.description.en.split(". ")[0]}
        </Typography>
        <div>
          <span style={{ display: "flex" }}>
            <Typography style={{ fontWeight: 600, fontSize: 25 }}>
              Rank:
            </Typography>{" "}
            &nbsp; &nbsp;
            <Typography variant="h6" style={{margin:"4px"}}>{coin?.market_cap_rank}</Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography style={{ fontWeight: 600, fontSize: 25 }}>
              Current Price:
            </Typography>{" "}
            &nbsp; &nbsp;
            <Typography variant="h6" style={{margin:"4px"}}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography style={{ fontWeight: 600, fontSize: 25 }}>
              Market Cap:
            </Typography>{" "}
            &nbsp; &nbsp;
            <Typography variant="h5" style={{margin:"4px"}}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
              )}
            </Typography>
          </span>
        </div>
      </div>

      {/* ChartBar */}
      <div className="right-side">
        <CoinInfo coin={coin}/>
      </div>
    </div>
  );
};

export default CoinPage;
