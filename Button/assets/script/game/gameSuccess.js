


var BaseComponent = require("BaseComponent");

cc.Class({
    extends: BaseComponent,

    properties: {
        childNode:cc.Node,
        sucessAnim:cc.Animation,
    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_level_complet,this.showGameSuccess,this);
    },

    showGameSuccess(){

        //播放动画
        this.sucessAnim.play('GameSucess');
    },

    btnNextLevel(){

        if(GL.PlayerManager.liveNess){
            GL.PlayerManager.liveNess --;
            GL.MessageCenter.emit(GL.EventDef._msg_level_next);
            this.closeGameSuccess();
        }else {
            GL.MessageCenter.emit(GL.EventDef._msg_msgTip,'体力不足');
        }
    },

    btnRefreshLevel(){
        GL.MessageCenter.emit(GL.EventDef._msg_level_refresh);
        this.closeGameSuccess();
    },

    closeGameSuccess(){
        this.childNode.active = false;
    },

});
