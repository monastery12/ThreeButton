var GameHelp =require("GameHelp");

var BaseComponent = require("BaseComponent");

cc.Class({
    extends: BaseComponent,

    properties: {
        childNode:cc.Node,
        lbHelp:cc.Label,
    },



    start ( ) {
        this.gyRegEvent(GL.EventDef._msg_open_help,this.openHelp,this);
    },

    //打开当前第几关
    openHelp(){
        this.lbHelp.string = GameHelp.getHelpStr(GL._indexLv);
        this.childNode.active = true;
    },

    btnBackClick(){
        this.childNode.active = false;
    },

});
