import { Geist, Geist_Mono } from "next/font/google";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LineHighlightPlot, LinePlot } from "@mui/x-charts/LineChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { AllSeriesType } from "@mui/x-charts/models";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ChartsAxisHighlight } from "@mui/x-charts/ChartsAxisHighlight";

const alphabetStock = [
  {
    date: "2020-01-01",
    volume: 1000000,
    low: 1000000,
    high: 1000000,
  },
  {
    date: "2020-01-02",
    volume: 435435,
    low: 38389,
    high: 234324,
  },
  {
    date: "2020-01-03",
    volume: 303993,
    low: 49999,
    high: 5000000,
  },
];
const series = [
  {
    type: "bar",
    yAxisId: "volume",
    label: "Volume",
    color: "lightgray",
    data: alphabetStock.map((day) => day.volume),
    highlightScope: { highlight: "item" },
  },
  {
    type: "line",
    yAxisId: "price",
    color: "red",
    label: "Low",
    data: alphabetStock.map((day) => day.low),
    highlightScope: { highlight: "item" },
  },
  {
    type: "line",
    yAxisId: "price",
    color: "green",
    label: "High",
    data: alphabetStock.map((day) => day.high),
  },
] as AllSeriesType[];

export function Combining() {
  return (
    <div style={{ width: "100%" }}>
      <div>
        <ChartContainer
          series={series}
          height={400}
          xAxis={[
            {
              id: "date",
              data: alphabetStock.map((day) => new Date(day.date)),
              scaleType: "band",
              valueFormatter: (value) => value.toLocaleDateString(),
              height: 40,
            },
          ]}
          yAxis={[
            { id: "price", scaleType: "linear", position: "left", width: 50 },
            {
              id: "volume",
              scaleType: "linear",
              position: "right",
              valueFormatter: (value) =>
                `${(value / 1000000).toLocaleString()}M`,
              width: 55,
            },
          ]}
        >
          <ChartsAxisHighlight x="line" />
          <BarPlot />
          <LinePlot />

          <LineHighlightPlot />
          <ChartsXAxis
            // label="Date"
            axisId="date"
            tickInterval={(value, index) => {
              return index % 30 === 0;
            }}
            tickLabelStyle={{
              fontSize: 10,
            }}
          />
          <ChartsYAxis
            label="千元"
            axisId="price"
            tickLabelStyle={{ fontSize: 10 }}
          />
          <ChartsYAxis
            label="%"
            axisId="volume"
            tickLabelStyle={{ fontSize: 10 }}
          />
          <ChartsTooltip />
        </ChartContainer>
      </div>
    </div>
  );
}

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
      className={`${geistSans.className} ${geistMono.className} flex h-full flex-col items-center bg-[#EDEDED] font-[family-name:var(--font-geist-sans)]`}
    >
      <header className={"h-[58px] w-full bg-white border border-[#DFDFDF] flex justify-center"}>
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
            "bg-[#FAFAFA] rounded-[3px] text-[18px]/4.5 border border-[#DFDFDF] py-4 px-[18px] text-[#434343]"
          }
        >
          {"123"}
        </div>

        <div className={"bg-white rounded-[3px] border border-[#DFDFDF]"}>
          <div className={"flex w-full py-4 px-[18px] justify-between"}>
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
          <Combining />
        </div>

        <div className={"bg-white rounded-[3px] border border-[#DFDFDF]"}>
          <div className={"flex py-4 px-[18px] justify-between"}>
            <div
              className={
                "rounded-[3px] bg-[#0386F4] py-[10px] px-4 text-[13px]/4.5 font-semifold text-white"
              }
            >
              {"詳細數據"}
            </div>
          </div>
          {/* Table */}
          <div className={"flex gap-1 w-full pt-[16px] pb-[18px]"}>
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "0",
                boxShadow: "none",
                border: "1px solid #E9E9E9",
              }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: 600, backgroundColor: "#F6F8FA" }}
                    >
                      {"年度月份"}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={"每月營收"}>
                    <TableCell
                      sx={{ fontWeight: 600 }}
                      component="th"
                      scope="row"
                    >
                      {"每月營收"}
                    </TableCell>
                  </TableRow>
                  <TableRow key={"單月營收年增率 (%)"}>
                    <TableCell
                      sx={{ fontWeight: 600, backgroundColor: "#F6F8FA" }}
                      component="th"
                      scope="row"
                    >
                      {"單月營收年增率 (%)"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
];

export function BasicTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "0",
        boxShadow: "none",
        border: "1px solid #E9E9E9"
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F6F8FA" }}>
            <TableCell sx={{ fontWeight: 600 }}>
              Dessert (100g serving)
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">Calories</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">Fat&nbsp;(g)</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": {backgroundColor: "#F6F8FA" } }}
            >
              <TableCell  component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
