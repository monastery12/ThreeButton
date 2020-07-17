
var BaseComponent = require("BaseComponent");
cc.Class({
    extends: BaseComponent,

    properties: {
        lbLiveNess:cc.Label,
    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_liveNess_change,this.liveNessChange,this);
    },

    liveNessChange(){
        this.lbLiveNess.string = GL.PlayerManager.liveNess;
    },

    //通知显示看视频给活跃度
    btnAddLiveNess(){
       GL.MessageCenter.emit(GL.EventDef._msg_add_liveNess);
    },


});
