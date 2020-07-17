/**
 * 第一关
 */


var BaseComponent = require("BaseComponent");

cc.Class({
    extends: BaseComponent,

    properties: {
        item1:cc.Node,
        item2:cc.Node,
        item3:cc.Node,
        item4:cc.Node,
    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_button_click,this.buttonClick,this);
        this.init();
    },

    init(){

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

    //左按钮
    buttonClickLeft(){


        if(!this._success  ){



            this.checkIsSuccess();
        }
    },

    //中间按钮
    buttonClickCenter(){
        if(!this._success && this._canClick ){

            this.checkIsSuccess();
        }
    },

    //右按钮
    buttonClickRight(){
        if(!this._success && this._canClick ){

            this.checkIsSuccess();
        }
    },

    //判断是否成功
    checkIsSuccess(){


        this._success = true;

        //通知success
    },


});
