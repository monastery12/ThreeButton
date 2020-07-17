
const MAX_LIVENEXX = 100;

let PlayerInfo = function(){
    this.liveNess = 100;               //疲劳值
    this.level = 1;                  //关卡
    this.chooseLevel = 7;            //当前选则的关卡

}

var PlayerManager = {
    _data: new PlayerInfo(),


    set liveNess(val){
        val = val > MAX_LIVENEXX ? MAX_LIVENEXX : val;
        this._data.liveNess = val;
        GL.MessageCenter.emit(GL.EventDef._msg_liveNess_change);        //通知疲劳值change
    },
    get liveNess(){
        return this._data.liveNess;
    },

    set level(val){
       this._data.level = val;
    },
    get level(){
        return  this._data.level ;
    },

    set chooseLevel(val){
        this._data.chooseLevel = val;
    },
    get chooseLevel(){
        return this._data.chooseLevel;
    }
}


module.exports = PlayerManager;

