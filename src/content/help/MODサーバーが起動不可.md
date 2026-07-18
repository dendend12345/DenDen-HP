---
title: "せっかく「Mine and Slash」と「dungeon_realm」で建てたMODサーバーが起動しない！"
helpPubDate: 2026-07-18
tags:
  - Minecraft
  - MOD
  - サーバー
draft: false
---

### ご相談者様
Secret KinoN様<br>
https://x.com/FloraK1n0n<br>
FPSゲーム中心のクランに所属されている方なので、FPS好きはようちぇけ<br>
https://youtube.com/@sniperssecret?si=Ui2hvWBW0PsRl_Yg

### ご相談内容
せっかく建てたMODサーバーに入れない！「Mine and Slash」と「Ancient Obelisks」

---

結論から言うと「導入MODの不足」が原因でした。<br>
よくあると言えばそうなんですが、今回の場合ははちょっとした罠？がありました。<br>

導入したいMODは「Mine and Slash」と「Ancient Obelisks」というMODでした（その他たくさん導入しておられました）。これらのMODは前提として「Library of Exile」というMODが必要になります。

「Mine and Slash」<br>
https://www.curseforge.com/minecraft/mc-mods/mine-and-slash-reloaded<br>
「Ancient Obelisks」<br>
https://www.curseforge.com/minecraft/mc-mods/ancient-obelisks<br>
「Library of Exile」<br>
https://www.curseforge.com/minecraft/mc-mods/library-of-exile

これらをきちんと導入した状態でいざ起動！といきたかったのですが、こんなログが。

```
Mod ID: 'dungeon_realm', Requested by: 'mmorpg', Expected range: '[1.1.8,)', Actual version: '[MISSING]'
Mod ID: 'ancient_obelisks', Requested by: 'mmorpg', Expected range: '[1.2.3,)', Actual version: '[MISSING]'
```

これだけ読めば「mmorpg」という機能（MODではなさそう、なんやろ）がdungeon_realmの"1.1.8"以上と、ancient_obelisksの"1.2.3"以上を必要としている、と読み取れます。つまり、導入するMODのちゃんと入れなさいってことですね。

なんだ、ちゃんと読めばわかるじゃないか、と "今" 思いました。<br>
お恥ずかしながら、ご相談中は逆、つまりancient_obelisksとdungeon_realmがmmorpgを必要としている、と勘違いしてしまっていました。。mmorpgなんてファイル名のMODなんて存在しないのに必死に探していました…笑

でもおかしいな…MOD入れてたはずなんだけど、なぜMISSINGになるんだ…ここが沼でしたね…

そして他にも奇妙な点が…<br>
今回のサーバーはConoHa VPSのMinecraft専用の契約をして構築していたものでした。なのでMODはConohaのコンソールからファイルを選択して、アップロードができる状態でした。
しかし、そのアップロード挙動が不安定。アップロードできたりできなかったり…
この状態を受けて、ご相談者様は事前にWinSCPでのアップロードも試みていたみたいですが、それでもアップロードができたりできなかったり…
うーん、サーバーの健康状態があまりよくなかったのかな。。

ここで僕が考えた解決策が、シンプルに別の方法でアップロードをする、というものです。とはいっても色々やり方があるし、いろんなソフトがある中でどう選別したかというと、まずは「データ転送プロトコルを変える」というところに視点を向けました。

ブラウザ経由でデータ転送をするときは「HTTP」もしくは「HTTPS」、WinSCPの場合は「SFTP」が標準です。
じゃあ他のなにがいいかな～って思った時に真っ先に思いついたのは、使い慣れている「Teraterm」でした。Teratermは「SSH」というプロトコルで、ブラウザ経由ともWinSCPとも違うプロトコルでデータ転送をします。とりあえずこれで試してみるか～と思ってやってみたところ、すんなりできました（もちろん、ConohaのコンソールでSSHを有効にして）。

なんか腑に落ちませんが、とりあえずアップロードできたっぽいので、サーバーを起動してみると、どうもうまくいったみたい。

あとはクライアント側の設定をして、、と思っていたのですがここでも躓き…
あーでもこーでもない、とやっているうちに、なんか直りました。なんか。うん。。
おそらく、ご相談者様がぽちぽちとクライアントのMODのアップデートをしていたので、今思えばそれがトリガーだったのかなと。。
ひとまず解決ということで、今回のご相談は幕を閉じました。

ちなみに、気になってAncient Obelisksについて後日検証したのですが、クライアントサイドにはAncient ObelisksとLibrary of Exile両方ないと起動できない、という状態（これは納得）でしたが、サーバーサイドはLibrary of Exileがなくてもサーバー起動しちゃったんですね。もちろん、両方入ってても問題はなかったです。気になるのは、Library of Exileがクライアントサイドでしか認識されない、という現象でした。
curseforgeを眺めてもそんな記載は一切なく、こういうこともあるんだなぁと、学びました。<br>
※Geminiによれば、Library of Exileも入れておかないとまずいぞ、という意見でしたが、真相はいかに…実際にプレイしてチャンクの読み込みやアイテム取得などしてみないとわかりませんね。。<br><br>

---

## 🐌 最後に：サーバーの困ったを解決します！

せっかくサーバー契約したのに、遊べないよ～ﾋﾟｴﾝ…ってなっちゃってる人は、ひとまず僕に相談してみてください。理由はよくわかんないけど、なんか直った！みたいなことがあるかもしれないですよ（ちゃんと原因究明は真面目にしますよ！安心して！）。

※ご相談にあたり、解決した場合は謝礼をいただけますと、、いただけますと…幸い…です。。

下記から気軽にご相談くださいませm(__)m

Mail : 2dendendend2@gmail.com<br>
X：[dendend12345](https://x.com/dendend12345)<br>
Discord : dendend12345<br>
※Discordでご連絡の場合は、フレンド申請とともにメッセージ送信もお願いいたします。<br>

※この記事は、ご相談者様の許可を頂いて掲載をしております。
