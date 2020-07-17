
var BaseComponent = require("BaseComponent");
cc.Class({
    extends: BaseComponent,

    properties: {
        menuChooseNode:cc.Node,
        labelPower:cc.Label,
    },


    start(){
        this.gyRegEvent(GL.EventDef._msg_level_choose,this.levelChoose,this);
    },

    //刷新ui
    initUI(){
        this.labelPower.string = GL.PlayerManager.liveNess;
    },

    //选择选卡
    btnLevelMenuClick(){
        this.menuChooseNode.active = true;
    },

    //关闭关卡
    btnCloseMenuClick(){
        this.menuChooseNode.active = false;
    },

    //打开帮助
    btnLevelHelpClick(){
        GL.MessageCenter.emit(GL.EventDef._msg_open_help);
    },

    //刷新关卡
    btnLevelFreshClick(){
        if( GL.PlayerManager.liveNess > 0 ){
            GL.PlayerManager.liveNess --;
            //做刷新的事情
            GL.MessageCenter.emit(GL.EventDef._msg_level_refresh);
        }else {
            GL.MessageCenter.emit(GL.EventDef._msg_msgTip,'体力不足');
        }
    },

    //选择关卡
    levelChoose(){
        this.menuChooseNode.active = false;
    },
});
