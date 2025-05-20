import Autocomplete from "@/components/Autocomplete";
import CombinedChart from "@/components/CombinedChart";
import DataTable from "@/components/DataTable";
import {
  EMPTY_REVENUE,
  Revenue,
  stockInfo,
  StockOption,
} from "@/constants/stock-info";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip, { chipClasses } from "@mui/material/Chip";
import Container from "@mui/material/Container";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Select, { SelectChangeEvent, selectClasses } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const theme = createTheme({
  components: {
    MuiCard: {
      defaultProps: {
        sx: {
          backgroundColor: "white",
          border: "1px solid #DFDFDF",
          borderRadius: "3px",
          padding: "0",
          boxShadow: "none",
        },
      },
    },
    MuiCardContent: {
      defaultProps: {
        sx: {
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 18px 0px 18px",
          boxShadow: "none",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        sx: {
          [`& .${selectClasses.standard}`]: {
            backgroundColor: "#0386F4",
            color: "white",
            borderRadius: "3px",
            height: "auto",
            fontWeight: 600,
            fontSize: "13px",
            lineHeight: "18px",
            padding: "10px 16px 10px 16px !important",
            border: "none",
            textAlign: "right",
            "&:hover": {
              border: "none",
            },
            "&:focus": {
              border: "none",
              borderRadius: "3px",
            },
          },
          "&:after": {
            border: "none",
          },
          "&:before": {
            border: "none",
          },
        },
      },
    },
    MuiChip: {
      defaultProps: {
        sx: {
          backgroundColor: "#0386F4",
          color: "white",
          borderRadius: "3px",
          height: "auto",
          fontWeight: 600,
          fontSize: "13px",
          lineHeight: "18px",
          padding: "10px 16px",
          [`& .${chipClasses.label}`]: {
            padding: "0",
          },
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        sx: {
          width: 400,
          backgroundColor: "#FAFAFA",
          [`& .${outlinedInputClasses.root}`]: {
            padding: "0 0 0 8px",
            boxShadow: "inset 0 0 3px 1px #E9E9E9",
          },
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderRadius: "3px",
            borderColor: "#DFDFDF",
          },
          [`& .${autocompleteClasses.popupIndicator}`]: {
            transform: "none",
          },
        },
      },
    },
    MuiTable: {
      defaultProps: {
        sx: {
          borderRadius: "0",
        },
      },
    },
    MuiTableContainer: {
      defaultProps: {
        sx: {
          borderRadius: "0",
          boxShadow: "none",
        },
      },
    },
    MuiTableRow: {
      defaultProps: {
        sx: { "&:last-child": { backgroundColor: "#F6F8FA" } },
      },
    },
    MuiTableCell: {
      defaultProps: {
        sx: { fontWeight: 600, border: "1px solid #E9E9E9" },
      },
    },
    MuiTypography: {
      defaultProps: {
        color: "#434343",
        whiteSpace: "pre-line",
        align: "right",
        fontSize: 13,
        lineHeight: "24px",
      },
    },
  },
});

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stock, setStock] = useState<StockOption | null>(null);
  const [revenueList, setRevenueList] = useState<Revenue[]>([]);
  const [yearInterval, setYearInterval] = useState<number>(5);

  const stockData = useMemo(() => {
    const list = revenueList.length > 0 ? revenueList : EMPTY_REVENUE;
    const { monthRevenue, percentage } = list.reduce(
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
    const timestamps = monthRevenue.map((month) =>
      month.date.split("-").slice(0, 2).join("")
    );
    return { monthRevenue, percentage, timestamps };
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
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockMonthRevenue&data_id=${
            stock.id
          }&start_date=${
            new Date().getFullYear() - 6
          }-${new Date().getMonth()}-01`
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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
