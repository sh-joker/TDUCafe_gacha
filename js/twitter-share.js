/**
 * ツイートボタンの初期動作
 */
function shareThisPage() {
  // ページタイトルを取得
  const text = encodeURIComponent(document.title);
  // 添付するハッシュタグ
  const hashtags = encodeURIComponent("TDU学食1000円ガチャ");
  // 自身のURLを取得
  const url = encodeURIComponent(location.href);
  window.open("https://twitter.com/share?text=" + text + "&hashtags=" + hashtags + "&url=" + url);
}