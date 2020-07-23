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
    this.sprite.x = SCREEN_WIDTH / 2;
    this.sprite.y = SCREEN_HEIGHT / 2;
    // サイズ変更
    this.sprite.setScale(this.charSize, this.charSize);
    // ドラッグ可とする
    this.sprite.draggable;
    this.initialPosition = this.sprite.draggable.initialPosition;
    this.initialPosition.x = this.sprite.x;
    this.initialPosition.y = this.sprite.y;

    // ドラッグ動作の種類
    this.easingMode = "linear";
},
  // キャラ移動
  move: function(p, app) {
    // スプライトパターン（walk）
    this.shoot_sprite_flg = false
    // 移動先を管理する変数
    // スプライトの向き（左右）
    if (p.x - this.sprite.x > 0) {
      this.direction_x = 1  // 右
    } else {
      this.direction_x = -1  // 左
    }
    if (p.y - this.sprite.y > 50) {
      this.direction_y = 1  // 上
    } else if (p.y - this.sprite.y < -50) {
      this.direction_y = -1  // 下
    } else {
      this.direction_y = 0
    }
    // インク
    this.charSize = 1.5 + 3 * this.sprite.y / SCREEN_HEIGHT;
    var xDiff = this.sprite.x - p.x;
    var yDiff = this.sprite.y - p.y;
    if (app.frame % 2 == 0 && Math.abs(xDiff) > 0.2 && Math.abs(yDiff) > 0.2) {
      //console.log(this.sprite.x + "/" + this.sprite.y + '/経過フレーム数：' + app.frame);
      var ink = Sprite('ink', 36, 46).addChildTo(this.playergroup);
      ink.setScale(this.charSize, this.charSize);
      ink.x = this.sprite.x + this.direction_x * 20;
      ink.y = this.sprite.y + this.direction_y * 20; 
      // プレイヤースプライトを最全面へ
      this.moveFront();
    }
    // サイズ変更
    this.sprite.setScale(this.charSize * this.direction_x, this.charSize);
  },
  // 更新
  update: function(app) {
    // タッチ・カーソルの位置を取得
    const p = app.pointer;
    // ボタンの位置でない場所がタッチ・クリックされた場合
    if (p.getPointing() && p.y > 150) {
        this.sprite.draggable.back(600, this.easingMode);
        // ドラッグされている場所を更新
        this.initialPosition.x = p.x;
        this.initialPosition.y = p.y;
    }
    this.move(p, app);
  },
  // スプライトパターン変更
  changeSprite: function(mode, width, height) {
    // スプライト画像作成
    this.sprite = Sprite(mode, width, height).addChildTo(this.playergroup);
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