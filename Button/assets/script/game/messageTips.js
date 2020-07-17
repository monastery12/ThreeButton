var BaseComponent = require("BaseComponent")

cc.Class({
    extends: BaseComponent,

    properties: {
        tipNode:cc.Node,
        labelShowMsgTip:cc.Label,
        animalTip:cc.Animation,
    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_msgTip,this.showMsgTip,this);
    },

    showMsgTip(str) {
        if(this.tipNode && this.labelShowMsgTip){

            this.labelShowMsgTip.string = str;
            this.tipNode.active = true;
            this.animalTip.play("tip");
        }
    }
});
