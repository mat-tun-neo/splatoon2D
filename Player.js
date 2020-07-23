phina.define('Player', {
  superClass: 'DisplayElement',

  init: function(index) {
    console.log("Playerクラスinit");
    this.superInit();
    // 初期位置
    this.targetX = SCREEN_WIDTH / 2;
    this.targetY = SCREEN_HEIGHT / 2;
    // 初期キャラ方向（左:-1,右:1）（上:-1,下:1）
    this.direction_x = 1
    this.direction_y = 1
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
    // スプライトの向き（左右）
    if (this.targetX - this.sprite.x > 0) {
      this.direction_x = 1  // 右
    } else {
      this.direction_x = -1  // 左
    }
    if (this.targetY - this.sprite.y > 50) {
      this.direction_y = 1  // 上
    } else if (this.targetY - this.sprite.y < -50) {
      this.direction_y = -1  // 下
    } else {
      this.direction_y = 0
    }
  },
  // 更新
  update: function(app) {
    // 徐々にタッチした位置に近づける
    var xDiff = this.targetX - this.sprite.x;
    var yDiff = this.targetY - this.sprite.y
    this.sprite.moveBy(xDiff * 0.08, yDiff * 0.05);
    // インク
    this.charSize = 1.5 + 3 * this.sprite.y / SCREEN_HEIGHT;
    if (app.frame % 3 == 0 && Math.abs(xDiff) > 0.2 && Math.abs(yDiff) > 0.2) {
      console.log(this.sprite.x + "/" + this.sprite.y + '/経過フレーム数：' + app.frame);
      var ink = Sprite('ink', 36, 46).addChildTo(this.playergroup);
      ink.setScale(this.charSize, this.charSize);
      ink.x = this.sprite.x + this.direction_x * 80;
      ink.y = this.sprite.y + this.direction_y * 80; 
      // プレイヤースプライトを最全面へ
      this.moveFront();
    }
    // サイズ変更
    this.sprite.setScale(this.charSize * this.direction_x, this.charSize);
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