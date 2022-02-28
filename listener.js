import { getColorRGBA, getMouseCord } from "./utils.js";
import { Object } from "./models.js"


export function canvasMouseDown(e, objectManager){
    var canvas = objectManager.canvas;
    var canvasPos = canvas.getBoundingClientRect();

    /*Draw Line */
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

    /* Draw Square */
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
            square.resolveSquareVertice();
            square.drawObject(objectManager);

            objectManager.drawSquare = false;
            objectManager.isDrawing = false;
        }
    }

    /* Draw Rectangle */
    if(objectManager.drawRectangle){
        if(objectManager.verticeToPut>0){
            /* Store the vertice coordinates to the object vertice array */
            var cords = getMouseCord(e, canvasPos);
            if(objectManager.objectInDraw.verticeArray.length < 2){
                objectManager.objectInDraw.verticeArray.push(cords[0]);
                objectManager.objectInDraw.verticeArray.push(cords[1]);
            }else{
                objectManager.objectInDraw.verticeArray[4] = cords[0];
                objectManager.objectInDraw.verticeArray[5] = cords[1];
            }
            
            objectManager.verticeToPut = objectManager.verticeToPut -1;
            objectManager.isDrawing = true;
        }
        if(objectManager.verticeToPut == 0){
            var rectangle = objectManager.objectInDraw;

            objectManager.objectList.push(rectangle);
            objectManager.objectInDraw = null;
            rectangle.drawObject(objectManager);

            objectManager.drawRectangle = false;
            objectManager.isDrawing = false;
        }
    }

    /* Draw Polygon */
    if(objectManager.drawPolygon){
        if(objectManager.verticeToPut >0){
            var i = objectManager.verticeToPut;
            var cords = getMouseCord(e, canvasPos);
            objectManager.objectInDraw.verticeArray[2*(i-1)] = cords[0];
            objectManager.objectInDraw.verticeArray[2*(i-1) +1] = cords[1];

            objectManager.verticeToPut = objectManager.verticeToPut +1;
            objectManager.isDrawing = true;
        }

        if(objectManager.verticeToPut == 0){
            var polygon = objectManager.objectInDraw;

            objectManager.objectList.push(polygon);
            objectManager.objectInDraw = null;
            polygon.drawObject(objectManager);

            objectManager.drawPolygon = false;
            objectManager.isDrawing = false;
        }
    }
    /* Selecting Vertice */
    if(objectManager.select){
        /* If a vertex has selected */
        if(objectManager.isDrawing){
            objectManager.isDrawing = false
            objectManager.select = false;
            objectManager.selectedIndex = null;
            objectManager.selectedObject = null;
            objectManager.reDrawAll();
            return;
        }
        var cords = getMouseCord(e, canvasPos);
        var threshold = 10/objectManager.canvas.width;

        objectManager.objectList.forEach(object => {
            for(let i=0; i < object.verticeArray.length; i+=2){
                if(Math.abs(object.verticeArray[i]-cords[0])<= threshold && Math.abs(object.verticeArray[i+1]-cords[1])<= threshold){                    
                    objectManager.selectedObject = object;
                    objectManager.selectedIndex = i;
                    objectManager.isDrawing = true;
                    // console.log("index: "+i);
                    // console.log("mouse: " + cords);
                    // console.log("selectedV: "+[object.verticeArray[i], object.verticeArray[i+1]]);
                    // console.log("threshold: "+threshold);

                    return;
                }
            }
        });
    }

    /* Change Color */
    if(objectManager.changeColor){
        var canvasWidth = canvas.width;
        var cords = getMouseCord(e, canvasPos);
        var color = getColorRGBA();
        var found = false;

        objectManager.objectList.forEach(object =>{
            console.log(object.verticeArray);
            if(object.isInside(cords, canvasWidth)){
                if(!found){
                    object.color = color;
                }
            }
        })
        objectManager.reDrawAll();
        objectManager.changeColor = false;
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

    /* Drawing Square  */
    if(objectManager.drawSquare && objectManager.isDrawing){
        // draw square dynamicly
        var cords = getMouseCord(e, canvasPos);
        objectManager.objectInDraw.verticeArray[4] = cords[0];
        objectManager.objectInDraw.verticeArray[5] = cords[1];
        objectManager.objectInDraw.resolveSquareVertice();
        objectManager.reDrawAll();
    }

    /* Drawing Rectangle  */
    if(objectManager.drawRectangle && objectManager.isDrawing){
        // draw rectangle dynamicly
        var cords = getMouseCord(e, canvasPos);
        objectManager.objectInDraw.verticeArray[4] = cords[0];
        objectManager.objectInDraw.verticeArray[5] = cords[1];
        objectManager.objectInDraw.resolveRectangleVertice();
        objectManager.reDrawAll();
    }

    /* Drawing Polygon */
    if(objectManager.drawPolygon && objectManager.isDrawing){
        // draw rectangle dynamicly
        var cords = getMouseCord(e, canvasPos);
        var i = objectManager.verticeToPut;
        objectManager.objectInDraw.verticeArray[2*(i-1)] = cords[0];
        objectManager.objectInDraw.verticeArray[2*(i-1)+1] = cords[1];
        objectManager.reDrawAll();
    }

    /* Moving Vertex */
    if(objectManager.select && objectManager.isDrawing){
        var cords = getMouseCord(e, canvasPos);
        var index = objectManager.selectedIndex;
        objectManager.selectedObject.verticeArray[index] = cords[0];
        objectManager.selectedObject.verticeArray[index+1] = cords[1];
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

export function rectangleButton(e, objectManager){
    objectManager.drawRectangle = true;
    var color = getColorRGBA();
    var rectangle = new Object("rectangle", [], color);
    objectManager.objectInDraw = rectangle;
    objectManager.verticeToPut = 2;
}

export function polygonButton(e, objectManager){
    objectManager.drawPolygon = true;
    var color = getColorRGBA();
    var polygon = new Object("polygon", [], color);
    objectManager.objectInDraw = polygon;
    objectManager.verticeToPut = 1;
}

export function enterListener(e, objectManager){
    if(objectManager.drawPolygon && objectManager.isDrawing){
        var polygon = objectManager.objectInDraw;

        objectManager.objectList.push(polygon);
        objectManager.objectInDraw = null;
        polygon.drawObject(objectManager);

        objectManager.drawPolygon = false;
        objectManager.isDrawing = false;
        
        objectManager.verticeToPut = 0;

    }

}

export function escapeListener(e, objectManager){
    if(objectManager.isDrawing){
        objectManager.objectInDraw = null;
        objectManager.isDrawing = false;
        objectManager.drawLine = false;
        objectManager.drawSquare = false;
        objectManager.drawRectangle = false;
        objectManager.drawPolygon = false;
        objectManager.verticeToPut = 0;
    }
}

export function selectListener(e, objectManager){
    objectManager.select = true;
}

export function changeColorButton(e, objectManager){
    objectManager.changeColor = true;
    console.log("change color")
}

export function saveButton(e, objectManager){
    var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(objectManager.objectList));
    var downloadElement = document.createElement('a');
    downloadElement.setAttribute("href", data);
    downloadElement.setAttribute("download", "download.json")
    document.body.append(downloadElement);
    downloadElement.click();
    downloadElement.remove();
}

export function loadButton(e, objectManager){
    var file = document.getElementById("file-input").files[0];

    if(file){
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function(evt){
            var contents = evt.target.result;
            var objects = JSON.parse(contents);
            objectManager.objectList = []
            console.log(objectManager.objectList);
            objects.forEach(function(obj){
                objectManager.objectList.push(new Object(obj.type, obj.verticeArray, obj.color));
            })
            
            objectManager.reDrawAll();
        }
    }else{
        alert("Load file failed");
    }

}
