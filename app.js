import { programFunction } from "./shaders.js";
import {init} from "./init.js";
import { canvasMouseDown, lineButton, canvasMouseMove, rectangleButton, squareButton, polygonButton, enterListener, escapeListener, selectListener } from "./listener.js";
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

    /* Create an Object Manager */
    var objectManager = new ObjectManager(gl, canvas, program);

    /* Binding button and canvas listener */
    /* Canvas mouse down */
    document.getElementById("canvas").addEventListener("mousedown", function(e){
      canvasMouseDown(e, objectManager);
    });

    /* Canvas mouse move */
    document.getElementById("canvas").addEventListener("mousemove", function(e){
      canvasMouseMove(e, objectManager);
    });

    /* Line Button */
    document.getElementById("line-button").addEventListener("click", function(e){
      lineButton(e, objectManager);
    });

    /* Square Button*/
    document.getElementById("square-button").addEventListener("click", function(e){
      squareButton(e, objectManager);
    })

    /* Rectangle Button*/
    document.getElementById("rectangle-button").addEventListener("click", function(e){
      rectangleButton(e, objectManager);
    })

    /* Polygon Button */
    document.getElementById("polygon-button").addEventListener("click", function(e){
      polygonButton(e, objectManager);
    })

    document.addEventListener('keypress', function(e){
      enterListener(e, objectManager);
    });

    document.getElementById("select-button").addEventListener("click", function(e){
      selectListener(e, objectManager);
    })


}

main()