export type Revenue = {
  date: string; // YYYY-MM-DD "2025-04-01";
  stock_id: string; // 股票代號 "2330";
  country: string; // 國家 "Taiwan";
  revenue: number; // 營收 "285956830000";
  revenue_month: number; // 月份 "3";
  revenue_year: number; // 年份 "2025";
};

export const EMPTY_REVENUE: Revenue[] = [
  { "date": "2022-02-01", "stock_id": "EMPTY", "country": "EMPTY", "revenue": 172176110000, "revenue_month": 1, "revenue_year": 2022 },
  { "date": "2022-03-01", "stock_id": "EMPTY", "country": "EMPTY", "revenue": 146933238000, "revenue_month": 2, "revenue_year": 2022 },
  { "date": "2022-04-01", "stock_id": "EMPTY", "country": "EMPTY", "revenue": 171966525000, "revenue_month": 3, "revenue_year": 2022 },
  { "date": "2022-05-01", "stock_id": "EMPTY", "country": "EMPTY", "revenue": 172561382000, "revenue_month": 4, "revenue_year": 2022 },
  { "date": "2022-06-01", "stock_id": "EMPTY", "country": "EMPTY", "revenue": 185705425000, "revenue_month": 5, "revenue_year": 2022 },
  { "date": "2022-07-01", "stock_id": "EMPTY", "country": "EMPTY", "revenue": 175874001000, "revenue_month": 6, "revenue_year": 2022 },
  { "date": "2023-02-01", "stock_id": "EMPTY", "country": "EMPTY", "revenue": 200050544000, "revenue_month": 1, "revenue_year": 2023 },
  { "date": "2023-03-01", "stock_id": "EMPTY", "country": "EMPTY", "revenue": 163174097000, "revenue_month": 2, "revenue_year": 2023 },
  { "date": "2023-04-01", "stock_id": "EMPTY", "country": "EMPTY", "revenue": 145408332000, "revenue_month": 3, "revenue_year": 2023 },
  { "date": "2023-05-01", "stock_id": "EMPTY", "country": "EMPTY", "revenue": 147899735000, "revenue_month": 4, "revenue_year": 2023 },
  { "date": "2023-06-01", "stock_id": "EMPTY", "country": "EMPTY", "revenue": 176537345000, "revenue_month": 5, "revenue_year": 2023 },
  { "date": "2023-07-01", "stock_id": "EMPTY", "country": "EMPTY", "revenue": 156404174000, "revenue_month": 6, "revenue_year": 2023 },
];

export type StockInfo = {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
};

export type StockOption = {
  id: string
  label: string
};

// test
