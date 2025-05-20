import { Revenue } from "@/constants/stock-info";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useRef } from "react";

interface DataTableProps {
  monthRevenue: Revenue[];
  percentage: number[];
  timestamps: string[];
}

export default function DataTable({
  monthRevenue,
  percentage,
  timestamps,
}: DataTableProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        width: "100%",
        paddingTop: 4,
        paddingBottom: "18px",
        gap: 1,
      }}
    >
      <HeaderTable />
      <BasicTable
        monthRevenue={monthRevenue}
        percentage={percentage}
        timestamps={timestamps}
      />
    </Box>
  );
}

export function HeaderTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label={"simple table"}>
        <TableHead>
          <TableRow>
            <TableCell>{"年度月份"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={"每月營收"}>
            <TableCell component={"th"} scope={"row"}>
              {"每月營收"}
            </TableCell>
          </TableRow>
          <TableRow key={"單月營收年增率 (%)"}>
            <TableCell component={"th"} scope={"row"}>
              {"單月營收年增率 (%)"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function BasicTable({
  monthRevenue,
  percentage,
  timestamps,
}: DataTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const isEmpty = monthRevenue[0]?.stock_id === "EMPTY";

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo({
        left: tableRef.current.scrollWidth,
        behavior: "auto",
      });
    }
  }, [monthRevenue]);

  return (
    <TableContainer ref={tableRef} component={Paper}>
      <Table aria-label={"simple table"}>
        <TableHead>
          <TableRow>
            {timestamps.map((month) => (
              <TableCell key={month} align={"right"}>
                {isEmpty ? "-" : month}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={"revenue"}>
            {monthRevenue.map((month) => (
              <TableCell
                sx={{ fontWeight: 400, border: "1px solid #E9E9E9" }}
                key={month.date}
                align={"right"}
              >
                {isEmpty
                  ? "-"
                  : new Intl.NumberFormat().format(month.revenue / 1000)}
              </TableCell>
            ))}
          </TableRow>

          <TableRow key={"percentage"}>
            {percentage.map((percent, index) => (
              <TableCell
                sx={{ fontWeight: 400, border: "1px solid #E9E9E9" }}
                key={index}
                align={"right"}
              >
                {isEmpty
                  ? "-"
                  : new Intl.NumberFormat().format(
                      Math.round(percent * 100) / 100
                    )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
