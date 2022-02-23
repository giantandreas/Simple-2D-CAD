/**********************************Shader************************************/  
/*Vertex Shader Code */
var vertexCode = [
'attribute vec2 coordinates;',
'void main(void) {',
' gl_Position = vec4(coordinates, 0.0, 1.0);',
'}'
].join('\n');

/*Fragment Shader Code */
var fragmentCode = [
'precision highp float;',
'uniform vec4 color;',
'void main(void) {',
'gl_FragColor = color;',
'}'
].join('\n');

export function programFunction(gl){
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexCode);
    gl.compileShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentCode);
    gl.compileShader(fragmentShader);

    // program
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;
}
/***********************************************************************************/