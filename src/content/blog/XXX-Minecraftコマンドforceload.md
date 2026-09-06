---
title: "【Minecraft】コマンドを駆使してタルコフみたいなゲームを作る ～forceloadとschedule編～"
pubDate: 2026-09-30
tags:
  - Minecraft
  - コマンド
  - データパック
draft: true
---

<img src="/images/blog/X/sam.png" alt="" style="max-width: 100%; height: auto;"/>

## こんなゲームがやりたいけどない…じゃあ作ろう！

僕はガンシューティングFPSが大好きです。<br>
敵をばんばん倒すのが大好きです。<br>

でも「これ！」っていうゲームがないんですよね<br>
（ごめんなさい、全ゲーム開発者さん）<br>

なので、自分で作ってみました。<br>
↓　詳細　↓<br>
[「RUN＆GUN EVAC 4096」](https://dendend12345.com/product/%E3%83%A9%E3%83%B3%E3%82%A2%E3%83%B3%E3%83%89%E3%82%AC%E3%83%B3%E3%82%A8%E3%83%90%E3%83%83%E3%82%AF.md/)

<img src="/images/blog/9/1.png" alt="1" style="max-width: 100%; height: auto;"/>

こういう感じね。

開発時間自体は、毎日平均2時間で、1カ月くらいだから…大体60時間？
もちろん、アイデア出したり、構想練ったりする時間はもっともっとありますよ。笑

そんで、開発してる時にコマンドについて色々勉強になったことがあるので、今回と次回の2回に渡って解説してみようと思います。

今回は「forceload」編です！<br><br><br>


# /forceload
---
「常時読み込みするチャンクの追加・解除、リストの表示を行う。」<br>
引用元：（[Minecraft Wiki](https://minecraft.fandom.com/ja/wiki/%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89/forceload)）

とのことです。
すごく簡単に言うと、「チャンクローダー」と呼ばれるものがコマンドで実現できるようになった、ということでしょうか？

基本的な使い方としては、座標を指定して使います。すると、指定した座標が含まれるチャンクが常に読み込み状態になる、ということですね。

このコマンドの主な役割は、トラップや装置や畑などの、常に時間を経過させたい時に使用するのかなと思います。

しかし、今回は全然違う形で活用することになりました。

では、何を実装したいのか説明しておきます。
今回のゲームのメインになるのは

**4000ブロック先にある通信機を修理して脱出する**

ことです。
ただ、このゲームで1つどうしてもこの機能はいれたい！って思ったことがあります。
それ…

**毎回必ず違うシナリオにしたい**

ということです。
どういうことかというと、同じ場所からスタートしても、ゴール地点である通信機は違う場所に出現する、ということです。
一期一会のゲームにしたい！という思いがあります。

ということは、ランダムにゴール地点を出現させなければなりません。

じゃあアーマースタンドをspreadplayersでtpさせて一発じゃーん

と思ってやってみと、全然うまくいかないんですよね。
どこがうまくいかないのかというと、そもそもアーマースタンドがspreadplayersでtpされてくれないんですよ。
killコマンドでタグ付けをしたアーマースタンドをkillしてみようにも、エンティティが見つからんぞ、と言われる始末…

ただ、距離を100ブロックにして同様の処理を行うとうまくできる。
また、一度プレイヤーを4000マス先にtpさせてチャンクをロードし、元の位置に戻り、アーマースタンドをロードしたチャンク内にtpさせたらうまくいきました。killコマンドも成功しました。

この現象を見る限り、tp先のチャンクが生成されているかどうか、、という判断が下せるかと思いました。
環境なのか仕様わかりませんが、こういった現象が起きたということは、配布できたとしても、バグで遊ぶことすらできない！ってことになります。そんなに悲しすぎます。

代替案を思いついたので、早速やっていきましょう！

おさらいですが、バージョンは1.20.1です。randamコマンドはないので、めっちゃパワーでゴリ押ししたコマンドになります笑。
もっとスマートなやり方あれば教えてください。

<br><br><br>

set_escape_place1.mcfunction
```bat
# ①乱数生成
execute as @e[tag=player_pos,limit=1] store result score @s random run data get entity @s UUID[0]
scoreboard players set divide random 360
scoreboard players operation @e[tag=player_pos,limit=1] random %= divide random
execute if score @e[tag=player_pos,limit=1] random matches ..-1 run scoreboard players add @e[tag=player_pos,limit=1] random 360

# ②アマスタの向きを変える
execute as @e[tag=player_pos,limit=1] store result entity @s Rotation[0] float 1 run scoreboard players get @s random

# ③プレイヤーの向きを変える
execute at @e[type=armor_stand,tag=player_pos,limit=1] run tp @s ~ ~ ~ ~ ~

# ④プレイヤーをtp
execute at @s anchored eyes run tp @s ^ ^120 ^4000

# ⑤強制読み込み開始
execute at @s run forceload add ~ ~ ~ ~ 

# ⑥ゴール地点の設定ファンクション2の実行
schedule function denden_escape:escape/start/set_escape_place2 200t
```

set_escape_place2
```bat
# ⑦ゴールマーカー召喚
execute at @p run summon armor_stand ~ ~ ~ {Tags:["goal_marker"],Invisible:1b,CustomName:'""',NoGravity:1b}

# ⑧プロセスファンクション0の実行
schedule function denden_escape:escape/start/schedule/process0 300t
```

process0.mcfunction
```bat
# ⑨地面の上にtp
execute as @e[tag=goal_marker,limit=1] at @s positioned over world_surface run tp @s ~ ~ ~

# ⑩通信機を設置
execute as @e[tag=goal_marker,limit=1] at @s run setblock ~ ~ ~ minecraft:lodestone
execute as @e[tag=goal_marker,limit=1] at @s run setblock ~ ~1 ~ minecraft:dispenser[facing=north]
execute as @e[tag=goal_marker,limit=1] at @s run setblock ~ ~2 ~ minecraft:iron_bars
```

大事そうなところだけピックアップして説明していきますね。
まず、考え方としては「プレイヤーをtpして、チャンク読み込みを確実にする」というものです。

アマスタをtpしてもチャンク読み込みが発生してくれないのなら、プレイヤーがいけばいいじゃないか！という発想です。
ただ、プレイヤー