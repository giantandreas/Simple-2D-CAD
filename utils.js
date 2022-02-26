/*************************************Utils****************************************/

export function hexToRGB(hex){
    var r = parseInt(hex[1]+hex[2], 16);
    var g = parseInt(hex[3]+hex[4], 16);
    var b = parseInt(hex[5]+hex[6], 16);

    return [r/255,g/255,b/255,1];
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