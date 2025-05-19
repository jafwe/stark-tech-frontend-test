import { Geist, Geist_Mono } from "next/font/google";
import { Revenue, stockInfo, StockOption } from "@/constants/stock-info";
import { useEffect, useMemo, useState } from "react";
import Autocomplete from "@/components/Autocomplete";
import DataTable from "@/components/DataTable";
import CombinedChart from "@/components/CombinedChart";

// const theme = createTheme({
//   components: {
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           fontSize: "15px",
//           padding: 0
//         },
//       },
//     },
//   },
// });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [stock, setStock] = useState<StockOption | null>(null);
  const [revenueList, setRevenueList] = useState<Revenue[]>([]);
  const [yearInterval, setYearInterval] = useState<1 | 3 | 5>(5);

  const { monthRevenue, percentage, timeStamps } = useMemo(() => {
    const { monthRevenue, percentage } = revenueList.reduce(
      (acc, cur, _, arr) => {
        const lastYearRevenue = arr.find(
          (month) =>
            cur.revenue_year - 1 === month.revenue_year &&
            cur.revenue_month === month.revenue_month
        );
        if (lastYearRevenue) {
          acc.monthRevenue.push(cur);
          acc.percentage.push(
            (cur.revenue / lastYearRevenue.revenue - 1) * 100
          );
        }
        return acc;
      },
      { monthRevenue: [] as Revenue[], percentage: [] as number[] }
    );
    const timeStamps = monthRevenue.map((month) =>
      month.date.split("-").slice(0, 2).join("")
    );
    return { monthRevenue, percentage, timeStamps };
  }, [revenueList]);

  const stockOptions = useMemo(() => {
    const options = stockInfo.map(
      (stock): StockOption => ({
        id: stock.stock_id,
        label: stock.stock_name,
      })
    );
    return Array.from(
      new Set(options.map((option) => JSON.stringify(option)))
    ).map((optionStr) => JSON.parse(optionStr));
  }, []);

  useEffect(() => {
    if (!stock) return;

    const getRevenue = async () => {
      const res = await fetch(
        `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockMonthRevenue&data_id=${
          stock.id
        }&start_date=${
          new Date().getFullYear() - 6
        }-${new Date().getMonth()}-01`
      );
      const data = await res.json();
      setRevenueList(data.data);
    };
    getRevenue();
  }, [stock]);

  return (
    // <ThemeProvider theme={theme}>
    <div
      className={`${geistSans.className} ${geistMono.className} flex h-screen flex-col w-screen items-center overflow-auto bg-[#EDEDED] pt-[58px] font-[family-name:var(--font-geist-sans)]`}
    >
      <header
        className={
          "fixed z-10 top-0 h-[58px] w-full bg-white border border-[#DFDFDF] flex justify-center items-center py-[10px]"
        }
      >
        <Autocomplete
          options={stockOptions}
          onChange={(option) => setStock(option)}
        />
      </header>
      <main
        className={"w-[715px] pt-[18px] flex flex-col items-stretch gap-[6px]"}
      >
        <div
          className={
            "bg-[#FAFAFA] rounded-[3px] text-[18px]/4.5 border border-[#DFDFDF] py-4 px-[18px] text-[#434343] font-semibold"
          }
        >
          {stock ? `${stock.label} (${stock.id})` : "請選擇股票"}
        </div>

        <div className={"bg-white rounded-[3px] border border-[#DFDFDF]"}>
          <div className={"flex w-full pt-4 px-[18px] justify-between"}>
            <div
              className={
                "rounded-[3px] bg-[#0386F4] py-[10px] px-4 text-[13px]/4.5 font-semifold text-white"
              }
            >
              {"每月營收"}
            </div>
            <div
              className={
                "rounded-[3px] bg-[#0386F4] py-[10px] px-4 text-[13px]/4.5 font-semifold text-white"
              }
            >
              {"近 5 年"}
            </div>
          </div>
          <CombinedChart />
        </div>

        <div className={"bg-white rounded-[3px] border border-[#DFDFDF]"}>
          <div className={"flex pt-4 px-[18px] justify-between"}>
            <div
              className={
                "rounded-[3px] bg-[#0386F4] py-[10px] px-4 text-[13px]/4.5 font-semifold text-white"
              }
            >
              {"詳細數據"}
            </div>
          </div>
          <DataTable />
        </div>

        <p
          className={
            "self-end whitespace-pre-line text-[#434343] text-[13px]/6 text-right"
          }
        >
          {
            "圖表單位：千元，數據來自公開資訊觀測站\n網頁圖表歡迎轉貼引用，請註明出處為財報狗"
          }
        </p>
      </main>
    </div>
    // </ThemeProvider>
  );
}
