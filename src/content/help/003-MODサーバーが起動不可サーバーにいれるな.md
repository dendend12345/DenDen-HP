---
title: "MODパックサーバーが起動しない ～それ、サーバーにいれちゃいけない編～"
helpPubDate: 2026-09-10
tags:
  - Minecraft
  - MOD
  - サーバー
draft: false
---

### ご相談者様
月城まろ@白髪褐色堕天使V様<br>
X：https://x.com/tukishiro_maro

### ご相談内容
サーバーが起動しない！なんで！？
---

### 環境
LOLIPOP<br>
Forgeテンプレート

---

さて、今回もお困りの方を見つけてしまいました（もはや義務）

お困りの内容はこちら

[MODサーバーいれまくったら、サーバーが起動しない！！！](https://x.com/tukishiro_maro/status/2097533612010946567?s=20)

内容を見る限り、なにやらMODをたくさん入れてらっしゃるみたいですね。<br>
これは普通にlogのおいかけっこになりそうです…

とりあえず、logを見せていただくと…？

```bat
[09Sep2026 11:55:39.100] [modloading-worker-0/ERROR] [net.minecraftforge.fml.javafmlmod.FMLModContainer/LOADING]: Failed to create mod instance. ModID: oculus, class net.irisshaders.iris.Iris
```

ほうほう、よくあるパターンですね。

**「Failed to create mod instance. ModID: oculus」**<br>
大事なのはここ。

oculusちゃんが、「このMODのインスタンスが作れねえ！！」って言ってます。
oculusはクライアントのMODなので、サーバーに入れちゃいけないんですよね…

なので、oculusを抜いて再起動。。

しかし、またしても起動せず…
さて、次のエラーは…

```bat
[09Sep2026 12:13:15.812] [modloading-worker-0/ERROR] [net.minecraftforge.fml.javafmlmod.FMLModContainer/LOADING]: Failed to create mod instance. ModID: accessible_step, class co.secretonline.accessiblestep.forge.AccessibleStepForge
 :
[09Sep2026 12:13:17.604] [modloading-worker-0/ERROR] [net.minecraftforge.fml.javafmlmod.FMLModContainer/LOADING]: Failed to create mod instance. ModID: freecam, class net.xolt.freecam.Freecam
```

今度は2つ連発！！
「accessible_step」と「freecam」が「インスタンス建てれない；；」って泣いてます。<br>
なのでこれもサーバー側のmodsファイルから消してあげましょう！

そしてついに…
起動確認OK！！

無事解決・・・！

良かった～これでマイクラできますね、大変良き🙌

MODの余分なMODが入っていたって感じでしたね。あるあるなくせに灯台下暗しな内容です。

---

## 🐌 最後に：サーバーの困ったを解決します！

MODたくさんいれた状態で、エラー吐かれると「うーわ、終わった～原因わからねえ～」ってなりがちですよね…僕も最初のころはめっちゃ苦戦した記憶があります。<br>
MODの競合的なのとか知らねーよ！！って方は、一旦ね…一旦僕に聞いてみてください。解決してみます…！！

良ければ ↓ からどうぞ！

Mail : 2dendendend2@gmail.com<br>
X：[dendend12345](https://x.com/dendend12345)<br>
Discord : dendend12345<br>
※Discordでご連絡の場合は、フレンド申請とともにメッセージ送信もお願いいたします。<br>

※この記事は、ご相談者様の許可を頂いて掲載をしております。