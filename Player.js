phina.define('Player', {
  superClass: 'DisplayElement',

  init: function(index) {
    this.superInit();
    // 初期位置
    this.targetX = SCREEN_WIDTH / 2;
    this.targetY = SCREEN_HEIGHT / 2;
    // 初期キャラ方向（右）
    this.direction = 1
    // 初期キャラサイズ
    this.charSize = 3.0;
    // スプライトグループ
    this.playergroup = DisplayElement().addChildTo(this);
    // スプライト画像作成
    this.changeSprite('shoot', 50, 46);
    // サイズ変更
    this.sprite.setScale(this.charSize, this.charSize);
  },
  // 画面タップ
  move: function(e) {
    // スプライトパターン（walk）
    this.shoot_sprite_flg = false
    // 移動先を管理する変数
    this.targetX = e.pointer.x;
    if (e.pointer.y < SCREEN_LIMIT) {
      this.targetY = SCREEN_LIMIT;
    } else if ((e.pointer.y > SCREEN_HEIGHT - SCREEN_LIMIT)) {
      this.targetY = SCREEN_HEIGHT - SCREEN_LIMIT;
    } else {
      this.targetY = e.pointer.y;
    }
    // スプライトの向き
    if (this.targetX - this.sprite.x > 0) {
      this.direction = 1  // 右
    } else {
      this.direction = -1  // 左
    }
    this.charSize = 1.5 + 3 * this.targetY / SCREEN_HEIGHT;
    // インク（仮）
    var ink = Sprite('ink', 36, 46).addChildTo(this.playergroup);
    ink.setScale(this.charSize, this.charSize);
    ink.x = this.targetX;
    ink.y = this.targetY;
    // プレイヤープライトを最全面へ
    this.moveFront();
  },
  // 更新
  update: function() {
    // 徐々にタッチした位置に近づける
    this.sprite.moveBy((this.targetX - this.sprite.x) * 0.1, (this.targetY - this.sprite.y) * 0.1);
    // サイズ変更
    this.sprite.setScale(this.charSize * this.direction, this.charSize);
  },
  // スプライトパターン変更
  changeSprite: function(mode, width, height) {
    // スプライト画像作成
    this.sprite = Sprite(mode, width, height).addChildTo(this.playergroup);
    this.sprite.x = this.targetX;
    this.sprite.y = this.targetY;
    // スプライトにフレームアニメーションをアタッチ
    this.sprite.anim = FrameAnimation(mode).attachTo(this.sprite);
    // スプライトシートのサイズにフィットさせない
    this.sprite.anim.fit = false;
    //アニメーションを再生する
    this.sprite.anim.gotoAndPlay(mode);
  },
  // プレイヤースプライトを最前面へ
  moveFront: function() {
    this.playergroup.removeChild(this.sprite);
    this.playergroup.addChild(this.sprite);
  }
});