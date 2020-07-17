/**
 * 第7关
 */


var BaseComponent = require("BaseComponent");

cc.Class({
    extends: BaseComponent,

    properties: {
        leftContent:cc.Node,
        centerContent:cc.Node,
        rightContent:cc.Node,

        startContent:cc.Node,
        leftCountArr:[cc.Node],
        centerCountArr:[cc.Node],
        rightCountArr:[cc.Node],
        flyTime:0.3,
    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_button_click,this.buttonClick,this);
        this.init();
    },

    init(){

        this._success  = false;

        //三个容器分别有多少
        // this.leftCountArr = [];
        // this.centerCountArr = [];
        // this.rightCountArr = [18];

        //三个按钮选中其中一个
        this._chooseIndex = -1;
        //选择数量
        this._chooseNumArr = [];
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


    //-----------------------------------逻辑区域-----------------
    buttonClickLeft(){
        if(!this._success){

            //选择
            if(this._chooseIndex == -1 || this._chooseIndex == 1){
                this._chooseIndex = 1
                if( this.leftCountArr.length > 0 ){
                    let startNode = this.leftCountArr.pop();
                    this._chooseNumArr.push(startNode);
                    this.choosedStart(startNode);
                }
            }else {
                //传递
                this.leftCountArr = this.leftCountArr.concat(this._chooseNumArr);

                //飞星星
                this.fly(1);

                //重置
                this.refreshData();
            }
        }
    },

    buttonClickCenter(){
        if(!this._success){
            //选择
            if(this._chooseIndex == -1|| this._chooseIndex == 2){
                this._chooseIndex = 2;
                if( this.centerCountArr.length > 0 ){
                    let startNode = this.centerCountArr.pop();
                    this._chooseNumArr.push(startNode);
                    this.choosedStart(startNode);
                }
            }else {
                //传递
                this.centerCountArr = this.centerCountArr.concat(this._chooseNumArr);

                //飞星星
                this.fly(2);

                //重置
                this.refreshData();
            }
        }
    },

    //右按钮
    buttonClickRight(){
        if(!this._success){
            //选择
            if(this._chooseIndex == -1 || this._chooseIndex == 3){
                this._chooseIndex = 3
                if( this.rightCountArr.length > 0 ){
                    let startNode = this.rightCountArr.pop();
                    this._chooseNumArr.push(startNode);
                    this.choosedStart(startNode);

                }
            }else {
                //传递
                this.rightCountArr = this.rightCountArr.concat(this._chooseNumArr);

                //飞星星
                this.fly(3);

                //重置
                this.refreshData();
            }
        }
    },

    //飞
    fly( contentIndex ){

        //要飞的星星数量
        let flyLength = this._chooseNumArr.length;

        //飞向的容器
        let pointContent = null;

        //起点
        let originIndex = -1;

        //飞向的坐标数组
        let pointArr = [];

        //获取起点跟容器
        if( contentIndex == 1){
            pointContent    = this.leftContent;
            originIndex     = this.leftCountArr.length-flyLength;
        }else if( contentIndex == 2){
            pointContent    = this.centerContent;
            originIndex     = this.centerCountArr.length-flyLength;
        }else {
            pointContent    = this.rightContent;
            originIndex     = this.rightCountArr.length-flyLength;
        }

        //遍历目的地容器，获取目的地坐标
        for(let i = originIndex ; i < originIndex + flyLength ; i++ ){

            //转换坐标
            let lp = pointContent.children[i].position;
            let gp = pointContent.convertToWorldSpaceAR(lp);
            let lp2 = this.startContent.convertToNodeSpaceAR(gp);
            pointArr.push(lp2);
        }

        //移动
        for(let i = 0 ; i < flyLength ; i++){
            this.releaseStart(this._chooseNumArr[i]);
            this._chooseNumArr[i].runAction(cc.moveTo(this.flyTime,pointArr[i].x,pointArr[i].y) );
        }



        this.checkIsSuccess();
    },

    //判断是否成功
    checkIsSuccess(){

        if(this.leftCountArr.length == 6 && this.centerCountArr.length == 6 && this.rightCountArr.length == 6 ){
            this._success = true;
            //通知成功
            GL.MessageCenter.emit(GL.EventDef._msg_level_complet);
        }
    },

    //刷新数据
    refreshData(){
        this._chooseIndex = -1;
        this._chooseNumArr = [];
    },

    //选中
    choosedStart(startNode){
        startNode.children[0].active = true;
    },

    releaseStart(startNode){
        startNode.children[0].active = false;
    },



});
