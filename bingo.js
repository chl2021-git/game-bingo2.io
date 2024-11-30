$(function () {
  "use strict";

  var max = 50; // 默认最大值
  var bingo = [];
  var status = true;
  var roulette, random, number, result;
  var $number = $("#number");
  var $result = $("#result");
  var $sound_play = $("#sound-play");
  var $sound_pause = $("#sound-pause");

  // 初始化数字列表
  function initializeBingo() {
    bingo = [];
    $number.empty();
    for (var i = 1; i <= max; i++) {
      bingo.push(i);
      $number.append($("<li>").text(("0" + i).slice(-2)));
    }
  }

  // 初始调用
  initializeBingo();

  // 设置最大值事件
  $("#set-max").on("click", function () {
    var inputValue = parseInt($("#max-value").val(), 10);
    if (inputValue > 0) {
      max = inputValue; // 更新最大值
      initializeBingo(); // 重新初始化
      $result.text(""); // 清空结果显示
    } else {
      alert("Please enter a valid number greater than 0.");
    }
  });

  // 按钮点击事件
  $("#button").on("click", function () {
    if (status) {
      status = false;
      $(this).text("STOP");
      $sound_play.trigger("play");
      $sound_pause.trigger("pause");
      $sound_pause[0].currentTime = 0;

      roulette = setInterval(function () {
        random = Math.floor(Math.random() * bingo.length);
        number = bingo[random];
        $result.text(number);
      }, 10);
    } else {
      status = true;
      $(this).text("START");
      $sound_pause.trigger("play");
      $sound_play.trigger("pause");
      $sound_play[0].currentTime = 0;

      clearInterval(roulette);

      result = bingo[random];
      bingo.splice(random, 1);

      $result.text(result);
      $number.find("li").eq(parseInt(result, 10) - 1).addClass("hit");
    }
  });
});
