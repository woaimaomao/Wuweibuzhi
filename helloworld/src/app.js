
var size = cc.winSize;
var number = 10;
var MAIN_COLOR = cc.color(255, 255, 255, 255);
var BIG_CIRCLE_RADIUS = 60;
var SMALL_CIRCLE_RADIUS = 6;
var BIGFONT_SIZE = 60;
var LINE_LEN = 180;

var RotateLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        // add Line
        var my = this;
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if(number == 0){
                    cc.eventManager.stopAction();
                    return false;
                }
                number = number - 1;
                var lineSprite = new LineSprite();
                lineSprite.attr({
                    x:size.width/2,
                    y:size.height/2
                });
                my.addChild(lineSprite);
                //this.lineSprite = null;
                return true;
            },
            onTouchMoved: function (touch, event) {
               //TODO
            },
            onTouchEnded: function (touch, event) {
               //TODO
            }


        });
        cc.eventManager.addListener(listener1, this);
    },

});


var BGLayer = cc.Layer.extend({
    sprite:null,
    circleSprite:null,
    drawNode:null,
    lineSprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        // create and initialize a label
        var titleLabel = new cc.LabelTTF("无微不至", "Arial", 38);
        // position the label on the center of the screen
        titleLabel.x = size.width / 2;
        titleLabel.y = size.height -50;
        // add the label as a child to this layer
        this.addChild(titleLabel, 5);

        // add Circle
        this.circleSprite = new CircleSprite();
        this.circleSprite.attr({
            x:size.width/2,
            y:size.height/2,
        });
        this.addChild(this.circleSprite,0);

        return true;
    }
});


var CircleSprite = cc.Sprite.extend({

    drawNode:null,
    ctor:function () {
        this._super();
        cc.log("circle sprite create...");
        this.width = 120;
        this.height = 120;
        // 将锚点设置为（0,0）时，大圆才能居中显示，否则有偏差（？此点需要研究）
        this.setAnchorPoint(cc.p(0,0));
        this.drawNode = new cc.DrawNode();
        //drawNode.drawRect(ccenter,(ccenter.x+30,ccenter.y+30),cc.Color(123,123,123),2,cc.Color(123,123,123));
        this.drawNode.drawCircle(cc.p( 0, 0), BIG_CIRCLE_RADIUS, 360, BIG_CIRCLE_RADIUS, false, 2, MAIN_COLOR);

        this.addChild(this.drawNode,0);
        this.addLabel(number);

    },

    addLabel:function (num) {
      var numSprite = new cc.LabelTTF(""+num,"Arial",BIGFONT_SIZE);
        numSprite.attr({
            x:0,
            y:0,
            color:cc.color(255,255,255,255)
        });
        this.addChild(numSprite,0);
    }
});


var LineSprite = cc.Sprite.extend({

    lineDraw:null,
    time:3,
    ctor:function () {
        this._super();
        this.width = 6;
        this.height = 120;
        this.addLine();
        this.startRotate();
    },

    addLine:function () {
        this.lineDraw = new cc.DrawNode();
        this.lineDraw.drawSegment(cc.p( 0, 0), cc.p( 0, 0 - LINE_LEN), 1, MAIN_COLOR);
        this.lineDraw.drawCircle(cc.p( 0, 0 - LINE_LEN), SMALL_CIRCLE_RADIUS, cc.degreesToRadians(360), 50, false, 2*SMALL_CIRCLE_RADIUS, MAIN_COLOR);
        var smallNum = new cc.LabelTTF(""+number,"Arial",18);
        smallNum.attr({
           x: 0,
           y:0 - LINE_LEN,
           color:cc.color(0,0,0,255)
        });
        this.addChild(this.lineDraw,0);
        this.addChild(smallNum,0);
    },
    startRotate:function () {
        // add actions
        var rotate = cc.rotateBy(this.time, 180);
        this.runAction(cc.sequence(rotate,rotate).repeatForever());
    },

});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var bgLayer = new BGLayer();
        this.addChild(bgLayer,0);
        var rotateLayer = new RotateLayer();
        this.addChild(rotateLayer,1);

    },





});

