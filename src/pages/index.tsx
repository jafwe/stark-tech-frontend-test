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
      className={`${geistSans.className} ${geistMono.className} flex h-screen flex-col items-center bg-[#EDEDED] font-[family-name:var(--font-geist-sans)]`}
    >
      <header className={"h-[58px] w-full bg-white flex justify-center"}>
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

        <div className={"bg-white rounded-[3px] border border-[#DFDFDF] flex"}>
          <div className={"flex w-full py-4 px-[18px] justify-between"}>
            <div
              className={
                "rounded-[3px] bg-[#0386F4] py-[10px] px-4 text-[13px]/4.5 font-semifold text-white"
              }
            >
              {"456456"}
            </div>
            <div
              className={
                "rounded-[3px] bg-[#0386F4] py-[10px] px-4 text-[13px]/4.5 font-semifold text-white"
              }
            >
              {"789789"}
            </div>
          </div>
        </div>

        <div className={"bg-white rounded-[3px] border border-[#DFDFDF]"}>
          <div className={"flex py-4 px-[18px] justify-between"}>
            <div
              className={
                "rounded-[3px] bg-[#0386F4] py-[10px] px-4 text-[13px]/4.5 font-semifold text-white"
              }
            >
              {"456456"}
            </div>
          </div>
          {/* Table */}
          <div className={"w-full pt-[16px] pb-[18px]"}>
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
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
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
