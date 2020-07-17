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
        this.init();
    },

    init(){
        this.leftPoint2.rotation = 30;
        this.centerPoint2.rotation = 60;
        this.rightPoint2.rotation = 90;
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
            this.leftPoint2.rotation += 30;
            this.checkIsSuccess();
        }
    },

    buttonClickCenter(){
        if(!this._success){
            this.centerPoint2.rotation += 30;
            this.checkIsSuccess();
        }
    },

    buttonClickRight(){
        if(!this._success){
            this.rightPoint2.rotation += 30;
            this.checkIsSuccess();
        }
    },

    //判断是否成功
    checkIsSuccess(){
        let r1 = this.leftPoint2.rotation / 360 - Math.trunc(this.leftPoint2.rotation / 360) ;
        let r2 = this.centerPoint2.rotation / 360 - Math.trunc(this.centerPoint2.rotation / 360);
        let r3 = this.rightPoint2.rotation / 360 - Math.trunc(this.rightPoint2.rotation / 360);
        if(r1 === 0 && r2 === 0 && r3 === 0 ){
            this._success = true;
            GL.MessageCenter.emit(GL.EventDef._msg_level_complet);
        }
    }


});
