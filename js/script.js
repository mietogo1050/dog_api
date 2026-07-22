// HTML要素の取得
const dogImage = document.getElementById('dog-image');
const btnFetch = document.getElementById('btn-fetch');
const breedsSelect = document.getElementById('breeds-select');
// APIのURL
// const API_URL = 'https://dog.ceo/api/breed/beagle/images/random';


// 画像を取得して表示する非同期関数
// 【ToDo】指定された犬種を受け取れるようにする
// デフォルト引数＝引数が指定されていないときに入れておく
async function fetchDogImage(breed /* = 'poodle' */) {
  // 【ToDo】受け取った犬種でエンドポイントを作る
  const API_URL = `https://dog.ceo/api/breed/${breed}/images/random`;
  try {
    // --- 1. APIにリクエストを送信する ---
    // TODO: fetch() を使って API_URL にリクエストを送信する。非同期処理なので await を忘れずに！
    // const response =  
    const res = await fetch(API_URL);
    console.log(res);

    // --- 2. レスポンスデータをJSON形式に解析する ---
    // TODO: 取得した response から JSON データを取り出す。非同期処理なので await を忘れずに！
    const data = await res.json();
    console.log(data);

    // --- 3. 画像のURLをimgタグに設定する ---
    // TODO: 解析した data の中にある画像URL（messageプロパティ）を、dogImage の src 属性に設定する
    dogImage.src = data.message;
  } catch (error) {
    console.error('データの取得に失敗しました:', error);
  }
}

// --- 4. イベントリスナーの設定 ---
// TODO: ページが読み込まれた時（DOMContentLoaded）に実行されるイベント。ページが読み込まれた時、fetchDogImage を実行する
window.addEventListener('DOMContentLoaded',async()=>{
  // 選択されている犬種を取得
  // OK DOMの読み込みが完了したタイミングで呼ぶ
  // fetchBreeds（）が終わるのを待ってからfetchDogImage（）が行われるようにする
  await fetchBreeds();

const selectedBreed = breedsSelect.value;
  fetchDogImage(selectedBreed);
});

// TODO: ボタン（btnFetch）がクリックされた時に fetchDogImage を実行する
btnFetch.addEventListener('click',()=>{
  // 選択されている犬種を取得
  const selectedBreed = breedsSelect.value;
  fetchDogImage(selectedBreed);
});

// 【ToDo】犬種のセレクトボックスを作る

const API_BREEDS_LIST_URL = 'https://dog.ceo/api/breeds/list/all';

async function fetchBreeds() {
  // APIをたたいて犬種一覧の情報を取得する
  const response = await fetch(API_BREEDS_LIST_URL);
  const data = await response.json();
  console.log(data.message);

// 【TODO】犬種名の配列を作る プロパティの名前をとる(オブジェクトのプロパティ名を取得する（Object.keys()メソッド）
const breedsList = Object.keys(data.message);
console.log(breedsList[0]);

let htmlContent = '';
breedsList.forEach((breed)=>{
  console.log(breed);
  htmlContent +=`<option value="${breed}">${breed}</option>`;
});
breedsSelect.innerHTML=htmlContent;
}
// NG グローバルスコープで呼んだらダメ
// fetchBreeds();

