window.onload = function () {
  /**
   * 懒加载函数：需要调用的时候，根据不同的条件进行返回相应的返回值
   **/
  (function () {
    if (window.innerHeight) {
      client = (function () {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      })();
    } else if (document.compatMode === "CSS!Compat") {
      client = (function () {
        return {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight
        };
      })();
    } else {
      client = (function () {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
      })();
    }
  })();
};