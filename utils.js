/*************************************Utils****************************************/

function hexToRGB(hex){
    var r = parseInt(hex[1]+hex[2], 16);
    var g = parseInt(hex[3]+hex[4], 16);
    var b = parseInt(hex[5]+hex[6], 16);

    return [r/255,g/255,b/255,1];
}

function getMouseCord(e, canvasPos){
    var left = canvasPos.left + canvasPos.width/2;
    var top = canvasPos.top + canvasPos.height/2;
    var x_mouse = (e.clientX - left);
    var y_mouse = -(e.clientY - top);
    return [x_mouse/(canvas.clientWidth/2), y_mouse/(canvas.clientHeight/2)];
}

function getColorRGBA(){
    var colorInput = document.getElementById('color-picker').value;
    return hexToRGB(colorInput);
}

/***********************************************************************************/


// var canvasPos = canvas.getBoundingClientRect()
// console.log(canvasPos);
// var left = canvasPos.left + canvasPos.width/2;
// var top = canvasPos.top + canvasPos.height/2;
// canvas.addEventListener("mousedown", function(e){
//   var canvasPos = canvas.getBoundingClientRect()
//   var x_mouse = (e.clientX - left);
//   var y_mouse = -(e.clientY - top);
//   console.log("x client: "+e.clientX);
//   console.log("y client: "+e.clientY);
//   console.log("x: "+x_mouse);
//   console.log("y: "+y_mouse);
// })

/********************************************/

// // vertice
// var vertice = [
//   -0.1, -0.1,
// 	0.1, -0.1,
// 	0.1, 0.1,
//   0.1, 0.1,
//   -0.1, 0.1,
//   -0.1, -0.1
// ];

// // buffer
// var vertexBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertice), gl.STATIC_DRAW);

// // assosiating shader to buffer
// /* Vertex */
// var vertexPosition = gl.getAttribLocation(program, 'coordinates');
// gl.enableVertexAttribArray(vertexPosition);
// gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);

// /* Color */
// var colorInput = document.getElementById('color-picker').value;
// var color = gl.getUniformLocation(program, 'color');
// gl.uniform4fv(color, hexToRGB(colorInput));

// gl.drawArrays(gl.TRIANGLES, 0, 6);