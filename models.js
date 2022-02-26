export class Object{
    constructor(type, vertices, color){
        this.type = type;
        this.numVertices = vertices;
        this.color = color;
        this.verticeArray = []
    }

    changeColor(color){
        this.color = color;
        // implement change color in the canvas
    }
}

export class ObjectManager{
    constructor(gl, canvas, program){
        this.gl = gl;
        this.canvas = canvas;
        this.program = program;
        this.objectList = [];
        this.verticeHolder = [];
        // state
        this.verticeToPut = 0;
        this.drawLine = false;
        this.drawRectangle = false;
        this.drawQuads = false;
        this.drawPolygon = false;
    }

    getNumObject(){
        return this.objectList.length()
    }

    render(){

    }
}
