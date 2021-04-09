let camAngle;
let angleSlider;
let diffSlider;
let myFont;
let angle = 0; // This is the current value of sin(). Handles the oscillation
let boxWidth = 30;
let orthocam = 350;
let tall = 250;
let minHeight = 100;
// User input
let arraysize = 16;


function setup() {
    createCanvas(400, 400, WEBGL);
    camAngle = atan(1 / sqrt(2));
    angleSlider = createSlider(0.01, 0.2, 0.02, 0.01);
    angleSlider.position(20, height + 20);
    diffSlider = createSlider(0.01, 1, 0.9, 0.05);
    frameRate(30);
}

function draw() {
    const curAngle = angleSlider.value();
    offset = 0;
    background(51);
    ortho(-orthocam, orthocam, -orthocam, orthocam, -1000, 1000);
    rotateX(-QUARTER_PI);
    rotateY(camAngle);
    // draw the cubes, also animate them.
    drawCubeArt(arraysize);

    angle += curAngle;
}

function drawCubeArt(size) {
    const diffMultiplier = diffSlider.value()

    // calculates the translation to the center of the box array
    let distToCenter = ((arraysize / 2) + .5) * -boxWidth;
    let camCenter = createVector(distToCenter, 0, distToCenter)

    // Move the camera to the center/center
    translate(camCenter);

    // debugCone(0, 255, 0, camCenter);

    // Draw all the cubes, and center them.
    for (let x = 1; x <= size; x++) {
        for (let z = 1; z <= size; z++) {
            // let a = angle + offset;
            // let h = 

            // calculate vector to move a box
            let boxVector = createVector(x * boxWidth, 0, z * boxWidth);
            // calculate "center of a box"
            let boxCenter = createVector(-x * boxWidth, 0, -z * boxWidth)

            // calculate "distance" of a cube's center to the center of the array.
            let distance = dist(camCenter.x, camCenter.z, boxCenter.x, boxCenter.z) / boxWidth * diffMultiplier;

            // Current box height based on input variables.
            let boxHeight = map(sin(angle + distance), -1, 1, minHeight, tall);
            // debugCone(distance, distance, distance, boxCenter)

            push();
            // color code
            // fill(255 * h / tall, 0, 255 * tall / h);
            // move the orgin, xSize * BoxWidth(30) - ( (sizeArray / 2) * boxWidth(30))
            // translate(x * boxWidth + boxCenter, 0, z * boxWidth + boxCenter);
            normalMaterial();
            translate(boxVector);
            box(boxWidth - 1, boxHeight, boxWidth, -1);
            pop();
            // offset += 0.3;
        }
    }
    // translate(boxCenter, -70, boxCenter);

    // angle += 0.1;
}

function debugCone(r, g, b, loc) {
    push();
    translate(-loc.x, -35, -loc.z);
    rotateY(-angle);
    fill(r, g, b);
    cone(10, 20);
    pop();
}