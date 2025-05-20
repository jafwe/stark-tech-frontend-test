## Getting Started
- Run the development server:
  ```bash
  yarn dev
  ```
- Build the deployment version and run in local environment:
  ```bash
  yarn build && yarn start
  ```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment
- On [Vercel](https://vercel.com)
- Synchronized with the latest version of `main` branch
- `main` branch is now locked and only accepts approved Pull Requests.

## Additional Infomation
- `切換股票的下拉選單`
  - 因要求為「選單內容為當前台股股票的列表」，且「每月營收」僅包含台股資料，
  - 故將預設文字改為 `輸入台股代號，查看公司價值`
- `數據圖表`
  - X軸的長度「以切換時間的下拉選單選擇為準」，但該下拉選單並未在設計稿中標示
  - 目前將設計稿中「近 5 年」標籤，改成下拉選單，並可另外選擇「近 1 年」、「近 3 年」


