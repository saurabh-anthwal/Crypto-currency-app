import React, { useEffect, useState } from "react";
import { CoinList } from "../config/Api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { numberWithCommas } from "./banner/Carousel";
import "./Index.css";

import {
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Coinstable = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <div>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="search for a a crypto currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%", border: "1px solid wheat" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24 Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{ fontWeight: "700", fontFamily: "Montserrat" }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h >= 0;

                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex", gap: 15 }}
                        >
                          <img
                            src={row?.image}
                            alt={row?.image}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color: "white",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{ color: "white" }}>
                          {symbol} {numberWithCommas(row.current_price)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{ color: "white" }}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          className="pagination"
          color="secondary"
          style={{
            padding: 10,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#302d2de8",
            color: "white",
          }}
          count={(handleSearch()?.length / 10).toFixed(0)}

          onChange={(_,value) => {
            setPage(value);
            window.scroll(0,450);
          }}
        />
      </Container>
    </div>
  );
};

export default Coinstable;
