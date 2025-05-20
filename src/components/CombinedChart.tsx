import { Revenue } from "@/constants/stock-info";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { LinePlot } from "@mui/x-charts/LineChart";
import { AllSeriesType } from "@mui/x-charts/models";
import { useMemo } from "react";

interface CombinedChartProps {
  monthRevenue: Revenue[];
  percentage: number[];
  timestamps: string[];
}

export default function CombinedChart({
  monthRevenue,
  percentage,
  timestamps,
}: CombinedChartProps) {
  const isEmpty = useMemo(
    () => monthRevenue[0]?.stock_id === "EMPTY",
    [monthRevenue]
  );
  const series: AllSeriesType[] = useMemo(
    () => [
      {
        type: "bar",
        yAxisId: "monthRevenue",
        label: "每月營收",
        color: isEmpty ? "#D4D4D4FF" : "#E8AF00",
        data: monthRevenue.map((day) => day.revenue / 1000),
      },
      {
        type: "line",
        yAxisId: "percentage",
        color: isEmpty ? "#9A9898FF" : "#CB4B4B",
        label: "單月營收年增率 (%)",
        data: percentage,
      },
    ],
    [monthRevenue, percentage, isEmpty]
  );

  return (
    <Box sx={{ position: "relative", width: "100%", height: 350 }}>
      {isEmpty ? <EmptyHint /> : <ChartLegend />}
      <ChartContainer
        series={series}
        height={350}
        xAxis={[
          {
            id: "date",
            data: timestamps,
            scaleType: "band",
            height: 40,
            valueFormatter: (value, { location }) => {
              if (location === "tick") {
                return value.toString().slice(0, 4);
              }
              return value;
            },
          },
        ]}
        yAxis={[
          {
            id: "monthRevenue",
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
        <BarPlot />
        <LinePlot />
        <ChartsXAxis
          axisId={"date"}
          tickInterval={(value: string) => {
            if (isEmpty) {
              return false;
            }
            return value.endsWith("01");
          }}
          tickLabelStyle={{
            fontSize: 12,
          }}
        />
        <ChartsYAxis
          label={"%"}
          axisId={"percentage"}
          tickLabelStyle={{ fontSize: 12 }}
        />
        <ChartsYAxis
          label={"千元"}
          axisId={"monthRevenue"}
          tickLabelStyle={{ fontSize: 12 }}
        />
        {!isEmpty && <ChartsTooltip />}
      </ChartContainer>
    </Box>
  );
}

function EmptyHint() {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 1,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        opacity: 0.1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
      }}
    >
      {"無資料"}
    </Box>
  );
}

function ChartLegend() {
  return (
    <Stack
      sx={{
        position: "absolute",
        zIndex: 1,
        top: 16,
        left: 128,
        height: 24,
        width: 216,
        padding: 0.5,
        alignItems: "center",
        color: "#636363",
      }}
      direction={"row"}
      spacing={"3px"}
    >
      <Box sx={{ width: 14, height: 10, backgroundColor: "#E8AF00" }} />
      <Box sx={{ fontSize: 12.5, lineHeight: 1.125 }}>{"每月營收"}</Box>
      <Box sx={{ width: 14, height: 10, backgroundColor: "#CB4B4B" }} />
      <Box sx={{ fontSize: 12.5, lineHeight: 1.125 }}>
        {"單月營收年增率 (%)"}
      </Box>
    </Stack>
  );
}
