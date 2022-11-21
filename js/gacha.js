/**
 * 学食のメニューから1000円までランダムにピックする関数 
 * @param mode モード設定[1=昼, 2=夕]
 */
function gacha(mode) {
  // 文字列形式のmode引数
  var modeStr = (mode==1)? "[昼]":"[夕]";

  // div.gacha-resultsの子要素を全削除
  var parent = document.getElementById("gacha-results");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  // p.messageを生成
  var messageElem = document.createElement("p");
  messageElem.id = "message";
  messageElem.innerText = modeStr + " ガチャ結果";
  parent.appendChild(messageElem);

  /**
   * 商品のコンストラクタ関数
   * @param name 名称
   * @param price 価格
   * @param color 券売機ボタンのカラーコード
   * @param time 販売時間[0:終日, 1:昼, 2:夕]
   */ 
  const item = function(name, price, color, time) {
    this.name = name
    this.price = price
    this.color = color
    this.time = time
  }
  const dendaiblue = "#0479bc";
  // 商品リスト
  const menu = [
    new item("唐揚げ丼(M)", 390, "darkorange", 0),
    new item("唐揚げ丼(L)", 470, "darkorange", 0),
    new item("カレーライス", 350, "gold", 0),
    new item("カレーライス大盛", 400, "gold", 0),
    new item("温泉玉子", 50, "gold", 0),
    new item("コロッケ", 100, "gold", 0),
    new item("ロースカツ", 150, "gold", 0),
    new item("ラーメン", 350, "orange", 0),
    new item("ラーメン大盛", 400, "orange", 0),
    new item("うどん", 350, "purple", 0),
    new item("うどん大盛", 400, "purple", 0),
    new item("そば", 350, "gray", 0),
    new item("そば大盛", 400, "gray", 0),
    new item("パスタ", 400, "hotpink", 0),
    new item("電大ソフトクリーム", 200, dendaiblue, 0),
    new item("電大パリパリチョコソフト", 250, dendaiblue, 0),
    new item("サラダ/小鉢", 50, "paleturquoise", 0),
    new item("サラダ/小鉢", 100, "palegreen", 0),
    new item("唐揚げ定食", 590, "brown", 1),
    new item("バラエティ", 460, "lime", 1),
    new item("日替わり定食", 500, "hotpink", 2),
    new item("電大カレーパン", 160, dendaiblue, 2),
    new item("フライドポテト", 200, dendaiblue, 2)
  ]
  // 最小単価
  const minPrice = 50;
  var pickedItemNames = []  // ガチャで出た商品の名前リスト
  var total = 0;  // 合計金額
  // 合計金額が950円を上回るまでループし結果を出力
  while (1000 - minPrice >= total) {
    // ランダムに商品を選択
    var pick = menu[Math.floor(Math.random() * menu.length)];
    
    // 販売期間外の場合はスキップ
    if(pick.time != 0 && mode != pick.time) {
      continue;
    }
    // 選択された商品を追加すると予算オーバーする場合はスキップ
    if (total + pick.price > 1000) {
      continue;
    }

    // 商品リストを更新
    pickedItemNames.push(pick.name);
    // 合計金額を更新
    total += pick.price;
    // div.resultを生成
    var div = document.createElement("div");
    div.className = "result";
    // div.resultのボーダー色をその商品と同期
    div.style.borderColor = pick.color;
    // new p.name >> div.result
    var nameElem = document.createElement("p");
    nameElem.className = "name";
    nameElem.innerText = pick.name;
    div.appendChild(nameElem);
    // new p.price >> div.result
    var priceElem = document.createElement("p");
    priceElem.className = "price";
    priceElem.innerText = "\xA5" + pick.price;  // "\xA5" : 円記号
    div.appendChild(priceElem);
    // div.result >> div.gacha-results
    parent.appendChild(div);
  }
  // p.totalに合計金額を表示する
  var totalElem = document.createElement("p");
  totalElem.id = "total";
  totalElem.innerText = "合計金額 \xA5" + total;
  parent.appendChild(totalElem);
  
  // シェアボタンのテキストとツイート内容を更新
  document.getElementById("tweet-btn").textContent = "結果をツイート";
  document.getElementById("tweet-btn").onclick = function() {
    // 添付するハッシュタグ
    const hashtags = "TDU学食1000円ガチャ";
    // 自身のURLを取得
    const url = encodeURIComponent(location.href);
    // テキスト第一行
    const title = "学食1000円ガチャ" + modeStr + "を回したよ！";
    // 主文
    // 一行に一つの商品名を入れて最後に合計金額を表示
    var tweetText = title + "\n";
    pickedItemNames.forEach(itemName => {
      tweetText += "・" + itemName + "\n";
    });
    tweetText += "合計" + total + "円" + "\n";
    // 別タブでツイート画面を開く
    window.open("https://twitter.com/share?text=" + encodeURIComponent(tweetText) + "&hashtags=" + encodeURIComponent(hashtags) + "&url=" + url);
  };
}