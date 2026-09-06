---
title: "【Minecraft】設定してる？！一気にカクつきが無くなるグラボの設定"
pubDate: 2026-08-17
tags:
  - Minecraft
  - ラグ
  - グラフィックボード
---

<img src="/images/blog/8/sam.png" alt="8" style="max-width: 100%; height: auto;"/>

## え！私のマイクラ、重すぎ！？

「マイクラ、重たいなぁ…」
っておもったことはないですか？

「描画距離低くしたら直るし、MODの数減らすとマシになるし…」
って思ったことはないですか？

それ…

### グラフィックボードがニートになっているかも！

超簡単に説明しますので、！？ってなった人はとりあえず、この記事の冒頭で自分の環境をチェックしてみてください！（知ってたらゴメンネ）

※Windows11を想定しています。<br>
※公式ランチャーでの設定方法です。CurseforgeやPrism Launcherといったサードパーティー製ランチャーの設定方法については、いつか気が向いたら書きます。

---
## ニートになっているか確認する

まずは、本当にニートなのか確認しましょう。
普段通りマイクラを起動します。
「F3」を押します。座標とか見るときに使うアレです。

<img src="/images/blog/8/1.png" alt="1" style="max-width: 100%; height: auto;"/>

こんな感じの表示になると思います。この中に確認するための情報が載っています。

画面右側、下から2行目をご覧ください。

<img src="/images/blog/8/2.png" alt="2" style="max-width: 100%; height: auto;"/>

「Intel(R) UHD Graphics 750 (iGPU)」と書いてありますね。
これは、Intel製CPUに搭載されている、内臓グラフィックスの型番を示しています。
なぜここにCPUの内臓グラフィックスの型番の記載があるのかというと、なんとなくお察しかもしれませんが、Minecraftのグラフィックス処理に、CPUの内臓グラフィックスが使われているからです。

つまり…

**ニート**だったわけなんですね～

では、今からニートなグラボを働かせましょう！

---

## やり方

まずはMinecraftのプロセスを動かしている本体ファイルを見つけましょう！
そのためには、タスクマネージャーを見るのが一番早いと思います。

タスクマネージャーを開くと、「アプリ」という項目の中に「OpenJDK Platform binary」というのがあると思います。

<img src="/images/blog/8/3.png" alt="2" style="max-width: 100%; height: auto;"/>  

それを右クリックすると、いろいろできるボタンたちが出てきます。
その中の「ファイルの場所を開く(O)」というものをクリックしてください。

<img src="/images/blog/8/4.png" alt="2" style="max-width: 100%; height: auto;"/>

すると、エクスプローラーが開きます。開いたエクスプローラーの中に「javaw.exe」というファイルがあれば正解です◎

<img src="/images/blog/8/5.png" alt="2" style="max-width: 100%; height: auto;"/>

無事ファイルを見つけられたら、エクスプローラーのアドレスバーの右の空白（下の画像の赤い四角の部分）をクリックしてください。

<img src="/images/blog/8/6.png" alt="2" style="max-width: 100%; height: auto;"/>

すると、アドレスバーにあるアドレスを全部選択できます（下の画像みたいになります）。

<img src="/images/blog/8/7.png" alt="2" style="max-width: 100%; height: auto;"/>

全部選択できたら、「Ctrl+C」でコピーします。

ここからは、Windows標準の設定画面を使います。「Windows + I 」でWindows標準の設定画面を開きましょう。
設定画面を開けたら、左のリストにある、「ゲーム」をクリックします。

<img src="/images/blog/8/8.png" alt="2" style="max-width: 100%; height: auto;"/>

次に「ゲームモード」をクリックします。

<img src="/images/blog/8/9.png" alt="2" style="max-width: 100%; height: auto;"/>

「グラフィック」をクリックします。

<img src="/images/blog/8/10.png" alt="2" style="max-width: 100%; height: auto;"/>

すると、いろいろなアプリの一覧が表示されると思います。
そのリストの一番上にある「デスクトップアプリの追加」をクリックしてください。

<img src="/images/blog/8/11.png" alt="2" style="max-width: 100%; height: auto;"/>

エクスプローラーが立ち上がります。先ほどコピーした、フォルダのアドレスを、エクスプローラーのアドレスバーにペーストします（さっきと同じように、アドレスバーをクリックして、「Ctrl+V」をしよう）。

<img src="/images/blog/8/12.png" alt="2" style="max-width: 100%; height: auto;"/>

そしてEnterを押す。
すると、さっき見たマイクラを動かしている「javaw.exe」があるフォルダへ移動します。「javaw.exe」を探して、ダブルクリックで決定しましょう。

<img src="/images/blog/8/13.png" alt="2" style="max-width: 100%; height: auto;"/>

うまくできれば、リスト（ちょっと下にスクロールすると思います）の中に、先ほど選択した「javaw.exe」が追加されると思います。

<img src="/images/blog/8/14.png" alt="2" style="max-width: 100%; height: auto;"/>

追加された「javaw.exe」の項目をクリックすると、設定が変更できるように展開できます。
おそらく、「GPUのユーザー設定」が「Windowsで自動的に選択する」になっているはずです。

<img src="/images/blog/8/15.png" alt="2" style="max-width: 100%; height: auto;"/>

これをクリックして、プルダウンの中から「ハイパフォーマンス（<自分のPCのグラボ名>）」を選択してください。

<img src="/images/blog/8/16.png" alt="2" style="max-width: 100%; height: auto;"/>

このようになればOK!

<img src="/images/blog/8/17.png" alt="2" style="max-width: 100%; height: auto;"/>

作業は以上です！
Minecraftを再起動して、最初と同じ手順で確認をしてみましょう。<br>
以下のように、グラボの型番が表示されれば完了です。これでより快適なMinecraftライフができると思います…！
お疲れ様でした！

<img src="/images/blog/8/18.png" alt="2" style="max-width: 100%; height: auto;"/>

---
## 🐌 最後に：Minecraft関連、色々相談乗ります！

Minecraftってシンプルなゲームの割に、知らない設定があったり、MODやマルチプレイを楽しみたくても意外な壁にぶち当たったり…
理想の楽しみ方をするには意外とハードルが高かったりしますよね…もちろん、その分楽しさは倍増ですけど！笑<br>
なので、何か困ったら僕に声かけていただければ、何かしらのお手伝いができると思います！！

「この🐌、よう知ってんじゃん？」と思ったかたは、ぜひ下記リンクを読んでみてください。

**【✨これから動画投稿・配信を（本気で）やりたい…そんなあなたを応援したい✨】**
https://dendend12345.com/request/

最後まで読んでいただき、ありがとうございましたm(__)m

では、また次回のブログで～。