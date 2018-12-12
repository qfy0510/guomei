window.onload = function() {
    //----------------------------top 背景------------------------------------------
    var oBg = document.getElementById('bg');
    var oTopBg = document.getElementById('top_bg');

    oBg.onclick = function () {
        document.body.removeChild(oTopBg);
    }

    //----------------------------banner 背景------------------------------------------
    var oWrap = document.getElementById('banner');
    var oBox = document.getElementById('banner_bg');
    var oUl = document.getElementById('ul');
    var oOl = document.getElementById('ol');
    var aLi = oUl.getElementsByTagName('li');
    var aBtn = oOl.getElementsByTagName('li');
    var time = null;

    ajax('data/banner.txt', function (str) {
        var ban = eval(str);
        var Ulli = '';
        var Olli = '';
        for (var i = 0; i < ban.length; i++) {
            Ulli += "<li><img src='" + ban[i][0].src + "'></li>";
            Olli += '<li></li>'
        }
        oUl.innerHTML = Ulli;
        oOl.innerHTML = Olli;
        aLi[0].className = 'active';
        aBtn[0].className = 'active';
        oWrap.style.background = ban[0][0].background;


        //自己动
        var index = 0;

        function fnClock() {
            index++;
            if (index == aBtn.length) {
                index = 0;
            }
            for (var i = 0; i < aBtn.length; i++) {
                aBtn[i].className = '';
                aLi[i].className = '';
            }
            aBtn[index].className = 'active';
            aLi[index].className = 'active';
            oWrap.style.background = ban[index][0].background;

        }

        time = setInterval(fnClock, 2000);

        //移入div时停止定时器，移出时开启定时器
        oBox.onmouseover = function () {
            clearInterval(time);
        }
        oBox.onmouseout = function () {
            time = setInterval(fnClock, 2000);
        }

        //切换小按钮
        for (var i = 0; i < aBtn.length; i++) {
            aBtn[i].index = i;
            aBtn[i].onmouseover = function () {
                for (var j = 0; j < aBtn.length; j++) {
                    aBtn[j].className = '';
                    aLi[j].className = '';
                }
                aBtn[this.index].className = 'active';
                aLi[this.index].className = 'active';
                oWrap.style.background = ban[this.index][0].background;
                index = this.index;
            }
        }
    });

    //----------------------------banner-left------------------------------------------
    var listLeft = document.getElementById('lisnav');
    var listLi = listLeft.getElementsByTagName('h3');
    var listDiv = listLeft.getElementsByTagName('div');
    for (var i = 0; i < listLi.length; i++) {
        listLi[i].index = i;
        listLi[i].onmouseover = function () {
            listDiv[this.index].style.display = 'block';
        }
        listLi[i].onmouseout = function () {
            listDiv[this.index].style.display = 'none';
        }
    }

    //----------------------------倒计时------------------------------------------
    function fnZero(n) {
        if (n < 10) return '0' + n;
        else return '' + n;
    }

    var oDown = document.getElementById("down");
    var oEm = oDown.getElementsByTagName("em");

    function clock() {
        var date = new Date();
        date.setHours(22, 0, 0, 0);
        var ms = date.getTime() - new Date().getTime();
        var s = parseInt(ms / 1000);
        var day = parseInt(ms / 86400);
        s %= 86400;
        var hour = parseInt(s / 3600);
        s %= 3600;
        var min = parseInt(s / 60);
        s %= 60;
        oEm[0].innerHTML = fnZero(hour);
        oEm[1].innerHTML = fnZero(min);
        oEm[2].innerHTML = fnZero(s);
    }

    clock();
    setInterval(clock, 1000);


    //----------------------------每日必抢------------------------------------------
    ajax("data/day.txt", function (str) {
        var dailyMain = document.getElementsByClassName('daily_main')[0];
        var arr = eval(str)[0].data.indexRushItem;
        /*console.log(arr[0]);*/
        for (var i = 0; i < arr.length; i++) {
            if (i % 4 == 0) {
                var dayUl = document.createElement('ul');
                dayUl.className = 'daily_list clearfix';
                dailyMain.appendChild(dayUl);
            }
            dayUl.innerHTML += "<li><a href='#'><img src='" + arr[i].goods_img + "' alt=''><p class='list_price'>" + arr[i].goods_price + "<span>" + arr[i].goods_tg_price + "</span></p><p class='list_name'>" + arr[i].goods_name + "</p></a></li>"
        }

        //点击切换
        var dailyUl = dailyMain.getElementsByTagName('ul');
        var oNext = document.getElementsByClassName('daily_next')[0];
        var oPrev = document.getElementsByClassName('daily_prev')[0];
        var index = 0;
        oNext.onclick = function () {
            index++;
            if (index == dailyUl.length) {
                index = 0;
            }
            for (var i = 0; i < dailyUl.length; i++) {
                dailyUl[i].style.display = 'none';
            }
            dailyUl[index].style.display = 'block';
        }
        oPrev.onclick = function () {
            index--;
            if (index < 0) {
                index = dailyUl.length - 1;
            }
            for (var i = 0; i < dailyUl.length; i++) {
                dailyUl[i].style.display = 'none';
            }
            dailyUl[index].style.display = 'block';
        }
    });

    //----------------------------楼层导航----------------------------------------
    var floorNav = document.getElementsByClassName("gm-floor-nav")[0];
    var navLi = floorNav.getElementsByTagName("a");
    var floorFirst = document.getElementById("floor1");
    var gmFloor = document.getElementsByClassName("gm-floor");
    var floorNum = 0;
    window.onscroll = function () {
    	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //根据滚动距离判断在哪个楼层 
        if (scrollTop >= floorFirst.offsetTop) {
            floorNav.style.display = 'block';
        } else {
            floorNav.style.display = 'none';
        }
        for (var i = 0; i < gmFloor.length; i++) {
            if (scrollTop >= gmFloor[i].offsetTop) {
                floorNum = i;
            }
        }
        //更换楼层导航样式
        for (var i = 0; i < navLi.length; i++) {
            navLi[i].className = "";
        }
        navLi[floorNum].className = "active";


    //点击楼层导航，根据点击的导航滚动到指定楼层
    for (var i = 0; i < navLi.length; i++) {
        navLi[i].index = i;
        navLi[i].onclick = function () {
            for (var j = 0; j < navLi.length; j++) {
                navLi[j].className = "";
            }
            this.className = "active";
            var scrollTop = document.documentElement.scrollTop ||document.body.scrollTop ;
            goScroll(gmFloor[this.index].offsetTop ,scrollTop);
        }
    }
        //gm-top,gm-bottom
        var goTop = document.getElementsByClassName("gm-top")[0];
        var goBottom = document.getElementsByClassName("gm-bottom")[0];
        goTop.onclick = function(){
            goScroll(0,document.documentElement.scrollTop ||document.body.scrollTop);
        }
        goBottom.onclick = function(){
            goScroll(document.body.offsetHeight-650,document.documentElement.scrollTop ||document.body.scrollTop);
        }
    }
    function goScroll(target, Top,fun) {
        //保证当前元素只有一个定时器在运动，
        clearInterval(document.timer);
        document.timer = setInterval(function () {
            var speed = (target - Top) /10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (Top == target) {
                clearInterval(document.timer);
                fun && fun();
            }

            document.documentElement.scrollTop = document.body.scrollTop = Top + speed;
            Top = document.documentElement.scrollTop ||document.body.scrollTop ;
            console.log(Top);
        }, 30);
    }














    //----------------------------楼层------------------------------------------
    ajax("data/floor.txt",function(str){
        var gmFloor =document.getElementsByClassName('gm-floor');
        var floors = eval(str)[0].floor;  //楼层
        /*console.log(floors[0][0].length);*/
        for(var i = 0 ;i<gmFloor.length;i++){
            fnFloor(gmFloor[i]);
        }

        function fnFloor(obj){
            var floorMain = obj.getElementsByClassName('floor-main');
            for(var i = 1 ;i<floorMain.length;i++){
                var floorUl = document.createElement('ul');
                floorMain[i].appendChild(floorUl);
                floorUl.className = "floor-main-list";
                var str = '';
                for(var j = 0;j<floors[i-1][0].length;j++){
                    str += "<li><a href='#'><img src='"+floors[i-1][0][j].goods_img+" 'alt=''><p class='p-name'>"+floors[i-1][0][j].goods_name+"</p><p class='p-price'>"+floors[i-1][0][j].goods_price+"</p></a></li>";
                }
                floorUl.innerHTML = str;

            }

        }
    });
//----------------------------楼层图片切换---------------------------------------

    //切换图标
    function fnSwitch(btn,div,next){

        for(var i= 0 ;i<btn.length;i++){
            btn[i].index = i;
            btn[i].onmouseover = function(){
                 for(var j = 0 ;j<btn.length;j++){
                     btn[j].className = "";
                     div[j].style.display = 'none';
                 }

                btn[this.index].className = "active";
                 div[this.index].style.display = 'block';
                 index = this.index;
            }

        }
        //往右切换
        var index = 0;
        next.onclick = function(){
            index++;
            if(index == btn.length){ index = 0;}
            for(var j = 0 ;j<btn.length;j++){
                btn[j].className = "";
                div[j].style.display = 'none';
            }
            btn[index].className = "active";
            div[index].style.display = 'block';
        }
    }
    //----------------------------左边轮播---------------------------------------
    function sideShow(aLi,aSpan,aPrev,aNext){
        //点击小方块
        for(var i= 0 ;i<aSpan.length;i++) {
            aSpan[i].index = i;
            aSpan[i].onmouseover = function () {
                for (var j = 0; j < aSpan.length; j++) {
                    aSpan[j].className = "";
                    aLi[j].style.display = 'none';
                }

                aSpan[this.index].className = "hover";
                aLi[this.index].style.display = 'block';
                iNow = this.index;
            }
        }

            //左右切换
       var iNow = 0;
       aNext.onclick = function(){
            iNow++;
            if(iNow == aLi.length){
                iNow = 0;
            }
            for(var i = 0;i<aLi.length;i++){
                aLi[i].style.display = 'none';
                aSpan[i].className = "";
            }
            aSpan[iNow].className = "hover";
            aLi[iNow].style.display = 'block';
        }

        aPrev.onclick = function(){
            iNow--;
            if(iNow <0){
                iNow = aLi.length-1;
            }
            for(var i = 0;i<aLi.length;i++){
                aLi[i].style.display = 'none';
                aSpan[i].className = "";
            }
            aLi[iNow].style.display = 'block';
            aSpan[iNow].className = "hover";
        }

    }



    var floorUl = document.getElementsByClassName("floor-nav");
    var gmFloor = document.getElementsByClassName("gm-floor");

    for(var i = 0 ;i< floorUl.length;i++){
        var floorBtn = floorUl[i].getElementsByTagName("a");
        var floorDiv = gmFloor[i].getElementsByClassName("floor-main");
        var oNext = gmFloor[i].getElementsByTagName("i")[0];
        fnSwitch(floorBtn,floorDiv,oNext);


        var leftUl = gmFloor[i].getElementsByClassName("carousel")[0];
        var leftLi = leftUl.getElementsByTagName("li");
        var prev = gmFloor[i].getElementsByTagName("em")[0];
        var next = gmFloor[i].getElementsByTagName("em")[1];
        var floorWrap =gmFloor[i].getElementsByClassName("floor-wrap")[0];
        var leftSpan = floorWrap.getElementsByTagName("span");
        sideShow(leftLi,leftSpan,prev,next);


    }



}
