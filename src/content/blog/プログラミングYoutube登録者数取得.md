---
title: "【プログラミング】「何で伸びた？」が一目でわかる。YouTube登録者数と日々の予定を自動で記録する方法"
pubDate: 2026-07-10
tags:
  - スプレッドシート
  - Youtube
  - 配信者
---

<img src="/images/blog/5/sam.png" alt="動画編集の有償依頼" style="max-width: 100%; height: auto;"/>

## 毎日何人増えてる？増加率は？イベントあった日は伸びてる？

Youtuberの皆さん！
毎日活動、お疲れ様です。動画収録に編集、配信、スケジュール管理…色々あって大変ですよね…

そこでですよ。

## 皆さんは自分のチャンネルの登録者数、伸ばせてますか！？
## 伸び率把握できてますか！？
## 目標から逆算して考えられてますか！？

ぶっちゃけていいですよ…僕しか聞いてませんから（満面の笑み）

真面目な話、ここまで気を配って活動で来ている人、どのくらいいるんですかね…純粋な疑問。
あんまりいないんじゃないかぁ、なんて勝手に思っています。
今年中に〇〇人登録者いきたいから、あと〇〇人で、ひと月あたり〇〇人で、そうすると今月は目標まであと…

って考えるの大変じゃないですか？
しかも、単純に登録者の伸びとはいっても、ファンが増えれば拡散力が増えるし、イベント開催すればその分登録者は増える可能性もあるし…
単純に時間に比例するってものじゃないと思います。

色々な観点から観察をすれば、登録者の伸びを解析するのって難しいと思うんですよね。ここまで気を配れる人は少ないのではないかと思います。

何が言いたいんだといいますと、複合的な観点から見た解析結果の解像度が高いほど、最終目標までの小さいゴールは立てやすくなるし、モチベーションアップにもつながるし、いいことが満載だなと考えてるわけです。

今回の記事では、皆さんの一助になるであろう、チャンネル登録者数の増加傾向を知るためのツールについて書いていきます。

---

やりたいことが決まったところで、どうやって実現するのかというお話をしたいと思います。

簡単に使い方を伝えておくと、あるスプレッドシートの2列目（A列は除く）に、チャンネルのURLを記載するだけです。横にどれだけ増やしても全部チャンネル登録者数を取得してくれます。
強いてもう1つ言うなら、URLを記載したセルの1つ上のセルにチャンネル名を手動で記載してあげてもいいですね、って感じです。
あとは自動でよしなにやってくれるようになります。

今回用いる技術は「GAS」です。
「Google App Script」の頭文字をとってます。

GASって何？って方のために、簡単に説明すると、Googleのサービス（GoogleスプレッドシートやGmail、Googleカレンダーなど）を連携して作業を効率化したり、自動化したりすることができるプログラミングプラットフォームです。

ソースコードをお見せしながらざっくり解説をしていきたいのですが、まずは結果から見てほしいなと思います。

<img src="/images/blog/5/0.png" alt="code" style="max-width: 100%; height: auto;"/>

こんなのができます（一例です）。
A列に日付、B列に登録者数、C列にカレンダーの内容が自動的に反映されます。

これらの情報があれば、前置きしていた
## 「いつ」「何のイベントがあった時に」「どのくらい増減があるのか」

がわかるようになるとおもいます。
グラフにして可視化するとさらにわかりやすいですね。

これを定期実行すれば、アナリティクスだけではわからない、活動の総合的な実績が見えてくると思います。

では、早速ソースコードを見せながら解説してみようと思います。

⚠️このソースコードは動きはしますが、もちろん各個人に対して設定をかえなくてはならないこと、ご了承ください。

⚠️手順については、各個人で設定画面が異なる可能性があるので、あくまで参考程度にご覧ください。

⚠️本ツールを使用するにあたって、様々な権限をGoogleに委任することになるので、自己責任で行ってください。

## チャンネル登録者数取得

