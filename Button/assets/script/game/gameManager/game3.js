/**
 * 第一关
 */


var BaseComponent = require("BaseComponent");

cc.Class({
    extends: BaseComponent,

    properties: {
        leftPoint2:cc.Node,
        centerPoint2:cc.Node,
        rightPoint2:cc.Node,
    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_button_click,this.buttonClick,this);
    },

    init(){
        this.leftPoint2.active = false;
        this.centerPoint2.active = false;
        this.rightPoint2.active = false;
        this._success  = false;
    },

    buttonClick(buttonIndex){

        switch (buttonIndex) {
            case GL.ThreeButtonModel._button1 :{
                this.buttonClickLeft();
                break;
            }

            case GL.ThreeButtonModel._button2 :{
                this.buttonClickCenter();
                break;
            }

            case GL.ThreeButtonModel._button3 :{
                this.buttonClickRight();
                break;
            }
        }
    },

    buttonClickLeft(){
        if(!this._success){
            this.leftPoint2.active = !this.leftPoint2.active;
            this.centerPoint2.active = !this.centerPoint2.active;
            this.checkIsSuccess();
        }
    },

    buttonClickCenter(){
        if(!this._success){
            this.leftPoint2.active = this.rightPoint2.active;
            this.rightPoint2.active = !this.leftPoint2.active;
            this.checkIsSuccess();
        }
    },

    buttonClickRight(){
        if(!this._success){
            this.rightPoint2.active = false;
            this.checkIsSuccess();
        }
    },

    //判断是否成功
    checkIsSuccess(){
        if( this.leftPoint2.active && this.centerPoint2.active && this.rightPoint2.active ){
            this._success = true;

            //通知success
            GL.MessageCenter.emit(GL.EventDef._msg_level_complet);

        }
    }


});
