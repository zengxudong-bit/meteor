(function (window, document, undefined) {
  window.onload = function () {
    window.requestAnimationFrame = (function () {
      // 有了这句话，就形成了递归调用，设置应为这个函数多用在持续的动画中
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          setTimeout(callback, 1000 / 60);
        }
      );
    })();

    var stars = document.getElementById("stars");

    // js随机生成流星
    for (var j = 0; j < 30; j++) {
      var newStar = document.createElement("div");
      newStar.className = "star";
      newStar.style.top = randomDistance(300, -100) + "px";
      newStar.style.left = randomDistance(1600, 300) + "px";
      stars.appendChild(newStar);
    }

    // 封装随机数方法
    function randomDistance(max, min) {
      var distance = Math.floor(Math.random() * (max - min + 1) + min);
      return distance;
    }

    var star = document.getElementsByClassName("star");

    // 给流星添加动画延时
    for (var i = 0, len = star.length; i < len; i++) {
      star[i].style.animationDelay = i % 6 == 0 ? "0s" : i * 0.8 + "s";
    }

    // =======================================================
    let meteor = [];
    gameloop();

    window.onclick = function (event) {
      createMeteor(event);
      toggleSound();//因为部分浏览器禁止自动播放，所以判断没有播放就可通过点击触发
    };

    // 创建星星
    function createMeteor(event) {
      let span = document.createElement("span");
      span.className = "star-five";
      meteor.push({
        el: span,
        x: event.clientX - 5,
        y: event.clientY - 5,
        scale: 1,
        alpha: 1,
      });
      document.body.appendChild(span);
    }

    function gameloop() {
      for (var i = 0; i < meteor.length; i++) {
        if (meteor[i].alpha <= 0) {
          document.body.removeChild(meteor[i].el);
          meteor.splice(i, 1);
          continue;
        }
        // meteor[i].y--;
        meteor[i].scale += 0.04;
        meteor[i].alpha -= 0.013;
        meteor[i].el.style.cssText =
          "left:" +
          meteor[i].x +
          "px;top:" +
          meteor[i].y +
          "px;opacity:" +
          meteor[i].alpha +
          ";transform:scale(" +
          meteor[i].scale +
          "," +
          meteor[i].scale +
          ");";
      }
      requestAnimationFrame(gameloop);
    }

    // ==============================================================
    // 弹幕的内容
    var barrages = [
      "空降成功",
      "真香警告",
      "温馨提示，前方请调高音量/赶紧戴耳机",
      "弹幕护体！弹幕护体！弹幕护体！",
      "刘思琪，也许我们再也遇不到了，但是我还是想说，我喜欢你！",
      "前方高能",
      "我从未见过如此厚颜无耻之人",
      "完结撒花",
      "空降成功",
      "真香警告",
      "温馨提示，前方请调高音量/赶紧戴耳机",
      "弹幕护体！弹幕护体！弹幕护体！",
      "刘思琪，也许我们再也遇不到了，但是我还是想说，我喜欢你！",
      "前方高能",
      "我从未见过如此厚颜无耻之人",
      "完结撒花",
      "空降成功",
      "真香警告",
      "温馨提示，前方请调高音量/赶紧戴耳机",
      "弹幕护体！弹幕护体！弹幕护体！",
      "刘思琪，也许我们再也遇不到了，但是我还是想说，我喜欢你！",
      "前方高能",
      "我从未见过如此厚颜无耻之人",
      "完结撒花",
      "空降成功",
      "真香警告",
      "温馨提示，前方请调高音量/赶紧戴耳机",
      "弹幕护体！弹幕护体！弹幕护体！",
      "刘思琪，也许我们再也遇不到了，但是我还是想说，我喜欢你！",
      "前方高能",
      "我从未见过如此厚颜无耻之人",
      "完结撒花",
      "空降成功",
      "真香警告",
      "温馨提示，前方请调高音量/赶紧戴耳机",
      "弹幕护体！弹幕护体！弹幕护体！",
      "刘思琪，也许我们再也遇不到了，但是我还是想说，我喜欢你！",
      "前方高能",
      "我从未见过如此厚颜无耻之人",
      "完结撒花",
      "空降成功",
      "真香警告",
      "温馨提示，前方请调高音量/赶紧戴耳机",
      "弹幕护体！弹幕护体！弹幕护体！",
      "刘思琪，也许我们再也遇不到了，但是我还是想说，我喜欢你！",
      "前方高能",
      "我从未见过如此厚颜无耻之人",
      "完结撒花",
      "空降成功",
      "真香警告",
      "温馨提示，前方请调高音量/赶紧戴耳机",
      "弹幕护体！弹幕护体！弹幕护体！",
      "刘思琪，也许我们再也遇不到了，但是我还是想说，我喜欢你！",
      "前方高能",
      "我从未见过如此厚颜无耻之人",
      "完结撒花",
      "刘思琪，也许我们再也遇不到了，但是我还是想说，我喜欢你！",
    ];
    const wrapper = document.querySelector(".barrage-wrapper");
    for (const item of barrages) {
      const block = document.createElement("div");
      block.classList.add("block");
      block.style.top = randomDistance(700, -50) + "px"; // 弹幕的位置不能超过容器的高度
      block.style.animation = `barrage ${randomDistance(
        50,
        0
      )}s linear ${randomDistance(60, 0)}s`; // 随机动画效果
      block.textContent = item;
      wrapper.appendChild(block);
    }

    // ================================================================================
    // 解决部分浏览器无法自动播放的问题
    function toggleSound() {
      var music = document.getElementById("mp3"); //获取ID
      if (music.paused) {//判读是否播放
        music.paused = false;
        music.play(); //没有就播放
      }
    }
  };
})(window, document);
