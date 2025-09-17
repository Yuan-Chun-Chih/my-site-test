const API_URL = "https://data.taipei/api/v1/dataset/a78e318b-3553-417f-bc55-e816e909af30?scope=resourceAquire";

async function loadData(){
  try{
    // 讀取由 GitHub Actions 產生的 data.json（離線快取）
    const localRes = await fetch('data.json', {cache: 'no-store'});
    const localJson = localRes.ok ? await localRes.json() : {};
    render(localJson, true);

    // 同時嘗試即時抓 API（線上最新），成功就覆蓋畫面
    const liveRes = await fetch(API_URL, {cache: 'no-store'});
    if(liveRes.ok){
      const liveJson = await liveRes.json();
      render(liveJson, false);
    }
  }catch(err){
    document.getElementById('data').textContent = '載入失敗：' + err.message;
  }
}

function pickRecords(json){
  // 嘗試從不同常見欄位抓出資料清單
  const r = json?.result;
  if(Array.isArray(json?.records)) return json.records;
  if(Array.isArray(r?.results)) return r.results;
  if(Array.isArray(r?.records)) return r.records;
  if(Array.isArray(json?.data)) return json.data;
  return json; // 回傳整包（避免無資料）
}

function render(json, isLocal){
  const data = pickRecords(json);
  const show = Array.isArray(data) ? data.slice(0, 10) : data;
  const ts = json?._fetched_at || json?.result?._fetched_at || '未知時間';
  document.getElementById('data').textContent = JSON.stringify(show, null, 2);
  document.getElementById('updated').textContent = (isLocal ? '（快取）' : '（即時）') + ' 更新時間：' + ts;
  document.getElementById('apiUrl').textContent = API_URL;
}

loadData();
