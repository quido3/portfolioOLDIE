  startX = 0;
  startY = 0;
  width = window.innerWidth;
  height = window.innerHeight;
  
  function drawCanvas(x, y){
    var c = document.getElementById("canvas2");
    var ctx = c.getContext("2d");
    var img = new Image();
    img.src = "big_pic.jpg";
    startX += x;
    startY += y;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, startX, startY, width, height, 0, 0, width, height);
  }

  window.onload=function(){
    width = window.innerWidth;
    height = window.innerHeight;
    document.getElementsByTagName("canvas")[0].setAttribute("width", width);
    document.getElementsByTagName("canvas")[0].setAttribute("height", height);
    drawCanvas(0, 0);
  }

  window.onresize=function(){
    var c = document.getElementById("canvas2");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    width = window.innerWidth;
    height = window.innerHeight;
    document.getElementsByTagName("canvas")[0].setAttribute("width", width);
    document.getElementsByTagName("canvas")[0].setAttribute("height", height);
    drawCanvas(0, 0);
  }

  window.onkeydown = function(e) {
    var key = e.keyCode;
    var x = 0;
    var y = 0;

    if (key == 37){    //left
        x = -5;
    }
    if (key == 38){    //up
        y = -5;
    }
    if (key == 39){    //right
        x = 5;
    }
    if (key == 40){    //down
        y = 5;
    }
    drawCanvas(x, y);
  }
