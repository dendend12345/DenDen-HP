---
title: "なんで誰も教えてくれなかったんだ！ ～アーマースダンドにrideできるじゃん～"
pubDate: 2026-06-22
tags:
  - Minecraft 
  - コマンド
  - rideコマンド
---

## 何で誰も教えてくれなかったんだ…(自分で気づけよ)

※Java版 バージョン1.20.4の話です

いつだったかね、MinecraftでAPEXのアビリティやウルトを再現したデータパックを開発して、配布していたことがあるんですよ。

ちなみにコチラ<br>
https://www.minecraftpanilla.com/contents/dendens_apex_datapack.html

その中の1つに、ゲーム「APEX Legends」のオクタンのウルト、ジャンプパッドを再現したものがありました。しかし、その出来はイマイチでした。僕も「うーん、及第点」と思いながら公開したんですよね。
そして、そして最近、ふと思い出してしまいまして、どうにか改良できないかと思い、数年ぶりにそのファイルを開いたわけです。

<img src="/images/blog/2/code.png" alt="code" style="max-width: 100%; height: auto;"/>

うおー、当時の自分頑張ってますね～。

そんで、このデータパックを動かすとこんな感じになるわけですね。

<img src="/images/blog/2/before.gif" alt="code"  style="max-width: 100%; height: auto;"/>

んーなんだかカクカクしてますね。。
中身のコマンドを見ていただきたいのですが

```bat
：
#X方向、プレイヤー-アマスタの値をMotionに代入
execute as @a[scores={jumping=1..}] at @s store result entity @e[tag=jump_as,sort=nearest,limit=1] Motion[0] double 0.05 run scoreboard players operation @s jump_padX_as -= @s jump_padX
#Y方向、規定値xxxをMotionに代入
execute as @a[scores={jumping=1..}] at @s store result entity @e[tag=jump_as,sort=nearest,limit=1] Motion[1] double 0.05 run scoreboard players get @s jump_padY
#Z方向、プレイヤー-アマスタの値をMotionに代入
execute as @a[scores={jumping=1..}] at @s store result entity @e[tag=jump_as,sort=nearest,limit=1] Motion[2] double 0.05 run scoreboard players operation @s jump_padZ_as -= @s jump_padZ
：
#プレイヤーをアマスタjumpingにtp
execute at @e[tag=jumping] run tp @p[sort=nearest] ~ ~ ~
```

このようになっています。
ざっくり解説をすると、アーマースタンドのMotionに色々計算した結果を代入して、飛んでったアーマースタンドにプレイヤーをtpしてる、という感じになります。

問題なのはtpです。素早く動いているアーマースタンドに追いつくために何度もtpをしようとすると、カクついてしまうようです。
ここが及第点のポイントなんですよ。ここが滑らかに動いてくれたら正直80点くらいあげたいです（残りの20点はマルチ対応）。

これを数年ぶりに改善しようと、重い腰を上げました。

色々調べていく中で、スパイダーマンみたいにグラップリングフックを再現した方をお見掛けして、ちょろっと解説を見たところ、豚さんにrideさせているようでした。
その手があったか！と思って実践してみたところ、全然うまくいかず…格闘すること約３日
もう無理かもな～と思って頼みの綱に聞いてみました。

🐌「これどうにかできないかな、Geminiくん」

と、色々壁打ちしてみた結果

---

**Gemini**<br>
もし将来、またオクタンのジャンプパッドを実装したくなったときは、「豚（Mob）」を使うのを完全に諦めて、中身が空っぽの「防具立て（Armor Stand）」にプレイヤーを乗せるというルートを試してみてください。

---

およ？

え？

アーマースタンドにrideができる…？

<img src="/images/blog/2/armorstand.png" alt="code" style="max-width: 100%; height: auto;"/>

マジか…
い、いつからできるようになったんだ…

とおもって、公式ドキュメントの歴史（下のページに記載されているアップデート履歴）を見てみると

**全然それらしいことは載っていませんでした**

そりゃ気が付かないですよ…（リサーチ下手なだけかも）
でもでも、「ride　アーマースタンド」って調べてもそれっぽい記事でてこなかったし

🐌「いつから実装されたの？」

---

**Gemini**<br>
防具立てにプレイヤーが乗れるようになったのは、まさに🐌さんが今使っているバージョン、1.20からです。

---

へぇ～ってわかったところで、いざ実践。

Motionに代入するところは同じとして、tpの箇所をrideにしてみました。

```bat
#プレイヤーをアマスタjumpingにride
execute as @a[scores={jumping=1..}] at @s run ride @s mount @e[tag=jumping,sort=nearest,limit=1]
```

結果

<img src="/images/blog/2/after.gif" alt="after" style="max-width: 100%; height: auto;"/>

gifだとちょっとわかりにくいですが、かくつきは明らかに改善されています。
これで解決です、よかったよかった。

そんで、さらに深堀した内容なんですけど、もう一歩踏み込んだ内容をGeminiさんは言っています。

---

**Gemii**<br>
防具立て（Armor Stand）だけでなく、なんとアイテムのドロップ（Item）や矢（Arrow）、果てはブロックのディスプレイエンティティなど、ほぼ全てのエンティティ同士を無理やり重ねて乗せることができるようになりました。

---

**まじか・・・**

え、待って。エンティティ全部にできるとなると

<img src="/images/blog/2/arrow.png" alt="code" style="max-width: 100%; height: auto;"/>

矢

<img src="/images/blog/2/itemframe.png" alt="code" style="max-width: 100%; height: auto;"/>

額縁

おうおう…これはすごい

ってことは、summonで出した額縁が消えるまでの時間（5~6秒？）だけ、rideさせることもできるし、放った矢の軌道も簡単に追従できるじゃないですか。

世紀の大発見ですね（遅い）

---
## 🐌 最後に：データパック開発、丸投げで承ります！

いまさらかよ！って言われそうですが、データパック開発が今まで以上に楽しくなりそう。しばらく手を付けてなかったけど
（1.20.5で記憶が止まってる…）、最新のコマンドがっつり使ってなんか作ろうかな・・・

ということで、データパックやプラグインを使ったゲーム作りの依頼承ってます（突然）

「この🐌、なかなかやるじゃん？」と思ったかたは、ぜひ下記リンクを読んでみてください。

**【✨これから動画投稿・配信を（本気で）やりたい…そんなあなたを応援したい✨】**
https://dendend12345.com/request/

最後まで読んでいただき、ありがとうございましたm(__)m

では、また次回のブログで～。