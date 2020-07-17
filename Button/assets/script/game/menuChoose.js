
var MAX_NUM = 20;

cc.Class({
    extends: cc.Component,

    properties: {
        btnContent:cc.Node,
        btnLevenPrefab:cc.Prefab,
    },

    start () {

    },

    onEnable(){

        for( let i = 0 ; i < MAX_NUM ; i++ ){

            let btnPrefab;
            if( this.btnContent.children[i] ){
                btnPrefab = this.btnContent.children[i];
            }else {
                btnPrefab = cc.instantiate(this.btnLevenPrefab);
                btnPrefab.parent = this.btnContent;
            }
            btnPrefab.getComponent('btnLevel').init(i+1);
        }
    },

    btnBackClick(){
        this.node.active = false;
    },

});
