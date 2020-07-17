
var BaseComponent = require("BaseComponent");
cc.Class({
    extends: BaseComponent,

    properties: {
        childNode:cc.Node,
    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_add_liveNess,this.addLiveNess,this);
    },

    btnBackClick(){
        this.childNode.active = false;
    },

    addLiveNess(){
        this.childNode.active = true;
    },
});
