---
title: "【Minecraft】大量のBotを使ってG1GCの最高の設定を探ってみる"
pubDate: 2026-07-20
tags:
  - Minecraft
  - G1GC
  - サーバー
draft: false
---

<img src="/images/blog/6/sam.png" alt="G1GCについてBotで検証" style="max-width: 100%; height: auto;"/>

## Minecraft PaperサーバーのG1GCはどこまでできるのか

Minecraftサーバー管理者の皆さーん<br>
サーバーを建てるときには何を使ってますか？

最近はPaperが多いのかな<br>
「Minecraft サーバー建て方」って調べてると結構な割合でPaperが紹介されている気がします。前はそんなことなかったのに…時代の変化、かな（しんみり）。。

では、起動コマンドはどうしてますか？

色々な解説サイトを見てみると、割とオプションなしの起動コマンドを紹介している気がします。<br>
多くの方は、まあ公式のjarファイルより快適に動けばいいか、プラグインが入ればいっか、みたいな感じかと思っています（知らんけど）。

## で　す　が

大規模サーバーの管理者からしたらそうはいきません。
まあ、サーバー管理者はもうとっくに卒業しているんですが笑。

より快適に、軽量に、パフォーマンスを最大限に引き出そうと、日々必死にもがいています。<br>
ネットでは起動オプションであれがいいだの、これがいいだの、、色々な議論がされていて、いろんな検証がされていて…

最近ブログを書くようになってから、今までやってきたことを振り返ってみると結構面白いことをしてきたなと思いつつ、久しぶりに色々と検証してみたくなりました。

今回は、Botを大量に出すプログラムを使って、G1GCの力を最大限に発揮できる起動コマンドを作ってみることにします。<br>
※このプログラムをくれた黄色いひよこに感謝🐤


今回の記事は、多分めっちゃ長いです。なので、最初に結論をまとめます。「とりあえずサーバーが軽くなればいい！」ってだけの人は、最初の結論だけ読めば大丈夫です。<br>
なぜこれで軽くなるの？GCのオプションについて知りたいって人は、ぜひ最後まで読んでみてください（それでも全部は紹介しきれませんが…）。<br>
※環境やバージョンについてはきちんと確認をしてください。<br><br>

---

### 【結論】今回得られた一番いいパフォーマンスを出せるかもしれない起動コマンド

```bat
java -Xmx8G -Xms8G -XX:+UnlockExperimentalVMOptions -XX:+AlwaysPreTouch -XX:+DisableExplicitGC -XX:+ParallelRefProcEnabled -XX:+PerfDisableSharedMem -XX:+UseG1GC -XX:G1HeapRegionSize=8M -XX:G1HeapWastePercent=5 -XX:G1MaxNewSizePercent=40 -XX:G1MixedGCCountTarget=4 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1NewSizePercent=30 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:G1ReservePercent=15 -XX:InitiatingHeapOccupancyPercent=15 -XX:MaxGCPauseMillis=200 -XX:MaxTenuringThreshold=1 -XX:SurvivorRatio=32 -jar paper-1.21.1-133.jar
```
<br>

### 環境
**CPU**<br>
Core i5 12400 2.5GHz

**メモリ**<br>
32GB Hz

**ストレージ**<br>
SSD（NVMe）
1TB 

**OS**<br>
Ubuntu 24.04 LTS

**Minerfaft Version**<br>
1.21.1

**監視用ツール**<br>
Prometheus & Grafana<br>
Spark

**起動構成メモリ**<br>
8GB固定

**プレイヤー人数**<br>
目標100人<br>

**プレイヤーの動き**<br>
ちょこちょこ動き回る程度

**サーバープロパティ**<br>
負荷をかけるために描画距離（View Distance）を10→20に変更

<br>

検証では上記のように検証を進めますが、サーバー構築方法や各種ツールの導入方法については紹介しません。気分が乗れば、いつか紹介します。  

---

⚠️**以下注意です**⚠️

・この記事の環境では、自宅/ローカル環境でPaperサーバーの負荷検証をしたものです。<br>
・Botは検証用で、他のサーバーで用いておりません。<br>
・表示上の同時接続数は検証用Botによるもので、実プレイヤー数ではありません。<br>
・Mojangの公式検証ではありません。<br>
・🐌の環境での検証になります。皆さんの環境とは異なる可能性があります。<br>

---

### 観察すべき場所
今回の検証では、以下のことを観察要点として進めていきます。<br>
**・TPSの数値はどのくらいか**<br>
※TPSの測定はマイクラ内の「/tps」で観察しています。<br>
**・Tickrateはどのくらいか**<br>
**・GC時間が長いかどうか**<br>
**・GCの起こる頻度が高いかどうか**<br><br>

