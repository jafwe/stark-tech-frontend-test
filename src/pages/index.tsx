import { Geist, Geist_Mono } from "next/font/google";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { AllSeriesType } from "@mui/x-charts/models";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { monthRevenue, Revenue } from "@/constants/stock-info";
import { useEffect, useRef } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex h-screen flex-col items-center overflow-y-auto bg-[#EDEDED] pt-[58px] font-[family-name:var(--font-geist-sans)]`}
    >
      <header
        className={
          "fixed z-10 top-0 h-[58px] w-full bg-white border border-[#DFDFDF] flex justify-center"
        }
      >
        <Autocomplete
          disablePortal
          options={[]}
          sx={{
            width: 400,
            height: 35,
            backgroundColor: "#FAFAFA",
            borderColor: "#DFDFDF",
            boxShadow: "inset 0px 0px 3px 1px #E9E9E9",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={"輸入台／美股代號，查看公司價值"}
            />
          )}
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
          {"台積電 (2330)"}
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
          {/* Table */}
          <div
            className={
              "grid grid-cols-[1fr_3fr] gap-1 w-full pt-[16px] pb-[18px]"
            }
          >
            <HeaderTable />
            <BasicTable />
          </div>
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
  );
}

export function CombinedChart() {
  const { revenue, percentage } = monthRevenue.reduce(
    (acc, cur, _, arr) => {
      const lastMonth = arr.find(
        (month) =>
          cur.revenue_year - 1 === month.revenue_year &&
          cur.revenue_month === month.revenue_month
      );
      if (lastMonth) {
        acc.revenue.push(cur);
        acc.percentage.push(cur.revenue / lastMonth.revenue - 1);
      }
      return acc;
    },
    { revenue: [] as Revenue[], percentage: [] as number[] }
  );

  const months = revenue.map((month) =>
    month.date.split("-").slice(0, 2).join("")
  );

  const series: AllSeriesType[] = [
    {
      type: "bar",
      yAxisId: "revenue",
      label: "每月營收",
      color: "#E8AF00",
      data: revenue.map((day) => day.revenue / 1000),
    },
    {
      type: "line",
      yAxisId: "percentage",
      color: "#CB4B4B",
      label: "單月營收年增率 (%)",
      data: percentage,
    },
  ];

  return (
    <div className="relative">
      <ChartContainer
        series={series}
        height={350}
        xAxis={[
          {
            id: "date",
            data: months,
            scaleType: "band",
            height: 40,
          },
        ]}
        yAxis={[
          {
            id: "revenue",
            scaleType: "linear",
            position: "left",
            width: 100,
          },
          {
            id: "percentage",
            scaleType: "linear",
            width: 50,
            position: "right",
          },
        ]}
      >
        {/* <ChartsLegend sx={{ position: "absolute", bottom: 0, right: 0 }} /> */}
        <div
          className="absolute bottom-0 right-0 h-12 w-12"
          style={{
            backgroundColor: "red",
            width: "100px",
            height: "100px",
          }}
        >
          {"test"}
        </div>

        <BarPlot />
        <LinePlot />
        <ChartsXAxis
          axisId="date"
          tickInterval={(value) => {
            return value.endsWith("01");
          }}
          tickLabelStyle={{
            fontSize: 12,
          }}
        />
        <ChartsYAxis
          label="%"
          axisId="percentage"
          tickLabelStyle={{ fontSize: 12 }}
        />
        <ChartsYAxis
          label="千元"
          axisId="revenue"
          tickLabelStyle={{ fontSize: 12 }}
        />
        <ChartsTooltip />
      </ChartContainer>
    </div>
  );
}

export function HeaderTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "0",
        boxShadow: "none",
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 600,
                backgroundColor: "#F6F8FA",
                border: "1px solid #E9E9E9",
              }}
            >
              {"年度月份"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={"每月營收"}>
            <TableCell
              sx={{ fontWeight: 600, border: "1px solid #E9E9E9" }}
              component="th"
              scope="row"
            >
              {"每月營收"}
            </TableCell>
          </TableRow>
          <TableRow key={"單月營收年增率 (%)"}>
            <TableCell
              sx={{
                fontWeight: 600,
                backgroundColor: "#F6F8FA",
                border: "1px solid #E9E9E9",
              }}
              component="th"
              scope="row"
            >
              {"單月營收年增率 (%)"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function BasicTable() {
  const tableRef = useRef<HTMLDivElement>(null);
  const { revenue, percentage } = monthRevenue.reduce(
    (acc, cur, _, arr) => {
      const lastMonth = arr.find(
        (month) =>
          cur.revenue_year - 1 === month.revenue_year &&
          cur.revenue_month === month.revenue_month
      );
      if (lastMonth) {
        acc.revenue.push(cur);
        acc.percentage.push(cur.revenue / lastMonth.revenue - 1);
      }
      return acc;
    },
    { revenue: [] as Revenue[], percentage: [] as number[] }
  );

  const months = revenue.map((month) =>
    month.date.split("-").slice(0, 2).join("")
  );

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo({
        left: tableRef.current.scrollWidth,
        behavior: "auto",
      });
    }
  }, []);

  return (
    <TableContainer
      ref={tableRef}
      component={Paper}
      sx={{
        borderRadius: "0",
        boxShadow: "none",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F6F8FA" }}>
            {months.map((month) => (
              <TableCell
                sx={{ fontWeight: 600, border: "1px solid #E9E9E9" }}
                key={month}
                align="right"
              >
                {month}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={"revenue"}>
            {revenue.map((month) => (
              <TableCell
                key={month.date}
                sx={{
                  border: "1px solid #E9E9E9",
                }}
                align="right"
              >
                {month.revenue / 1000}
              </TableCell>
            ))}
          </TableRow>

          <TableRow key={"percentage"}>
            {percentage.map((percent, index) => (
              <TableCell
                key={index}
                sx={{
                  backgroundColor: "#F6F8FA",
                  border: "1px solid #E9E9E9",
                }}
                align="right"
              >
                {Math.round(percent * 10000) / 100}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
