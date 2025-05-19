import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { AllSeriesType } from "@mui/x-charts/models";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { monthRevenue, Revenue } from "@/constants/stock-info";

export default function CombinedChart() {
  const { revenue, percentage } = monthRevenue.reduce(
    (acc, cur, _, arr) => {
      const lastMonth = arr.find(
        (month) =>
          cur.revenue_year - 1 === month.revenue_year &&
          cur.revenue_month === month.revenue_month
      );
      if (lastMonth) {
        acc.revenue.push(cur);
        acc.percentage.push((cur.revenue / lastMonth.revenue - 1) * 100);
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
    <ChartContainer
      series={series}
      height={350}
      xAxis={[
        {
          id: "date",
          data: months,
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

      <BarPlot />
      <LinePlot />
      <ChartsXAxis
        axisId="date"
        tickInterval={(value: string) => {
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
  );
}
