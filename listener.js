import { hexToRGB } from "./utils.js";
import { Object } from "./models.js"


function drawObject(object, objectManager){
    var gl = objectManager.gl;
    var program = objectManager.program;

    initBuffer(object, gl, program)

    gl.drawArrays(gl.LINES, 0, 2);
}

function initBuffer(object, gl, program){

    gl.useProgram(program)
    // Create Buffer
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.verticeArray), gl.STATIC_DRAW);

    /* Assosiating shader to buffer */
    /* Vertex */
    var vertexPosition = gl.getAttribLocation(program, 'coordinates');
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);


    /* Color */
    var colorInput = document.getElementById('color-picker').value;
    var color = gl.getUniformLocation(program, 'color');
    gl.uniform4fv(color, hexToRGB(colorInput));
}


export function canvasMouseDown(e, objectManager){
    var canvas = objectManager.canvas;
    var canvasPos = canvas.getBoundingClientRect();
    if(objectManager.drawLine){
        if(objectManager.verticeToPut>0){
            var vertice = objectManager.verticeHolder;
            var cords = getMouseCord(e, canvasPos);
            vertice.push(cords[0]/(canvas.clientWidth/2));
            vertice.push(cords[1]/(canvas.clientHeight/2));
            objectManager.verticeToPut = objectManager.verticeToPut -1;
        }
        if(objectManager.verticeToPut == 0){
            var line = new Object("line", 2, [0,0,0,1]);
            line.verticeArray = objectManager.verticeHolder;
            objectManager.verticeHolder = [];
            objectManager.objectList.push(line);
            drawObject(line, objectManager);
            objectManager.drawLine = false;
        }
    }
}


export function lineButton(e, objectManager){
    objectManager.drawLine = true;
    objectManager.verticeToPut = 2;
}

function getMouseCord(e, canvasPos){
    var left = canvasPos.left + canvasPos.width/2;
    var top = canvasPos.top + canvasPos.height/2;
    var x_mouse = (e.clientX - left);
    var y_mouse = -(e.clientY - top);
    return [x_mouse, y_mouse];
}

