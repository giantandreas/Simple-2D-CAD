function init(){
    /*INITIATION*/
    // canvas
    const canvas = document.getElementById("canvas");

    // resizing canvas
    canvas.width = 1000;
    canvas.height = 1000;
    
    // Initialize WebGL, setting context
    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    gl.enable( gl.DEPTH_TEST );
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.viewport(0, 0, canvas.width, canvas.height);

    return [canvas, gl]
}