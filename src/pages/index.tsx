import Autocomplete from "@/components/Autocomplete";
import CombinedChart from "@/components/CombinedChart";
import DataTable from "@/components/DataTable";
import {
  EMPTY_REVENUE,
  Revenue,
  StockInfo,
  StockOption,
} from "@/constants/stock-info";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const FINMIND_TOKEN = process.env.NEXT_PUBLIC_FINMIND_TOKEN || "";

export async function getStaticProps() {
  const res = await fetch(
    `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FINMIND_TOKEN}`,
      },
    }
  );
  const { data: stockInfo } = (await res.json()) as { data: StockInfo[] };

  const options = stockInfo.map(
    (stock): StockOption => ({
      id: stock.stock_id,
      label: stock.stock_name,
    })
  );
  // Remove duplicate options
  const stockOptions = Array.from(
    new Set(options.map((option) => JSON.stringify(option)))
  ).map((optionStr) => JSON.parse(optionStr));

  return { props: { stockOptions } };
}

export default function Home({
  stockOptions,
}: {
  stockOptions: StockOption[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [yearInterval, setYearInterval] = useState<number>(5);
  const [stock, setStock] = useState<StockOption | null>(null);
  const [revenueList, setRevenueList] = useState<Revenue[]>([]);

  const stockData = useMemo(() => {
    const list = revenueList.length > 0 ? revenueList : EMPTY_REVENUE;
    const mostEarlyYear = new Date().getFullYear() - yearInterval;
    const thisMonth = new Date().getMonth();

    const { monthRevenue, percentage } = list.reduce(
      (acc, cur, _, arr) => {
        if (
          cur.revenue_year < mostEarlyYear ||
          (cur.revenue_year === mostEarlyYear && cur.revenue_month < thisMonth)
        )
          return acc;
        const lastYearRevenue = arr.find(
          (month) =>
            cur.revenue_year - 1 === month.revenue_year &&
            cur.revenue_month === month.revenue_month
        );
        if (lastYearRevenue) {
          acc.monthRevenue.push(cur);
          acc.percentage.push(
            Math.round((cur.revenue / lastYearRevenue.revenue - 1) * 10000) /
              100
          );
        }
        return acc;
      },
      { monthRevenue: [] as Revenue[], percentage: [] as number[] }
    );
    const timestamps = monthRevenue.map(
      (revenue) =>
        `${revenue.revenue_year}${
          revenue.revenue_month > 10
            ? revenue.revenue_month
            : `0${revenue.revenue_month}`
        }`
    );
    return { monthRevenue, percentage, timestamps };
  }, [revenueList, yearInterval]);

  // Load revenue data from FinMind
  useEffect(() => {
    if (!stock) return;

    const getRevenue = async () => {
      try {
        setIsLoading(true);
        const id = stock.id;
        const startDate = `${
          new Date().getFullYear() - 6
        }-${new Date().getMonth()}-01`;

        const res = await fetch(
          `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockMonthRevenue&data_id=${id}&start_date=${startDate}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${FINMIND_TOKEN}`,
              // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wNS0yMCAxNjoyMzoxMyIsInVzZXJfaWQiOiJqYWZ3ZSIsImlwIjoiMS4zNC4yMjQuMTEzIiwiZXhwIjoxNzQ4MzM0MTkzfQ.kYFaFcx5DtClHIhxesS2Rsz4Vy68BmDjdSgrOFQyK5U`,
            },
          }
        );
        const data = await res.json();
        setRevenueList(data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    getRevenue();
  }, [stock]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        backgroundColor: "#EDEDED",
        paddingTop: "58px",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          zIndex: 10,
          top: 0,
          height: "58px",
          width: "100%",
          backgroundColor: "white",
          border: "1px solid #DFDFDF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Autocomplete
          placeholder={"輸入台股代號，查看公司價值"}
          options={stockOptions}
          onChange={(option) => setStock(option)}
        />
      </Box>
      <Container
        sx={{
          width: "715px",
          paddingTop: "18px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FAFAFA",
            borderRadius: "3px",
            border: "1px solid #DFDFDF",
            padding: "16px 18px",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "18px",
            color: "#434343",
          }}
        >
          {stock ? `${stock.label} (${stock.id})` : "請選擇股票"}
        </Box>

        <Card>
          <CardContent>
            <Chip label={"每月營收"} />
            <Select
              variant={"standard"}
              value={yearInterval.toString()}
              IconComponent={"span"}
              onChange={(event: SelectChangeEvent) => {
                setYearInterval(parseInt(event.target.value));
              }}
            >
              <MenuItem value={1}>{"近 1 年"}</MenuItem>
              <MenuItem value={3}>{"近 3 年"}</MenuItem>
              <MenuItem value={5}>{"近 5 年"}</MenuItem>
            </Select>
          </CardContent>
          {isLoading ? (
            <Skeleton variant={"rectangular"} height={350} width={"100%"} />
          ) : (
            <CombinedChart {...stockData} />
          )}
        </Card>

        <Card>
          <CardContent>
            <Chip label={"詳細數據"} />
          </CardContent>
          {isLoading ? (
            <Skeleton variant={"rectangular"} height={350} width={"100%"} />
          ) : (
            <DataTable {...stockData} />
          )}
        </Card>

        <Typography>
          {
            "圖表單位：千元，數據來自公開資訊觀測站\n網頁圖表歡迎轉貼引用，請註明出處為財報狗"
          }
        </Typography>
      </Container>
    </Box>
  );
}
