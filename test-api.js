// import axios from "axios";

async function testApi() {
  // const axios = require("axios");
  const res = await fetch("https://api.finmindtrade.com/api/v4/data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wNS0xOCAxMjo0MDozMyIsInVzZXJfaWQiOiJqYWZ3ZSIsImlwIjoiMTAxLjEwLjE1Ny4xNTcifQ.NcGrGqmgWy7lm_0suFCSNbxnXO8J3J9-R_eKEcZaJlY"
    },
    params: {
          dataset: "TaiwanStockInfo",
          // data_id: "2330",
          // start_date: "2019-01-01",
          // end_date: "2024-01-01",
        },
  });
  const data = await res.json();
  console.log(data);
  // const axiosInstance = axios.create({
  //   baseURL: "https://api.finmindtrade.com/api/v4",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wNS0xOCAxMjo0MDozMyIsInVzZXJfaWQiOiJqYWZ3ZSIsImlwIjoiMTAxLjEwLjE1Ny4xNTcifQ.NcGrGqmgWy7lm_0suFCSNbxnXO8J3J9-R_eKEcZaJlY"
  //   },
  // });

  // const response = await axiosInstance.get("/data", {
  //   params: {
  //     dataset: "TaiwanStockMonthRevenue",
  //     data_id: "2330",
  //     // start_date: "2019-01-01",
  //     // end_date: "2024-01-01",
  //   },
  // });
  // console.log(response.data);
}

testApi();
