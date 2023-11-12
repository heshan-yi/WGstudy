window.addEventListener("load", function () {
  var arrow_l = document.querySelector(".arrow-l");
  var arrow_r = document.querySelector(".arrow-r");
  var slide = document.querySelector(".slide");
  var slideWidth = slide.offsetWidth;
  slide.addEventListener("mouseenter", function () {
    arrow_l.style.display = "block";
    arrow_r.style.display = "block";
    clearInterval(timer); //定时器控制
    timer = null; //清除定时器变量
  });
  slide.addEventListener("mouseleave", function () {
    arrow_l.style.display = "none";
    arrow_r.style.display = "none";
    //开启定时器
    timer = setInterval(function () {
      //手动调用点击事件
      arrow_r.click();
    }, 2000);
  });
  //2.动态生成小圆圈
  var ul = slide.querySelector("ul");
  var circle = slide.querySelector(".circle");
  // console.log(ul.children.length);
  for (var i = 0; i < ul.children.length; i++) {
    //创建li
    var li = document.createElement("li");
    //小圆圈索引自定义属性获取
    li.setAttribute("index", i);
    circle.appendChild(li);
    li.addEventListener("click", function () {
      for (var i = 0; i < circle.children.length; i++) {
        circle.children[i].className = "";
      }
      this.className = "current";
      //图片移动
      var index = this.getAttribute("index");
      //bug修复 num follow赋值
      num = index;
      follow = index;
      console.log(slideWidth);
      animate(ul, -index * slideWidth);
    });
  }
  circle.children[0].className = "current";
  //克隆第一张图片
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  //无缝衔接
  var num = 0;
  var follow = 0; //控制小圆圈的播放
  var flag = true;
  arrow_r.addEventListener("click", function () {
    if (flag) {
      flag = false; //关水龙头
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * slideWidth, function () {
        flag = true;
      });
      follow++;
      //follow=4开启循环
      if (follow == circle.children.length) {
        follow = 0;
      }
      //调用函数
      circleChange();
    }
  });
  //左侧按钮
  arrow_l.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * slideWidth + "px";
      }
      num--;
      animate(ul, -num * slideWidth, function () {
        flag = true;
      });
      follow--;
      //follow=4开启循环
      if (follow < 0) {
        follow = circle.children.length - 1;
      }
      circleChange();
    }
  });
  function circleChange() {
    //小圆圈排他
    for (var i = 0; i < circle.children.length; i++) {
      circle.children[i].className = "";
    }
    circle.children[follow].className = "current";
  }
  //自动播放
  var timer = setInterval(function () {
    //手动调用点击事件
    arrow_r.click();
  }, 2000);
});