```javascript
//youtubeのAPIキー
 var key = "AAAAAAAAAAAAAAAAAAAAAA";
 var sheetName = "シート1" 
 
 var ss = SpreadsheetApp.getActiveSpreadsheet()
 var srcSheet = ss.getSheetByName(sheetName);
 
 var rowTitle = 1;
 var rowURL = 2;
 var rowEnd = srcSheet.getDataRange().getLastRow();
 var rowToday = rowEnd + 1;
 var colDate = 1;
 var colStart = 2;
 var colStart2 = 2;
 var colEnd = srcSheet.getDataRange().getLastColumn();

 let totalCount = new Number;
 totalCount = 0;

 function getSubscriberCount() {
 
 var formatDate = Utilities.formatDate(new Date(),"JST","yy/MM/dd");
  srcSheet.getRange(rowToday,1).setValue(formatDate);
 
  // 2列目に値が入っていれば、空欄になるまで繰り返し処理をする
  for (i=colStart; i<=colEnd; i++) {
    var channelURL = srcSheet.getRange(rowURL,i).getValue();
    
    try{
      console.log("Youtube" + i)

      // URLから必要な部分だけを取得
      var channelID = channelURL.slice(32);
      
      //登録者数を取得
      var dataURL = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + channelID +"&key=" + key;
      var response = UrlFetchApp.fetch(dataURL)
      var subscribe = new Number;
      subscribe = JSON.parse(response.getContentText()).items[0].statistics.subscriberCount;

      console.log(response.getContentText());
      
      //チャンネルタイトルを取得
      var dataURL = "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + channelID +"&key=" + key ;
      var response = UrlFetchApp.fetch(dataURL)
      var channnelTitle = JSON.parse(response.getContentText()).items[0].snippet.title;
      
      console.log(subscribe);

      //登録者数をシートに挿入
      srcSheet.getRange(rowToday,i).setValue(subscribe);
      //チャンネルタイトルをシートに挿入
      srcSheet.getRange(rowTitle,i).setValue(channnelTitle);

    }catch{
      console.log("error")
    }
  }
}

```
この部分が登録者数を取得する全体のコードです。
大事な部分を3つに絞ります。

1つ目はAPIキーの設定です。これは後ほど取得方法を解説するので、一旦パスしてもらって大丈夫です。

2つ目はどれだけチャンネルリストがあっても全部取得できる点です。
例の画像では、でんでんのチャンネルだけですが、先に述べたように、2行目にどれだけリンクを記述しても全部forで処理してくれる点です。「1つのチャンネルだけとれればいいや」って人は、もっとスッキリしたコードにできると思います。

3つ目は、実際にチャンネル登録者数をAPI経由で取得する処理です。スプレッドシートに記載したURLをもとに、その時点での正確な数値を取得してくれます。それをスプレッドシートに反映させている、というわけです。

## Googleカレンダーからイベントを取得

```javascript
//イベントの取得
// カレンダーオブジェクトを取得
var calendar = CalendarApp.getCalendarById('2dendenden2@gmail.com');

// 指定した日付の予定を取得
const today = new Date();

let iii = 0;
var events = calendar.getEventsForDay(today);

for (event in events) {

  // 予定を配列で返す
  let title = events[event].getTitle();
  // console.log(title);

  srcSheet.getRange(rowToday,colEnd + iii + 1 ).setValue(title);

  iii +=1;
}
```

挙動としては、C列、D列、E列…というように、イベント数が増えると、横にどんどん記載されていくところです。

⚠️実はカレンダー情報取得については、なんか不安定な挙動をする（前まではできてたのに現象）が起こって困った記憶があるので、実運用される方は自分できちんと書き直してテストすることを強くおすすめします。

以上解説でした。

いざ実行するぞとなっても、もう1つ作業が必要です。運用できるまでもう少しです、、頑張ってください！

## APIキーを取得する

<img src="/images/blog/5/1.png" alt="code" style="max-width: 100%; height: auto;"/>

先ほどパスしたAPIキーの取得方法を説明します。
まずは、App Script画面（コードを書いた画面）の左にある「＜＞」→「サービス」をクリックしてください。

<img src="/images/blog/5/2.png" alt="code" style="max-width: 100%; height: auto;"/>

サービスの追加画面になると思うので「Youtube Data API v3　ドキュメント」を選択して、右下の「追加」をクリックします。

<img src="/images/blog/5/3.png" alt="code" style="max-width: 100%; height: auto;"/>

画面右下の「同意して続行」をクリックします。

<img src="/images/blog/5/4.png" alt="code" style="max-width: 100%; height: auto;"/>

画面右上の「プロジェクトの選択」をクリックします。

<img src="/images/blog/5/5.png" alt="code" style="max-width: 100%; height: auto;"/>

画面右上の「新しいプロジェクト」をクリックします。

