import { programFunction } from "./shaders.js";
import {init} from "./init.js";
import { canvasMouseDown, lineButton, canvasMouseMove } from "./listener.js";
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

    var objectManager = new ObjectManager(gl, canvas, program);
    document.getElementById("canvas").addEventListener("mousedown", function(e){
      canvasMouseDown(e, objectManager);
    });

    document.getElementById("canvas").addEventListener("mousemove", function(e){
      canvasMouseMove(e, objectManager);
    });

    document.getElementById("line-button").addEventListener("click", function(e){
      lineButton(e, objectManager);
    })

}

main()