大変ごめんなさいなのですが、これらを観察すると良いとされる情報ソースを思い出せないです…Full GCを絶対に起こさせないことは過去に運営をしていた時の記憶であったのですが、それ以外はGeminiにアドバイスをもらいました。

---

## Bot導入

まずは、30体Botを出してみます。

<img src="/images/blog/6/1.png" alt="1" style="max-width: 100%; height: auto;"/>

ほーこんな感じになるのね。
楽しくなってきた。

## 検証開始！

### １．オプションなしの起動

```bat
java -Xmx8G -Xms8G -XX:+UseG1GC -jar paper-1.21.1-133.jar
```

起動時間：30秒程度

**Bot　50体**

<img src="/images/blog/6/2.png" alt="2" style="max-width: 100%; height: auto;"/>

GCは定期的に起きているけど、GC時間も特に大きくなく、TPSも20張り付き。この人数なら可もなく不可もなくといった感じです。

<br>

**Bot　75体**

<img src="/images/blog/6/3.png" alt="3" style="max-width: 100%; height: auto;"/>

GCが定期的に発生し、GC時間も大きく増えている。TPSは20維持ではあるものの、ちょっと不安な感じ。

<br>

**Bot　100体**

<img src="/images/blog/6/4.png" alt="4" style="max-width: 100%; height: auto;"/>

GC時間が長くないとはいえ、GCがかなり発生していることが分かる。TPSも15前後をうろうろしていて、快適にプレイできる状態とは言えない。
ちなみにBotが100体になると結構圧巻です笑。

<br>

<img src="/images/blog/6/5.png" alt="5" style="max-width: 100%; height: auto;"/>
※Bot100体の様子

### ２．公式のおすすめ

```bat
java -Xmx8G -Xms8G -XX:+AlwaysPreTouch -XX:+DisableExplicitGC -XX:+ParallelRefProcEnabled -XX:+PerfDisableSharedMem -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1HeapRegionSize=8M -XX:G1HeapWastePercent=5 -XX:G1MaxNewSizePercent=40 -XX:G1MixedGCCountTarget=4 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1NewSizePercent=30 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:G1ReservePercent=20 -XX:InitiatingHeapOccupancyPercent=15 -XX:MaxGCPauseMillis=200 -XX:MaxTenuringThreshold=1 -XX:SurvivorRatio=32 -jar paper-1.21.1-133.jar
```
起動時間：10秒程度

公式サイトは以下。<br>
https://fill-ui.papermc.io/projects/paper/version/1.21.1<br>
こちらに記載されているのは、「Aikar's Flags」と呼ばれる最適化設定がされているものです。

**オプション解説(Geminiまとめ)**<br>
-XX:+AlwaysPreTouch<br>
JavaVM起動時に確保したメモリ（ページ）すべてに触りに行く。全メモリに触りに行くので起動時のオーバーヘッドはそれなりにかかる(気になるほどではない気がした)。

-XX:MaxGCPauseMillis=200<br>
1回のGCによる停止時間の目標を200ミリ秒以内に設定。プレイヤーが体感できるレベルの大きなラグ（スパイク）の発生を抑える。

-XX:InitiatingHeapOccupancyPercent=15<br>
old領域（データが溜まる領域）のメモリ使用率が15%に達した時点で、バックグラウンドでのGC準備（マーク処理）を開始。

-XX:+ParallelRefProcEnabled<br>
オブジェクトの参照処理をマルチスレッド（並列）で実行。メモリの枯渇を防ぐための予備領域（バッファ）を20%確保し、急激なメモリ消費があっても、GCが間に合わずにサーバーがクラッシュするのを防ぐ。

<br>

**Bot　100体**

<img src="/images/blog/6/6.png" alt="6" style="max-width: 100%; height: auto;"/>

GCの発生頻度がオプションなしと比べて下がり、TPSも18前後と改善されている。プレイしていても耐えられるぐらいではあるが、管理者としてはやはりTPS20を維持したいところ。

<br>

### ３．Geminiおすすめ

```bat
java -Xmx8G -Xms8G -XX:+UnlockExperimentalVMOptions -XX:+AlwaysPreTouch -XX:+DisableExplicitGC -XX:+ParallelRefProcEnabled -XX:+PerfDisableSharedMem -XX:+UseG1GC -XX:G1HeapRegionSize=8M -XX:G1HeapWastePercent=5 -XX:G1MaxNewSizePercent=40 -XX:G1MixedGCCountTarget=4 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1NewSizePercent=30 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:G1ReservePercent=15 -XX:InitiatingHeapOccupancyPercent=20 -XX:MaxGCPauseMillis=200 -jar paper-1.21.1-133.jar
```
起動時間：10秒程度

す、すみません、、知識不足なのでAI使わせてください…（もう使ってる）

