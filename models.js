export class Object{
    constructor(type, verticeArray, color){
        this.type = type;
        this.numVertices = verticeArray.length/2;
        this.color = color;
        this.verticeArray = verticeArray;
    }

    changeColor(color){
        this.color = color;
        // implement change color in the canvas
    }

    resolveSquareVertice(){
        var v1 = [];
        var v2 = [];
        var v3 = [];
        var v4 = [];
        
        var x = Math.abs(this.verticeArray[0] - this.verticeArray[4]);
        var y = Math.abs(this.verticeArray[1] - this.verticeArray[5]);
        if(y > x){
            x = y;
        }
        var v1 = [this.verticeArray[0], this.verticeArray[1]];
        if(this.verticeArray[4] - this.verticeArray[0] >= 0){
            var v2 = [this.verticeArray[0]+ x, this.verticeArray[1]];
            if(this.verticeArray[5] - this.verticeArray[1] >= 0){
                var v3 = [this.verticeArray[0] + x, this.verticeArray[1] + x];
                var v4 = [this.verticeArray[0], this.verticeArray[1] +x];
            }else{
                var v3 = [this.verticeArray[0] + x, this.verticeArray[1] - x];
                var v4 = [this.verticeArray[0], this.verticeArray[1] - x];
            }
        }else{
            var v2 = [this.verticeArray[0] - x, this.verticeArray[1]];
            if(this.verticeArray[5] - this.verticeArray[1] >= 0){
                var v3 = [this.verticeArray[0] - x, this.verticeArray[1] + x];
                var v4 = [this.verticeArray[0], this.verticeArray[1] +x];
            }else{
                var v3 = [this.verticeArray[0] - x, this.verticeArray[1] - x];
                var v4 = [this.verticeArray[0], this.verticeArray[1] - x];
            }
        }
        
        var squaredVertice = [v1[0], v1[1],
                            v2[0], v2[1],
                            v3[0], v3[1],
                            v4[0], v4[1]];
        
        this.verticeArray = squaredVertice;
    }

    resolveRectangleVertice(){
        var v1 = [this.verticeArray[0], this.verticeArray[1]];
        var v2 = [this.verticeArray[4], this.verticeArray[1]];
        var v3 = [this.verticeArray[4], this.verticeArray[5]];
        var v4 = [this.verticeArray[0], this.verticeArray[5]];
        
        var rectangledVertice = [v1[0], v1[1],
                            v2[0], v2[1],
                            v3[0], v3[1],
                            v4[0], v4[1]];
        
        this.verticeArray= rectangledVertice;
    }

    squaredVertice(){
        var squared = [];
        squared.push(this.verticeArray[0], this.verticeArray[1]);
        squared.push(this.verticeArray[2], this.verticeArray[3]);
        squared.push(this.verticeArray[4], this.verticeArray[5]);
        squared.push(this.verticeArray[0], this.verticeArray[1]);
        squared.push(this.verticeArray[4], this.verticeArray[5]);
        squared.push(this.verticeArray[6], this.verticeArray[7]);

        this.numVertices = squared.length/2;
        return squared;
    }

    rectangledVertice(){
        var rectangled = [];

        rectangled.push(this.verticeArray[0], this.verticeArray[1]);
        rectangled.push(this.verticeArray[2], this.verticeArray[3]);
        rectangled.push(this.verticeArray[4], this.verticeArray[5]);
        rectangled.push(this.verticeArray[0], this.verticeArray[1]);
        rectangled.push(this.verticeArray[4], this.verticeArray[5]);
        rectangled.push(this.verticeArray[6], this.verticeArray[7]);
        
        this.numVertices = rectangled.length/2;
        return rectangled;
        
    }

    polygonVertice(){
        if(this.verticeArray.length/2 < 3){
            this.numVertices = this.verticeArray.length/2;
            return this.verticeArray;
        }
        var polygonVertice = [];
        for(let i = 0; i < this.verticeArray.length/2 -2; i++){
            polygonVertice.push(this.verticeArray[0], this.verticeArray[1]);
            polygonVertice.push(this.verticeArray[2*(i+1)], this.verticeArray[2*(i+1)+1]);
            polygonVertice.push(this.verticeArray[2*(i+2)], this.verticeArray[2*(i+2)+1]);
        }

        this.numVertices = polygonVertice.length/2;
        return polygonVertice;
    }



    drawObject(objectManager){
        var gl = objectManager.gl;
        var program = objectManager.program;

        if(this.type == "line"){
            /* Draw Line */
            // update number of vertice
            this.numVertices = this.verticeArray.length/2;

            initBuffer(this, gl, program);
            gl.drawArrays(gl.LINES, 0, this.numVertices);

            /* Draw Vertice */
            var color = gl.getUniformLocation(program, 'color');
            gl.uniform4fv(color, [0,0,0,1]);
            gl.drawArrays(gl.POINTS, 0, this.numVertices);

        }else if(this.type == "square"){
            /* Draw Square */

            initBuffer(this, gl ,program);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, this.numVertices);

            /* Draw Vertice (black) */
             var color = gl.getUniformLocation(program, 'color');
             gl.uniform4fv(color, [0,0,0,1]);
             gl.drawArrays(gl.POINTS, 0, this.numVertices);

        }else if(this.type == "rectangle"){
            /*Draw Rectangle */

            initBuffer(this, gl ,program);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, this.numVertices);

            /* Draw Vertice (black) */
             var color = gl.getUniformLocation(program, 'color');
             gl.uniform4fv(color, [0,0,0,1]);
             gl.drawArrays(gl.POINTS, 0, this.numVertices);

        }else if(this.type == "polygon"){
            /* Draw Polygon */
            initBuffer(this, gl, program);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, this.numVertices);

            /* Draw Vertice (black) */
            var color = gl.getUniformLocation(program, 'color');
            gl.uniform4fv(color, [0,0,0,1]);
            gl.drawArrays(gl.POINTS, 0, this.numVertices);
        }else{
            console.log("%s not a object type!", this.type);
        }
    }
}

