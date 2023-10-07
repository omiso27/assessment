'use strict';

const userNameInput = document.getElementById('user-name'); //入力欄
const assessmentButton = document.getElementById('assessment'); //診断するボタン
const resultDivided = document.getElementById('result-area'); //診断結果を表示するエリア
const tweetDivided = document.getElementById('tweet-area'); //Twitterのエリア
assessmentButton.onclick = () => { //ボタンが押されたら関数を実行する
  const userName = userNameInput.value;
  if (userName.length === 0) { //名前の入力がないときは処理をしません！
    return;
  }

  userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
      assessmentButton.onclick();
    }
  }

  resultDivided.innerText = '';
  //診断結果を作成して
  const header = document.createElement('h3'); //HTML内部に<h3></h3>タグを作成
  header.innerText = '診断結果'; //<h3>診断結果</h3>
  resultDivided.appendChild(header); //result-areaに子要素として追加。
  //<div id="result-area"><h3>診断結果</h3></div>

  const paragraph = document.createElement('p'); //<p></p>
  const result = assessment(userName); //診断結果を用意しておく
  paragraph.innerHTML = result; //<p>ーさんのいいところは〜ーです</p>
  resultDivided.appendChild(paragraph); //result-areaに子要素として追加。

  //tweetボタンを作成する
  tweetDivided.innerText = '';
  //診断ボタンを押すたびにツイートボタンが増えないように都度消す
  const anchor = document.createElement('a'); // <a></a>
  const hrefValue = 
    'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue); //<a href = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw'></a>
  anchor.setAttribute('class', 'twitter-hashtag-button'); 
  //<a href = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw' class = 'twitter-hashtag-button'></a>
  anchor.setAttribute('data-text', result);
  //<a href = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw' class = 'twitter-hashtag-button' data-text= 'result></a>
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);


}




const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {String} userName ユーザの名前
 * @return {String} 診断結果
 */

function assessment(userName) {
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  
  //answersの個数が16個しかないので、足し合わせた結果を16で割ると0-15の範囲に収まる。
  const index = sumOfCharCode % answers.length;
  let result = answers[index]; //診断結果と取り出してくる 
  result = result.replaceAll('{userName}', userName);
  return result;
}

console.log(assessment('ミサ'));
console.log(assessment('藤子'));
