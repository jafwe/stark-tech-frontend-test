import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { monthRevenue, Revenue } from "@/constants/stock-info";
import { useEffect, useRef } from "react";
import { theme } from "@/pages";

export default function DataTable() {
  return (
    <div
      className={"grid grid-cols-[1fr_3fr] gap-1 w-full pt-[16px] pb-[18px]"}
    >
      <HeaderTable />
      <BasicTable />
    </div>
  );
}

export function HeaderTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{"年度月份"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={"每月營收"}>
            <TableCell component="th" scope="row">
              {"每月營收"}
            </TableCell>
          </TableRow>
          <TableRow key={"單月營收年增率 (%)"}>
            <TableCell component="th" scope="row">
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
    <TableContainer ref={tableRef} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {months.map((month) => (
              <TableCell key={month} align="right">
                {month}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={"revenue"}>
            {revenue.map((month) => (
              <TableCell
                sx={{ fontWeight: 400, border: "1px solid #E9E9E9" }}
                key={month.date}
                align="right"
              >
                {month.revenue / 1000}
              </TableCell>
            ))}
          </TableRow>

          <TableRow key={"percentage"}>
            {percentage.map((percent, index) => (
              <TableCell
                sx={{ fontWeight: 400, border: "1px solid #E9E9E9" }}
                key={index}
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
