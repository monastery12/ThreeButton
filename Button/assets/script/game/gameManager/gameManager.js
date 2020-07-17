/**
 * 第一关
 */


var BaseComponent = require("BaseComponent");

cc.Class({
    extends: BaseComponent,

    properties: {
        gameContent:cc.Node,
        lbLevel:cc.Label,
    },


    start () {
        this.gyRegEvent(GL.EventDef._msg_level_choose,this.levelChoose,this);
        this.gyRegEvent(GL.EventDef._msg_level_next,this.levelNext,this);
        this.gyRegEvent(GL.EventDef._msg_level_refresh,this.levelRefresh,this);

        this.init(GL.PlayerManager.chooseLevel);
    },

    init(indexLv){
        GL._indexLv = indexLv;
        this.loadGameLevel();
    },

    levelChoose(obj){
        let indexLv = obj.index;
        let refresh = obj.refresh;

        if( refresh || GL._indexLv != indexLv ){
            GL._indexLv = indexLv;
            this.loadGameLevel();           //加载游戏管卡
        }
    },

    //加载游戏关卡
    loadGameLevel(){
        let gameLevelName = 'game' + GL._indexLv;

        cc.loader.loadRes('prefab/game/'+gameLevelName,function (err,prefab) {

            this.gameContent.destroyAllChildren();

            let gameLevelPrefab = cc.instantiate(prefab);
            gameLevelPrefab.parent = this.gameContent;

        }.bind(this) );

        //显示当前关卡
        this.lbLevel.string = `第${GL._indexLv}关`;
    },

    levelNext(){
        GL._indexLv ++;
        if(GL._indexLv > GL.PlayerManager.level ){
            GL.PlayerManager.level = GL._indexLv;
        }
        this.loadGameLevel();
    },

    levelRefresh(){
        this.loadGameLevel();
    },

    initThree(){

    }

});
