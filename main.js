// グローバルに展開
phina.globalize();
// アセット
var ASSETS = {
  // 画像
  image: {
    'walk': 'https://ayu-study.com/wp-content/uploads/2020/05/walk3646.png',
  },
  // スプライトシート
  spritesheet: {
    "walk_ss":
    {
      // フレーム情報
      "frame": {
        "width": 36, // 1フレームの画像サイズ（横）
        "height": 46, // 1フレームの画像サイズ（縦）
        "cols": 10, // フレーム数（横）
        "rows": 1, // フレーム数（縦）
      },
      // アニメーション情報
      "animations" : {
        "walk": { // アニメーション名
          "frames": [0,1,2,3,4,5,6,7], // フレーム番号範囲
          "next": "walk", // 次のアニメーション
          "frequency": 2, // アニメーション間隔
        },
      }
    },
  }
};
/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  // コンストラクタ
  init: function() {
    // 親クラス初期化
    this.superInit();
    // 背景
    this.backgroundColor = 'blue';
    // スプライト画像作成
    var sprite = Sprite('walk', 36, 46).addChildTo(this);
    // スプライトにフレームアニメーションをアタッチ
    var anim = FrameAnimation('walk_ss').attachTo(sprite);
    // アニメーションを指定する
    anim.gotoAndPlay('walk');
    // スプライトシートのサイズにフィットさせない
    anim.fit = false;
    //アニメーションを再生する
    anim.gotoAndPlay('walk');
    // サイズ変更
    sprite.scaleX *= 3
    sprite.scaleY *= 3
    // 初期位置
    sprite.x = this.gridX.center();
    sprite.y = this.gridY.center();
    // 移動先を管理する変数
    var targetX = sprite.x;
    var targetY = sprite.y;
    // タッチ開始
    this.onpointstart = function(e) {
      // 移動先を設定
      targetX = e.pointer.x;
      targetY = e.pointer.y;
    };
    // 更新イベント
    this.update = function(app) {
      var x = targetX - sprite.x
      var y = targetY - sprite.y
      // スプライトの向き
      if (x > 0) {
        sprite.scaleX = Math.abs(sprite.scaleX); // 右（初期）
      } else {
        sprite.scaleX = Math.abs(sprite.scaleX) * (-1); // 左
      }
      // 徐々にタッチした位置に近づける
      sprite.moveBy(x * 0.1, y * 0.1);
    };
  },
});
/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    // MainScene から開始
    startLabel: 'main',
    // アセット読み込み
    assets: ASSETS,
  });
  // fps表示
  //app.enableStats();
  // 実行
  app.run();
});