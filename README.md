# 台北開放資料自動更新站（cURL + GitHub Actions）

此專案會定時以 `curl` 呼叫台北市政府資料開放平台 API，將回傳 JSON 寫入 `data.json` 並提交，前端頁面會顯示最新前 10 筆資料。

## API
- `https://data.taipei/api/v1/dataset/a78e318b-3553-417f-bc55-e816e909af30?scope=resourceAquire`
- 方法：GET

## 使用方式
1. 建立 GitHub 倉庫並上傳本專案所有檔案。
2. 進入 **Settings → Pages** 啟用 GitHub Pages（建議選用 GitHub Actions 作為來源）。
3. 第一次可在 **Actions** 頁面按 **Run workflow** 立即更新；之後每 6 小時自動更新。

## 客製化
- 如需更換 API，只要在：
  - `.github/workflows/auto-update.yml` 裡把 `API_URL` 換掉。
  - `assets/script.js` 的 `API_URL` 一併替換，前端即時載入也會使用新來源。

## 結構
- `index.html`：頁面
- `assets/style.css`：樣式
- `assets/script.js`：載入 `data.json`（快取）與即時 API
- `.github/workflows/auto-update.yml`：以 `curl` 更新 `data.json`
- `data.json`：儲存最近一次抓到的資料

## 注意
- 若 API 有流量限制或需要金鑰，請改用 Secrets 並在 `curl` 加上 Authorization header。
