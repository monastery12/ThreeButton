/**
 * 第一关
 */

// var move_length = 85;
// var posArr = [-255,-170,-85,0,85,170,255];

var BaseComponent = require("BaseComponent");

cc.Class({
    extends: BaseComponent,

    properties: {
        itemNodeArr:[cc.Node],
    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_button_click,this.buttonClick,this);
        this.init();
    },

    //设置数据初始化
    init(){

        this._itemArr = [true,true,true,false,false,false,false];
        this.moveItem();
        this._success  = false;

    },

    //响应按钮
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


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //左按钮
    buttonClickLeft(){

        if(!this._success  ){
            this.moveLeft();
            this.checkIsSuccess();
        }
    },

    //中间按钮
    buttonClickCenter(){
        if(!this._success  ){

            this._itemArr[3] = !this._itemArr[3];
            this.moveItem();
            this.checkIsSuccess();
        }
    },

    //右按钮
    buttonClickRight(){
        if(!this._success  ){
            this.moveRight();
            this.checkIsSuccess();
        }
    },

    //判断是否成功
    checkIsSuccess(){

        if(this._itemArr[2] && this._itemArr[4] && !this._itemArr[0] && !this._itemArr[1] &&!this._itemArr[3] && !this._itemArr[5] && !this._itemArr[6]){

            this._success = true;
            // 通知success
            GL.MessageCenter.emit(GL.EventDef._msg_level_complet);
        }
    },


    //
    moveLeft(index){
        //更改数据
        for(let i = 0 ; i < this._itemArr.length -1 ; i++){
            if(this._itemArr[i]){
                //nothing
            }else {
                if(this._itemArr[i+1]){
                    this._itemArr[i] = true;
                    this._itemArr[i+1] = false;
                }
            }
        }
        //显示
        this.moveItem();
    },//moveLeft

    //
    moveRight(index){
        //更改数据
        for(let i = this._itemArr.length-1 ; i > 0 ; i--){
            if(this._itemArr[i]){
                //nothing
            }else {
                if(this._itemArr[i-1]){
                    this._itemArr[i] = true;
                    this._itemArr[i-1] = false;
                }
            }
        }

        //显示
        this.moveItem();
    },

    moveItem(){
        for( let i = 0 ; i < this._itemArr.length ; i++ ){
            if(this._itemArr[i]){
                this.itemNodeArr[i].active = true;
            }else {
                this.itemNodeArr[i].active = false;
            }
        }
    },
});
