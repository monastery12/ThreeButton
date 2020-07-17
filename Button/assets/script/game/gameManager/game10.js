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
        item5:cc.Node,

    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_button_click,this.buttonClick,this);
        this.init();
    },

    init(){

        this._itemArr = [false,false,false,false,false];

        this._canClick = true;
        this._success  = false;

        this.itemMoveClose(this.item1);
        this.itemMoveClose(this.item2);
        this.itemMoveClose(this.item3);
        this.itemMoveClose(this.item4);
        this.itemMoveClose(this.item5);
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

        let itemArrTemp = [false,false,false,false,false];

        if(!this._success && this._canClick ){

            for(let i= 0 ; i < this._itemArr.length;i++){
                if(this._itemArr[i]){
                    let index = i-1 < 0 ? 4 :i-1;
                    itemArrTemp[index] = true;
                }
            }

            this._itemArr = itemArrTemp;

            for(let i = 0 ; i<this._itemArr.length ; i++){
                if(this._itemArr[i]){
                    this.itemIndexMoveOpen(i);
                }else {
                    this.itemIndexMoveClose(i);
                }
            }

            this.checkIsSuccess();
        }
    },

    //中间按钮
    buttonClickCenter(){
        if(!this._success && this._canClick ){
            this.itemMove(2);
            this.itemMove(3);
            this.itemMove(4);
            this.checkIsSuccess();
        }
    },

    //右按钮
    buttonClickRight(){
        if(!this._success && this._canClick ){
            if(!this._success && this._canClick ) {

                let itemArrTemp = [false,false,false,false,false];

                for (let i = 0; i < this._itemArr.length; i++) {
                    if (this._itemArr[i]) {
                        let index = i + 1 > 4 ? 0 : i + 1;
                        itemArrTemp[index] = true;
                    }
                }

                this._itemArr = itemArrTemp;

                for (let i = 0; i < this._itemArr.length; i++) {
                    if (this._itemArr[i]) {
                        this.itemIndexMoveOpen(i);
                    } else {
                        this.itemIndexMoveClose(i);
                    }
                }
            }

            this.checkIsSuccess();
        }
    },

    //判断是否成功
    checkIsSuccess(){

        for(let i = 0 ; i < this._itemArr.length; i++){
            if(!this._itemArr[i]){
                return ;
            }
        }
        this._success = true;

        //通知success
        GL.MessageCenter.emit(GL.EventDef._msg_level_complet);
    },

    itemMove(itemIndex){
        switch (itemIndex) {
            case 1:
            {
                if(this._itemArr[itemIndex-1]){
                    this.itemMoveClose(this.item1,itemIndex);
                }else {
                    this.itemMoveOpen(this.item1,itemIndex);
                }
                break;
            }
            case 2:
            {
                if(this._itemArr[itemIndex-1]){
                    this.itemMoveClose(this.item2,itemIndex);
                }else {
                    this.itemMoveOpen(this.item2,itemIndex);
                }
                break;
            }
            case 3:
            {
                if(this._itemArr[itemIndex-1]){
                    this.itemMoveClose(this.item3,itemIndex);
                }else {
                    this.itemMoveOpen(this.item3,itemIndex);
                }
                break;
            }
            case 4:
            {
                if(this._itemArr[itemIndex-1]){
                    this.itemMoveClose(this.item4,itemIndex);
                }else {
                    this.itemMoveOpen(this.item4,itemIndex);
                }
                break;
            }
            case 5:
            {
                if(this._itemArr[itemIndex-1]){
                    this.itemMoveClose(this.item5,itemIndex);
                }else {
                    this.itemMoveOpen(this.item5,itemIndex);
                }
                break;
            }
        }
    },

    itemMoveOpen(item,itemIndex){

        this._canClick = false;
        this._itemArr[itemIndex-1] = true;

        for(let i = 0 ; i < item.children.length; i++){
            let duration = 0.3;

            let action1 = cc.scaleTo(duration,1,1)
            let action2 = cc.tintTo(duration, 121, 221, 63);

            let action3 =cc.callFunc(function () {
                this._canClick = true;
            },this);
            let action4 = cc.spawn(action1,action2);
            let action5 = cc.sequence(action4,action3);

            item.children[i].runAction(action5)
        }
    },

    itemMoveClose(item,itemIndex){

        this._canClick = false;
        this._itemArr[itemIndex-1] = false;

        for(let i = 0 ; i < item.children.length; i++){

            let duration = 0.3;

            let action1 = cc.scaleTo(duration,1,0.4)
            let action2 = cc.tintTo(duration, 132, 137, 129);

            let action3 =cc.callFunc(function () {
                this._canClick = true;
            },this);
            let action4 = cc.spawn(action1,action2);
            let action5 = cc.sequence(action4,action3);

            item.children[i].runAction(action5);
        }
    },

    itemIndexMoveOpen(index){
        let item  ;
        switch (index) {
            case 0:
            {
                item = this.item1;
                this.itemMoveOpen(item,index+1);
                break;
            }
            case 1:
            {
                item = this.item2;
                this.itemMoveOpen(item,index+1);
                break;
            }
            case 2:
            {
                item = this.item3;
                this.itemMoveOpen(item,index+1);
                break;
            }
            case 3:
            {
                item = this.item4;
                this.itemMoveOpen(item,index+1);
                break;
            }
            case 4:
            {
                item = this.item5;
                this.itemMoveOpen(item,index+1);
                break;
            }
        }
    },

    itemIndexMoveClose(index){
        let item  ;
        switch (index) {
            case 0:
            {
                item = this.item1;
                this.itemMoveClose(item,index+1);
                break;
            }
            case 1:
            {
                item = this.item2;
                this.itemMoveClose(item,index+1);
                break;
            }
            case 2:
            {
                item = this.item3;
                this.itemMoveClose(item,index+1);
                break;
            }
            case 3:
            {
                item = this.item4;
                this.itemMoveClose(item,index+1);
                break;
            }
            case 4:
            {
                item = this.item5;
                this.itemMoveClose(item,index+1);
                break;
            }
        }
    },


});
