
cc.Class({
    extends: cc.Component,

    properties: {
        unLockNode:cc.Node,
        lockNode:cc.Node,
        lbLevel:cc.Label,
    },



    start () {

    },

    init(i){
        this._indexLv = i;

        this.lbLevel.string = i;

        if(i <= GL.PlayerManager.level){
            this.unLockNode.active = true;
            this.lockNode.active = false;

            this._canClick = true;

        }else {
            this.unLockNode.active = false;
            this.lockNode.active = true;

            this._canClick = false;
        }
    },

    btnLevelChoose(){
        if(this._canClick){
            //
            let obj = {};
            obj.index = this._indexLv;
            GL.MessageCenter.emit(GL.EventDef._msg_level_choose,obj);
        }
    }



});
