var Three = THREE;
var camera,
    light,
    renderer,
    scene,
    shape,
    controls;

var WIDTH = 800;
var HEIGHT = 700;
WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;

var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 1000;
var FOV = 45;

var element = document.getElementById('container');

function init(element) {
    var el = element;
    setupScene();
    light = createLights();
    shape = addPoints(0xffffff, 50, 124, 124);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    render();
}

init(element);

function setupScene() {
    renderer = new Three.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.shadowMap.enabled = true;
    renderer.setSize(WIDTH, HEIGHT);

    camera = new Three.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 300;

    scene = new Three.Scene();

    $(element).append(renderer.domElement);
}


function createLights() {
    var light = new Three.AmbientLight(0xffffff);
    light.position.x = 0;
    light.position.y = 0;
    light.position.z = 500;
    scene.add(light);
    return light;
}

function addPoints(color, radius) {
    var DETAIL = 0;
    var geometry,
        material,
        shape;

    geometry = new Three.DodecahedronGeometry(radius, DETAIL);
    material = new Three.MeshPhongMaterial({
        emissive: 0x000000,
        color: color,
        transparent: true,
        opacity: 0.3,
        wireframe: true,
    });

    shape = new Three.Mesh(geometry, material);

    scene.add(shape);
    return shape;
}

function render() {
    shape.rotation.x += 0.01;
    shape.rotation.y += 0.01;

    renderer.render(scene, camera);
  
  requestAnimationFrame(render);
}