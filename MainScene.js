/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  // コンストラクタ
  init: function() {
    console.log("MainSceneクラスinit");
    GameMain = this;
    // 親クラス初期化
    this.superInit({
      // アセット読み込み
      assets: ASSETS,
      exitType: "auto",
    });
    this.superInit();
    // 背景
    this.back = Sprite('background').addChildTo(this);
    this.back.setPosition(this.gridX.center(),this.gridY.center());
    this.back.width = SCREEN_WIDTH;
    this.back.height = SCREEN_HEIGHT;
    // プレイヤーオブジェクト
    this.player = Player().addChildTo(this);
    // Xボタンオブジェクト
    this.xbutton();
    // 画面タップ
    // this.onpointstart = function(e) {
    //   console.log(this.xbutton.x + "/" + this.xbutton.y);
    //   // プレイヤー移動
    //   this.player.move(e);
    // };
  },
  // Xボタン描画
  xbutton: function() {
    this.xbutton = Sprite('xbutton').addChildTo(this);
    this.xbutton.setPosition(SCREEN_WIDTH - XBUTTON_SIZE / 2, XBUTTON_SIZE / 2);
    console.log(this.xbutton.x + "/" + this.xbutton.y);
    // Xボタン押下時
    this.xbutton.setInteractive(true);
    this.xbutton.onclick = function() {
      this.exit();
      location.href = HREF;
    }.bind(this);
  }
});
