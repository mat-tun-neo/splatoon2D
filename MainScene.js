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
    this.back = Sprite('background').addChildTo(this);
    this.back.setPosition(this.gridX.center(),this.gridY.center());
    this.back.width = SCREEN_WIDTH;
    this.back.height = SCREEN_HEIGHT;
    // プレイヤーオブジェクト
    this.player = Player().addChildTo(this);
    // 画面タップ
    this.onpointstart = function(e) {
      // プレイヤー移動
      this.player.move(e);
    };
  },
});
