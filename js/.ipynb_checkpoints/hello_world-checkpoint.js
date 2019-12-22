//var THREE = require('three');
//import * as THREE from 'three'
let scene, camera, renderer, cube , controls, container;

function createControls(){
    controls = new THREE.OrbitControls( camera, container );
    controls.update();

};

function createRenderer() {

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( container.clientWidth, container.clientHeight );
  
    renderer.setPixelRatio( window.devicePixelRatio );
  
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;
    renderer.physicallyCorrectLights = true;
  
    container.appendChild( renderer.domElement );
  
  };

function createCamera(){

    // set up the options for a perspective camera
    const fov = 35; // fov = Field Of View
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.z = 5;

};

function createLights() {

    const ambientLight = new THREE.HemisphereLight(
        0xddeeff, // sky color
        0x202020, // ground color
        5, // intensity
    );
    
    const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
    mainLight.position.set( 10, 10, 10 );
    
    scene.add( ambientLight, mainLight );
  
  };

function createMeshes() {
    var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    var material = new THREE.MeshStandardMaterial();
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

};


function init(){
    // Get a reference to the container element that will hold our scene
    container = document.querySelector( '#scene-container' );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x8FBCD4 );

    createCamera();
    createControls();
    createLights();
    createMeshes();
    createRenderer();

    // start the animation loop
    renderer.setAnimationLoop( () => {
        update();
        render();
    } );

};


function onWindowResize(){
    const aspect = container.clientWidth / container.clientHeight;
    camera.aspect = aspect ;
    camera.updateProjectionMatrix() ;
    renderer.setSize( container.clientWidth, container.clientHeight );
    controls.update();

};


function update () {
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
};

// render, or 'draw a still image', of the scene
function render() {
    renderer.render( scene, camera );
};



window.addEventListener('resize', onWindowResize, false);

init();
