var GL = {

    _indexLv:1,
    ThreeButtonModel    :require("ThreeButtonModel"),
    EventDef            :require("EventDef"),
    MessageCenter       :require("MessageCenter"),
    PlayerManager       :require("PlayerManager"),







    // 配置,若有服务器下发数据，则替换Conf
    Conf:{
        loadIngImag     :"http://img3.imgtn.bdimg.com/it/u=2401491928,907118315&fm=26&gp=0.jpg",
        videoUnit       :"adunit-cfbc9522d2f58bb5",
        guessUnit       :["猜你喜欢id"],
        bannerUnit      :"adunit-133bca88c08a91e9 ",
        version         :"1.0.0",
        shareTitle      :"分享标题",
        shareImageUrl   :"分享图片url",
        inviteQuery     :"invite",
        shareQuery      :"share",
        userId          :"00000",
    },

    //玩家信息
    UserInfo:{
        nickName :    "张三",
        avatarUrl:    "http://img3.imgtn.bdimg.com/it/u=2401491928,907118315&fm=26&gp=0.jpg" ,
        gender:       1,    //性别 0：未知、1：男、2：女
        province:     "未知",
        city:         "未知",
        country:      "未知",
    },


    //--------------------------------------------------//
    gLog(str){
        //console.log(`**************************${str}`);
    },

    //提示
    messageTip(str){
        GL.MessageCenter.emit(GL.EventDef._msg_msgTip,str);
    },

    //随机数
    randomInt(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    },

    //限制字符串长度
    stringLimit(orgStr, limit) {
        if (orgStr.length > limit) {
            return orgStr.slice(0, limit) + "...";
        } else {
            return orgStr;
        }
    },

    //检查环境
    debugMode(){

        if(cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT_GAME){
            return true;
        }else{
            return false;
        }
    },

    //获取周几
    getWeekDay(){
        let week = new Date().getDay();
        if(week == 0){
            return 7;
        }else{
            return week;
        }
    },

    //获取新的一天
    //判断新的一天
    isNewDay(){
        let date = new Date();
        let year    = date.getFullYear();
        let monty   = date.getMonth();
        let day     = date.getDate();



        let lastYear    = GL.PlayerManager.lastTime.year;
        let lastMonty   = GL.PlayerManager.lastTime.monty;
        let lastDay     = GL.PlayerManager.lastTime.day;

        if(year > lastYear){
            return true;
        }
        if(year == lastYear ){
            if(monty >lastMonty){
                return true;
            }
        }
        if(year == lastYear && monty == lastMonty){
            if(day > lastDay){
                return true;
            }
        }

        GL.PlayerManager.lastTime = {"yera":year,"monty":monty,"day":day}
        return false;
    },

    //获取比例
    getBili(num_1,num_2){
        let bili = ( num_1 / num_2 > 1 ? 1 : num_1/num_2 );
        return bili;
    },

    /**
     * 01:02:03
     *时间参数 秒
     */
    showTime(time){
        let h = Math.trunc(time / 3600 ) ;
        let m = Math.trunc((time - (3600*h))/ 60 );
        let s = Math.trunc(time - (h*3600+m*60) );

        if(h<10){
            h = `0${h}`;
        }
        if(m<10){
            m = `0${m}`;
        }
        if(s < 10){
            s = `0${s}`;
        }
        return  `${h}:${m}:${s}`;
    },
}

window.GL = GL;