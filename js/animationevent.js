////animation
///点animetion
var animezp = TweenMax.to(
  bmesh.position,
  10, //秒数
  {
    y: 0,
    ease: Power0.easeNone,
    repeat: -1,
    yoyo: true,
    onUpdate: function() {
      const progress = this.progress();
      progress2 = Math.round((5 - progress * 5) * 10) / 10;
      document.getElementById("textz").innerText = progress2;
    }
  }
);
var animexp = TweenMax.to(
  amesh.position,
  10, //秒数
  {
    z: 0,
    ease: Power0.easeNone,
    repeat: -1,
    yoyo: true,
    onUpdate: function() {
      const progress = this.progress();
      progress2 = Math.round((5 - progress * 5) * 10) / 10;
      document.getElementById("textx").innerText = progress2;
    }
  }
);

var animeyp = TweenMax.to(
  cmesh.position,
  10, //秒数
  {
    x: 0,
    ease: Power0.easeNone,
    repeat: -1,
    yoyo: true,
    onUpdate: function() {
      const progress = this.progress();
      progress2 = Math.round((5 - progress * 5) * 10) / 10;
      document.getElementById("texty").innerText = progress2;
    }
  }
);
var animenr = TweenMax.fromTo(
  normal.rotation,
  10, //秒数
  {
    x: -0.6
  },
  {
    x: -Math.PI / 2,
    ease: Power0.easeNone,
    repeat: -1,
    yoyo: true
  }
);
var animenp = TweenMax.to(
  normal.position,
  10, //秒数
  {
    y: Math.cos(Math.PI / 2),
    z: Math.cos(Math.PI / 2),
    ease: Power0.easeNone,
    repeat: -1,
    yoyo: true
  }
);
////aマーカ読み取り時のイベント
smoothedControls.addEventListener("becameVisible", function() {
  document.getElementById("textx").innerText = "5";
  document.getElementById("texty").innerText = "5";
  document.getElementById("textz").innerText = "5";
  animeyp.pause(0);
  animenp.pause(0);
  animenr.pause(0);
  animexp.pause(0);
  animezp.pause(0);
  ///環境光
  for (var i = 0; i < 2; i++) {
    lightobj[i].visible = true;
  }
  ///object
  for (var k = 0; k < 4; k++) {
    object[k].visible = true;
  }
  ///軸表示
  for (var j = 0; j < 9; j++) {
    axisArray[j].visible = true;
  }
  ///grid
  //xy
  xygrid.addEventListener("click", function() {
    gridArray[0].visible = true;
  });
  xygrid.addEventListener("touchstart", function() {
    gridArray[0].visible = true;
  });
  //yz
  yzgrid.addEventListener("click", function() {
    for (var l = 1; l < 3; l++) {
      gridArray[l].visible = true;
    }
  });
  yzgrid.addEventListener("touchstart", function() {
    for (var l = 1; l < 3; l++) {
      gridArray[l].visible = true;
    }
  });
  //xz
  xzgrid.addEventListener("click", function() {
    for (var l = 3; l < 5; l++) {
      gridArray[l].visible = true;
    }
  });
  xzgrid.addEventListener("touchstart", function() {
    for (var l = 3; l < 5; l++) {
      gridArray[l].visible = true;
    }
  });
  //cancel
  gridcancel.addEventListener("touchstart", function() {
    for (var i = 0; i < 5; i++) {
      gridArray[i].visible = false;
    }
  });
  gridcancel.addEventListener("click", function() {
    for (var i = 0; i < 5; i++) {
      gridArray[i].visible = false;
    }
  });
  zmove.addEventListener("click", function() {
    animezp.play(0);
    animenp.play(0);
    animenr.play(0);
  });
  zmove.addEventListener("touchstart", function() {
    animezp.play(0);
    animenp.play(0);
    animenr.play(0);
  });
  xmove.addEventListener("click", function() {
    animexp.play(0);
  });
  xmove.addEventListener("touchstart", function() {
    animexp.play(0);
  });
  ymove.addEventListener("click", function() {
    animeyp.play(0);
  });
  ymove.addEventListener("touchstart", function() {
    animeyp.play(0);
  });
  animestop.addEventListener("click", function() {
    animeyp.pause(0);
    animenp.pause(0);
    animenr.pause(0);
    animexp.pause(0);
    animezp.pause(0);
    document.getElementById("textx").innerText = "5";
    document.getElementById("texty").innerText = "5";
    document.getElementById("textz").innerText = "5";
  });
  animestop.addEventListener("touchstart", function() {
    animeyp.pause(0);
    animenp.pause(0);
    animenr.pause(0);
    animexp.pause(0);
    animezp.pause(0);
    document.getElementById("textx").innerText = "5";
    document.getElementById("texty").innerText = "5";
    document.getElementById("textz").innerText = "5";
  });
});

////aマーカ非読み取り時のイベント
smoothedControls.addEventListener("becameUnVisible", function() {
  animeyp.pause(0);
  animenp.pause(0);
  animenr.pause(0);
  animexp.pause(0);
  animezp.pause(0);
  document.getElementById("textx").innerText = "";
  document.getElementById("texty").innerText = "";
  document.getElementById("textz").innerText = "";
  for (var i = 0; i < 2; i++) {
    lightobj[i].visible = false;
  }
  for (var j = 0; j < 9; j++) {
    axisArray[j].visible = false;
  }
  for (var k = 0; k < 4; k++) {
    object[k].visible = false;
  }
});