**改善点(Geminiまとめ)**<br>
-XX:MaxTenuringThreshold=1 と -XX:SurvivorRatio=32 の削除を検討<br>
近年のJVMは、生存世代の動的調整（ヒューリスティック）が非常に優秀。これらを無理に固定すると、かえってG1GCが柔軟にメモリを処理できなくなり、短寿命オブジェクトが老齢代（Old）に溢れてミックスGCの頻度が増える原因になることがある。

-XX:+UnlockExperimentalVMOptions<br>
現在指定されている他のオプション（G1MixedGCLiveThresholdPercent など）の多くは、すでに実験的（Experimental）ではなく標準の製品フラグ（Product Flags）に格上げされている。そのため、環境によってはこの解放フラグ自体が不要。

-XX:InitiatingHeapOccupancyPercent=15 (IHOP) の調整<br>
状況: 15%という設定は、かなり早い段階からバックグラウンドでGCを回す設定。これによりCPU使用率のベースが少し上がる。<br>
改善: 「メモリは余裕があるのに、常時CPU負荷が高い」と感じる場合は、20〜30 あたりまで引き上げることで、CPUの無駄遣いを抑えられる。

-XX:G1ReservePercent=20<br>
状況: 20%（8GB中の約1.6GB）を完全に「予備」としてロックしている。<br>
改善: プラグインが非常に多く、実際に使えるメモリ（Heap）が実質6.4GBになって圧迫されている場合は、15 に下げることで、通常利用できる枠を広げることができる。

<br>

**Bot　100体**
<img src="/images/blog/6/7.png" alt="7" style="max-width: 100%; height: auto;"/>
GC時間は変わらないが、GCの回数が増えてしまった。TPSも17前後とあまり良くない様子。

<br>

### ４．Gemini改善案

```bat
java -Xmx8G -Xms8G -XX:+UnlockExperimentalVMOptions -XX:+AlwaysPreTouch -XX:+DisableExplicitGC -XX:+ParallelRefProcEnabled -XX:+PerfDisableSharedMem -XX:+UseG1GC -XX:G1HeapRegionSize=8M -XX:G1HeapWastePercent=5 -XX:G1MaxNewSizePercent=40 -XX:G1MixedGCCountTarget=4 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1NewSizePercent=30 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:G1ReservePercent=15 -XX:InitiatingHeapOccupancyPercent=15 -XX:MaxGCPauseMillis=200 -XX:MaxTenuringThreshold=1 -XX:SurvivorRatio=32 -jar paper-1.21.1-133.jar
```
起動時間：10秒程度

**改善点(Geminiまとめ)**<br>
-XX:MaxTenuringThreshold=1 と -XX:SurvivorRatio=32 の復活<br>
これで「3_100Bots」で発生していた30秒周期の規則的なGCスパイクを抑制し、パケットなどのゴミを最速で処理させます。

InitiatingHeapOccupancyPercent=15 に戻す<br>
メモリが1.2GB程度まで溜まった段階（15%）から、G1GCに目立たないように少しずつ裏で掃除を開始させる。

G1ReservePercent=15 のみ維持<br>
ここだけは元の20%から15%に削ったままにしている。これにより、実質利用可能なヒープを広げ、100人ログイン時のメモリ圧迫を防ぐ。

<br>

**Bot　100体**
<img src="/images/blog/6/8.png" alt="7" style="max-width: 100%; height: auto;"/>

GCの頻度が下がり、GC時間もほぼ0に。TPSも20もTickrateも20を維持し、今回の中で一番いいパフォーマンス。

---
## 検証結果

もう最初に述べてはいるんですが、4つ目のGemini改善コマンドが一番良かったかもしれません。個人的には、もっと自分に知識があれば、このオプションをいれたらどうなるか、逆に抜いたらどうなるのか、事細かに検証できたのになって思います。あとは単純に記事が長くなりすぎるので、一旦今回はここまで。ZGCと対決させるっていう当初の予定だったのが、まさかG1GCでここまで書けるとは…

ということで、いつか今回の検証で一番いいパフォーマンスを出した起動コマンドと、ZGCを使った起動コマンドを対決させようと思います！

---
## 🐌 最後に：サーバー構築運用承ります！

これでもちょっと前（5年、いやもっと前か…）は50人くらい入ってコマンドも動かせるサーバーの管理をしてました。なので、多少なりとも困っている人のお力になれればと～！

「この🐌、頑張り屋さんじゃん？」と思ったかたは、ぜひ下記リンクを読んでみてください。

**【✨これから動画投稿・配信を（本気で）やりたい…そんなあなたを応援したい✨】**
https://dendend12345.com/request/

最後まで読んでいただき、ありがとうございましたm(__)m

では、また次回のブログで～。