<img src="/images/blog/5/6.png" alt="code" style="max-width: 100%; height: auto;"/>

画面左下の「作成」をクリックします。

<img src="/images/blog/5/7.png" alt="code" style="max-width: 100%; height: auto;"/>

画面右上の「プロジェクトを選択」をクリックします。

<img src="/images/blog/5/8.png" alt="code" style="max-width: 100%; height: auto;"/>

画面上部の検索窓に「Youtube」と入力します。

<img src="/images/blog/5/9.png" alt="code" style="max-width: 100%; height: auto;"/>

「YouTube Data API v3」をクリックします。

<img src="/images/blog/5/10.png" alt="code" style="max-width: 100%; height: auto;"/>

「有効にする」をクリックします。

<img src="/images/blog/5/11.png" alt="code" style="max-width: 100%; height: auto;"/>

画面右上の「認証情報の作成」をクリックします。

<img src="/images/blog/5/12.png" alt="code" style="max-width: 100%; height: auto;"/>

「YouTube Data API v3」を選択して、「次へ」をクリックします。

<img src="/images/blog/5/13.png" alt="code" style="max-width: 100%; height: auto;"/>

これでAPIキーが取得できます。これを、先ほどのソースコードの変数「key」に入れてください。

<img src="/images/blog/5/14.png" alt="code" style="max-width: 100%; height: auto;"/>

承認画面がでてくるので「権限を確認」をクリックします。

<img src="/images/blog/5/15.png" alt="code" style="max-width: 100%; height: auto;"/>

このアプリは安全じゃない的なこといわれますが、大丈夫です。画面左下の「詳細」をクリックします。

<img src="/images/blog/5/16.png" alt="code" style="max-width: 100%; height: auto;"/>

すると、「<プロジェクト名>（安全ではないページ）に移動」というリンクボタンが出てくるので、それをクリックします。

<img src="/images/blog/5/17.png" alt="code" style="max-width: 100%; height: auto;"/>

画面左下の「すべて選択」にチェックを入れます。

<img src="/images/blog/5/18.png" alt="code" style="max-width: 100%; height: auto;"/>

下にスクロールして「続行」をクリックします。

<img src="/images/blog/5/19.png" alt="code" style="max-width: 100%; height: auto;"/>

ここまでできたら承認系は終わりです。元の画面に戻ると思うので、画面左のリストから時計のマーク「トリガー」をクリックします。

<img src="/images/blog/5/20.png" alt="code" style="max-width: 100%; height: auto;"/>

実行する関数を、自分が設定した関数名（ここでは、getSubscriberCount）に設定し、イベントのソースを「時間主導型」にし、時刻はお好きな時間を選択してください。すべて設定し終えたら画面右下の「保存」をクリックします。

## チャンネルのリンクを記載する

実はチャンネルのURLって2つあるんですよね。今回のツールはどっちでもいい、ってことはありません。
しかもちょっと取得が面倒…てか気付くか？ってレベルなので、そこもあわせて解説します。

まずは、データを取得したいチャンネルのトップページにいきます。

<img src="/images/blog/5/21.png" alt="code" style="max-width: 100%; height: auto;"/>

そしてF12で開発者モードを表示します。

<img src="/images/blog/5/22.png" alt="code" style="max-width: 100%; height: auto;"/>

その後検索欄で「alternate」と検索します。

<img src="/images/blog/5/23.png" alt="code" style="max-width: 100%; height: auto;"/>

すると、「id」と書いてあると思います。ぼくだったらこれですね。
これを、スプレッドシートの2列目に記載してください。
注意してほしいのは、ブラウザのリンクではツールが機能しないことです。かならず、この方法でリンク取得してください（やり方はいろいろあるけど）。

以上で完了です。これで、設定した時間で自動でチャンネル登録者数とGoogleカレンダーのイベントを取得してくれます。
お疲れ様でした！

---

## 🐌 最後に：活動の裏方はお任せください！

日々の活動でお困りのこと、例えば今回みたいなデータ分析だったり、イベント企画や動画編集、サムネイル作成など…
猫の手も借りたいって方は、是非お手伝いさせていただけたらな～と思います。僕も活動者さんを応援したい気持ちがありますのでね。

※現在は有償依頼のみになります

詳細はこちらからどうぞ～
https://dendend12345.com/request/

最後まで読んでいただき、ありがとうございましたm(__)m

では、また次回のブログで～。
