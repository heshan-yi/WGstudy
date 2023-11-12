window.addEventListener("load", function () {
  var focus = this.document.querySelector(".focus");
  var ul = focus.children[0];
  var ol = focus.children[1];

  var w = focus.offsetWidth;
  //1.定时器
  var index = 0;
  var timer = setInterval(function () {
    index++;
    var translatex = -index * w;
    ul.style.transition = "all.3s";
    ul.style.transform = "translateX(" + translatex + "px)";
  }, 2000);
  ul.addEventListener("transitionend", function () {
    //2.无缝滚动
    if (index >= 3) {
      index = 0;
      ul.style.transition = "none";
      var translatex = -index * w;
      ul.style.transform = "translateX(" + translatex + "px)";
    } else if (index < 0) {
      index = 2;
      ul.style.transition = "none";
      var translatex = -index * w;
      ul.style.transform = "translateX(" + translatex + "px)";
    }
    //3.小圆点跟随
    ol.querySelector(".current").classList.remove("current");
    ol.children[index].classList.add("current");
  });
  //4.手指滑动
  var stratX = 0;
  var moveX = 0;
  var flag = false;
  //触摸活得初始坐标
  ul.addEventListener("touchstart", function (e) {
    stratX = e.targetTouches[0].pageX;
    clearInterval(timer); //手指触摸停止计时器
  });
  //手指移动计算
  ul.addEventListener("touchmove", function (e) {
    moveX = e.targetTouches[0].pageX - stratX;
    //移动盒子
    var translatex = -index * w + moveX;
    //手指不需要过渡
    ul.style.transition = "none";
    ul.style.transform = "translateX(" + translatex + "px)";
    flag = true; //手指移动则判断
    e.preventDefault(); //阻止屏幕滚动效果
  });
  //5.回弹和播放
  ul.addEventListener("touchend", function (e) {
    if (flag) {
      if (Math.abs(moveX) > 50) {
        //右划播放上一张 moveX正
        if (moveX > 0) {
          index--;
        } else {
          index++;
        }
        //左划播放下一张 moveX负
        var translatex = -index * w;
        ul.style.transition = "all.3s";
        ul.style.transform = "translateX(" + translatex + "px)";
      } else {
        //回弹
        var translatex = -index * w;
        ul.style.transition = "all.1s";
        ul.style.transform = "translateX(" + translatex + "px)";
      }
    }
    //开启定时器
    clearInterval(timer);
    timer = setInterval(function () {
      index++;
      var translatex = -index * w;
      ul.style.transition = "all.3s";
      ul.style.transform = "translateX(" + translatex + "px)";
      console.log(ul.style.transform);
    }, 2000);
  });
});
