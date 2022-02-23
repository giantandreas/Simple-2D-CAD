import { programFunction } from "./shaders.js";
import { hexToRGB } from "./utils.js";

function main() {
    /*INITIATION*/
    // canvas
    const canvas = document.getElementById("canvas");

    // resizing canvas
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Initialize WebGL, setting context
    const gl = canvas.getContext("webgl");
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	  gl.enable( gl.DEPTH_TEST );
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.viewport(0, 0, canvas.width, canvas.height);
  
    // Only continue if WebGL is available and working
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
    /* ################################################ */
    

    /* VertexShader, FragmentShader, Program */
    // shaders
    var program = programFunction(gl);
    gl.useProgram(program);

    /********************************************/

    // vertice
    var vertice = [
      -0.1, -0.1,
    	0.1, -0.1,
    	0.1, 0.1,
      0.1, 0.1,
      -0.1, 0.1,
      -0.1, -0.1
    ];
    
    // buffer
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertice), gl.STATIC_DRAW);

    // assosiating shader to buffer
    /* Vertex */
    program.vertexPosition = gl.getAttribLocation(program, 'coordinates');
    gl.enableVertexAttribArray(program.vertexPosition);
    gl.vertexAttribPointer(program.vertexPosition, 2, gl.FLOAT, false, 0, 0);
    
    /* Color */
    var colorInput = document.getElementById('color-picker').value;
    program.color = gl.getUniformLocation(program, 'color');
    gl.uniform4fv(program.color, hexToRGB(colorInput));
    console.log(hexToRGB(colorInput));

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

main()