export class ObjectManager{
    constructor(gl, canvas, program){
        this.gl = gl;
        this.canvas = canvas;
        this.program = program;
        this.objectList = [];
        this.verticeBuffer = [];
        this.objectInDraw = null;
        // state
        this.verticeToPut = 0;
        this.drawLine = false;
        this.drawSquare = false;
        this.drawRectangle = false;
        this.drawPolygon = false;
        this.isDrawing = false;
        this.select = false;
        this.seletedObject = null;
        this.selectedIndex = null;
    }

    getNumObject(){
        return this.objectList.length()
    }

    reDrawAll(){
        /* Redraw all object */
        var gl = this.gl;
        var objectManager = this;
        gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
        gl.enable( gl.DEPTH_TEST );
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.clearDepth( 1.0 );
        gl.viewport(0, 0, canvas.width, canvas.height);
        

        this.objectList.forEach(function(object){
            object.drawObject(objectManager);
        })
        
        if(this.objectInDraw != null){
            this.objectInDraw.drawObject(objectManager);
        }
    }

}

function initBuffer(object, gl, program){
    gl.useProgram(program);
    var verticeArray= null;
    if(object.type == "line"){
        verticeArray = object.verticeArray;
    }
    if(object.type == "square"){
        verticeArray = object.squaredVertice();
    }
    if(object.type == "rectangle"){
        verticeArray = object.rectangledVertice();
    }
    if(object.type == "polygon"){
        verticeArray = object.polygonVertice();
    }

    // Create Buffer
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticeArray), gl.STATIC_DRAW);

    var vertexPosition = gl.getAttribLocation(program, 'coordinates');
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);

    /* Color */
    var color = gl.getUniformLocation(program, 'color');
    gl.uniform4fv(color, object.color);
}
