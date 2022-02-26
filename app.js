import { programFunction } from "./shaders.js";
import { hexToRGB } from "./utils.js";
import {init} from "./init.js";
import { canvasMouseDown, lineButton } from "./listener.js";
import {ObjectManager} from "./models.js"

function main() {
    /*INITIATION*/
    const canvasGl = init();
    const canvas = canvasGl[0];
    const gl = canvasGl[1];
  
    // Only continue if WebGL is available and working
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }

    /* VertexShader, FragmentShader, Program */
    var program = programFunction(gl);
    gl.useProgram(program);

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

    var objectManager = new ObjectManager(gl, canvas, program);
    document.getElementById("canvas").addEventListener("mousedown", function(e){
      canvasMouseDown(e, objectManager);
    });

    document.getElementById("line-button").addEventListener("click", function(e){
      lineButton(e, objectManager);
    })
}

main()