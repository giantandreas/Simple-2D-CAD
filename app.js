
function main() {
    // canvas
    const canvas = document.getElementById("canvas");
    
    // Initialize WebGL
    const gl = canvas.getContext("webgl");
  
    // Only continue if WebGL is available and working
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
    
    // ################################################
    // vertice
    var vertice = [
      -0.5, -0.5, 0.0,
    	0.5, -0.5, 0.0,
    	0.5, 0.5, 0.0,
      -0.5, 0.5, 0.0
    ];
    
    var vertexCode = [
      'attribute vec3 coordinates;',
      'void main(void) {',
      ' gl_Position = vec4(coordinates, 1.0);',
      '}'
    ].join('\n');

    var fragmentCode = [
      'void main(void) {',
      'gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
      '}'
    ].join('\n');

    // shaders
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    
    gl.shaderSource(vertexShader, vertexCode);
    gl.shaderSource(fragmentShader, fragmentCode);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // program
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // buffer
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertice), gl.STATIC_DRAW);

    // assosiating shader to buffer

    var coords = gl.getAttribLocation(program, 'coordinates');
    gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
    
    gl.enableVertexAttribArray(coords);
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	  gl.enable( gl.DEPTH_TEST );
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.drawArrays(gl.LINE_LOOP, 0, 4);
}
  
main()