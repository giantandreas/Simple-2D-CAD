import { getColorRGBA, getMouseCord } from "./utils.js";
import { Object } from "./models.js"


export function canvasMouseDown(e, objectManager){
    var canvas = objectManager.canvas;
    var canvasPos = canvas.getBoundingClientRect();

    /*Drawing Line */
    if(objectManager.drawLine){
        if(objectManager.verticeToPut>0){
            var cords = getMouseCord(e, canvasPos);
            if(objectManager.objectInDraw.verticeArray.length < 2){
                objectManager.objectInDraw.verticeArray.push(cords[0]);
                objectManager.objectInDraw.verticeArray.push(cords[1]);
            }else{
                objectManager.objectInDraw.verticeArray[2] = cords[0];
                objectManager.objectInDraw.verticeArray[3] = cords[1];
            }
            
            objectManager.verticeToPut = objectManager.verticeToPut -1;
            objectManager.isDrawing = true;
        }
        if(objectManager.verticeToPut == 0){
            var line = objectManager.objectInDraw;

            objectManager.objectList.push(line)
            objectManager.objectInDraw = null;
            line.drawObject(objectManager);

            objectManager.drawLine = false;
            objectManager.isDrawing = false;
        }
    }
    /* Drawing Square */
    if(objectManager.drawSquare){
        if(objectManager.verticeToPut>0){
            /* Store the vertice coordinates to the object vertice array */
            var cords = getMouseCord(e, canvasPos);
            if(objectManager.objectInDraw.verticeArray.length < 2){
                objectManager.objectInDraw.verticeArray.push(cords[0]);
                objectManager.objectInDraw.verticeArray.push(cords[1]);
            }else{
                objectManager.objectInDraw.verticeArray[2] = cords[0];
                objectManager.objectInDraw.verticeArray[3] = cords[1];
            }
            
            objectManager.verticeToPut = objectManager.verticeToPut -1;
            objectManager.isDrawing = true;
        }
        if(objectManager.verticeToPut == 0){
            var square = objectManager.objectInDraw;

            objectManager.objectList.push(square);
            objectManager.objectInDraw = null;
            square.drawObject(objectManager);

            objectManager.square = false;
            objectManager.isDrawing = false;
        }
    }

}

export function canvasMouseMove(e, objectManager){
    var canvas = objectManager.canvas;
    var canvasPos = canvas.getBoundingClientRect();
    
    /* Drawing line  */
    if(objectManager.drawLine && objectManager.isDrawing){
        // draw line dynamicly
        var cords = getMouseCord(e, canvasPos);
        objectManager.objectInDraw.verticeArray[2] = cords[0];
        objectManager.objectInDraw.verticeArray[3] = cords[1];
        objectManager.reDrawAll();
    }
}

export function lineButton(e, objectManager){
    objectManager.drawLine = true;
    var color = getColorRGBA();
    var line = new Object("line", [], color);
    objectManager.objectInDraw = line;
    objectManager.verticeToPut = 2;
}

export function squareButton(e, objectManager){
    objectManager.drawSquare = true;
    var color = getColorRGBA();
    var square = new Object("square", [], color);
    objectManager.objectInDraw = square;
    objectManager.verticeToPut = 2;
}
