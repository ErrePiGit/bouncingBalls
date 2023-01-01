
window.onload = function() {

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    // dimension of canvas
    const canvasX = 800;
    const canvasY = 600;

    // dimension of sphere
    var radius = 50;
    var mass = 1;

    // initial position of sphere
    var x = (canvasX-(radius/2))/2;
    var y = radius;

    // status 0 = down and 1 = up and -1 = stop
    var status = -1;

    // Movement of the sphere
    var velocity = 0;
    var velocityMax = 0;
    var t0 = 0;
    var t1 = 0;
    var t2 = 0;
    var t3 = 0;
    var meters = 0;
    var h0 = 0;
    var h1 = 0;
    var velocityBounce = 0;
    var cor = 0.75;
    
    // variabiles for fps control
    var t = Date.now();
    const speed = 10;

    // gravity
    var g = 9.81;

    // drawing initial sphere
    context.arc(x,y,radius,0,2 * Math.PI);
    context.fillStyle = "#aaaaff";
    context.fill();
   
    function main(){

        //control FPS
        var timePassed = (Date.now() - t) / 1000;
        t = Date.now();
        var fps = Math.round(1/timePassed)

        // handle events
        document.getElementById('increaseR').onclick = function() {

            if (radius < 100) {
                radius += 1;
                y = radius;
            }

        }

        document.getElementById('decreaseR').onclick = function() {

            if (radius >= 10) {
                radius -= 1;
                y = radius;
            }

        }

        document.getElementById('increaseM').onclick = function() {

            if (mass < 100) {
                mass += 1;
            }

        }

        document.getElementById('decreaseM').onclick = function() {

            if (mass > 1) {
                mass -= 1;
            }

        }

        document.getElementById('up').onclick = function() {

            if (y > radius) {
                y -=10;
            }

        }

        document.getElementById('down').onclick = function() {

            if (y < (canvasY-radius)){
            y +=10;
            }

        }

        // Start simulation
        document.getElementById('start').onclick = function() {

            t0 = Date.now();
            status = 0;
            h0 = y;

        }

        // Reset
        document.getElementById('reset').onclick = function() {

            mass = 1;
            radius = 50;
            status = -1;
            y = radius;

        }

        // gravity (free fall)
        meters = (canvasY - (y + radius)) / (speed * g);

        if (y >=0 && y < (canvasY-radius) && status == 0) {

            t1 = (Date.now() - t0) / 1000;
            velocity = g * t1;
            y += 1 * timePassed * speed * velocity;

            if (y >= (canvasY-radius)){
                y = (canvasY-radius);
                status = 2;
                t2 = Date.now();
                t3 = t2 - t0;
                velocityMax = g * (t3 / 1000);
            }
        }

        // Bouncing
        if (status == 2 && y == (canvasY-radius)) {

            velocityBounce = velocityMax * cor;
            t0 = Date.now();

        }

        if (status == 2 && velocityBounce > 0) {

            t1 = (Date.now() - t0) / 1000;

            velocity = velocityBounce - (g * t1)

            y -= 1 * velocity * timePassed * speed;

            if (velocity <= 0) {

                velocityBounce = 0;
                t0 = Date.now();
                h1 = y;

            }

        }

        if (status == 2 && velocityBounce == 0) {

            t1 = (Date.now() - t0) / 1000;
            velocity = g * t1;
            y += 1 * timePassed * speed * velocity;

            if (y >= (canvasY-radius) && h1 < (canvasY - radius - 0.5)){
                y = (canvasY-radius);
                t2 = Date.now();
                t3 = t2 - t0;
                velocityMax = g * (t3 / 1000);
            }

            if (y >= (canvasY-radius) && h1 > (canvasY - radius - 0.5)){
                y = (canvasY-radius);
                t2 = Date.now();
                t3 = t2 - t0;
                velocityMax = g * (t3 / 1000);
                status = -1;
            }

        }

        // drawing
        context.clearRect(0,0,canvasX,canvasY);
        context.beginPath();
        context.arc(x,y,radius,0,2 * Math.PI);
        context.fillStyle = "#aaaaff";
        context.fill();

        context.font = '10px Arial';
        context.fillStyle = '#DDDDDD';
        context.fillText("Radius: " + radius, 5, 20);

        context.font = '10px Arial';
        context.fillStyle = '#DDDDDD';
        context.fillText("Mass: " + mass, 5, 40);

        context.font = '10px Arial';
        context.fillStyle = '#DDDDDD';
        context.fillText("fps: " + fps, 5, 60);

        context.font = '10px Arial';
        context.fillStyle = '#DDDDDD';
        context.fillText("timePassed: " + timePassed, 5, 80);

        context.font = '10px Arial';
        context.fillStyle = '#DDDDDD';
        context.fillText("Y: " + y, 5, 100);
        
        context.font = '10px Arial';
        context.fillStyle = '#DDDDDD';
        context.fillText("Meters: " + meters, 5, 120);

        context.font = '10px Arial';
        context.fillStyle = '#DDDDDD';
        context.fillText("Vmax: " + velocityMax, 5, 140);

        context.font = '10px Arial';
        context.fillStyle = '#DDDDDD';
        context.fillText("V: " + velocity, 5, 160);

        context.font = '10px Arial';
        context.fillStyle = '#DDDDDD';
        context.fillText("Time: " + (t3/1000), 5, 180);

        context.font = '10px Arial';
        context.fillStyle = '#DDDDDD';
        context.fillText("H1: " + h1, 5, 200);

        window.requestAnimationFrame(main);
    
    }  

    main();       
  
}