function animate(obj, target, callback) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    //缓动动画 step
    //小数问题
    var step = (target - obj.offsetLeft) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.offsetLeft == target) {
      clearInterval(obj.timer);
      //回调
      // if (callback) {
      //   callback();
      // }
      callback && callback(); //短路运算符
    }
    obj.style.left = obj.offsetLeft + step + "px";
  }, 15);
}
