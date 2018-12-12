function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
//运动框架
function fnMove(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        for(var attr in json) {
            var tag = true;//假设所有属性都已到达目标点
            if (attr == 'opacity') {
                var cur = parseInt(getStyle(obj, attr) * 100);
            } else {
                var cur = parseInt(getStyle(obj, attr));
            }
            var speed = (json[attr] - cur) / 10;
            speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur != json[attr]) tag=false;
            if (attr == 'opacity') {
                obj.style[attr] = (cur + speed) / 100;
            }
            else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
        if(tag){
            clearInterval(obj.timer);
            if(fn) fn();
        }
    },30);
};

//ajax函数
function ajax(url,fnOk,fnNo){
    var ajax = new XMLHttpRequest();
    ajax.open('GET',url,true);
    ajax.send();
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                fnOk && fnOk(ajax.response);
            }else{
                fnNo && fnNo(ajax.status);
            }
        }
    }

};