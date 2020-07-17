
var BaseComponent = require("BaseComponent");

cc.Class({
    extends: BaseComponent,

    properties: {
        ThreeButtonAnim:cc.Animation,
        iconLeft:cc.Sprite,
        iconCenter:cc.Sprite,
        iconRight:cc.Sprite,
    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_level_choose,this.initThreeButton,this);
        this.gyRegEvent(GL.EventDef._msg_level_next,this.levelNext,this);
        this.gyRegEvent(GL.EventDef._msg_level_refresh,this.levelRefresh,this);

        this.loadButtonAssest();
    },

    buttonClick1(){
        GL.MessageCenter.emit(GL.EventDef._msg_button_click,GL.ThreeButtonModel._button1 );
    },

    buttonClick2() {
        GL.MessageCenter.emit(GL.EventDef._msg_button_click,GL.ThreeButtonModel._button2 );
    },

    buttonClick3(){
        GL.MessageCenter.emit(GL.EventDef._msg_button_click,GL.ThreeButtonModel._button3 );
    },

    //初始化按钮
    initThreeButton(obj){

        /**
         * 加载按钮素材
         */

        let indexLv = obj.index;
        let refresh = obj.refresh;

        if( refresh || GL._indexLv != indexLv ){
            this.loadButtonAssest();
        }
    },

    //选关
    levelNext(){
        this.loadButtonAssest();
    },

    //加载按钮资源
    loadButtonAssest(){
        //处理选关的事情
        this.ThreeButtonAnim.play('ThreeButton');



        //处理资源问题
        let leftName    = `lv_${GL._indexLv}_left`;                     //  lv_1_left
        let centerName  = `lv_${GL._indexLv}_center`;                   //  lv_1_center
        let rightName   = `lv_${GL._indexLv}_right`;                    //  lv_1_right

        if(this._buttonAssest){
            this.iconLeft.spriteFrame = this._buttonAssest.getSpriteFrame(leftName);
            this.iconCenter.spriteFrame = this._buttonAssest.getSpriteFrame(centerName);
            this.iconRight.spriteFrame = this._buttonAssest.getSpriteFrame(rightName);
        }else {
            cc.loader.loadRes("plist/buttonAssest",cc.SpriteAtlas,function (err,res) {
                if(!err){
                    this._buttonAssest = res;
                    this.iconLeft.spriteFrame = this._buttonAssest.getSpriteFrame(leftName);
                    this.iconCenter.spriteFrame = this._buttonAssest.getSpriteFrame(centerName);
                    this.iconRight.spriteFrame = this._buttonAssest.getSpriteFrame(rightName);
                }
            }.bind(this))
        }

    },

    //刷新按钮
    levelRefresh(){
        this.loadButtonAssest();
    },


});
