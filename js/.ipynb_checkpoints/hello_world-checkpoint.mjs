//var THREE = require('three');
//import * as THREE from 'three'

import {dwb_geometry} from './dwb_class.mjs';


export let scene, camera, renderer, cube , controls, container;

THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);


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

    // start the animation loop
    renderer.setAnimationLoop( () => {
        update();
        render();
    } );
  
  };

function createCamera(){

    // set up the options for a perspective camera
    const fov = 5; // fov = Field Of View
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    //camera = new THREE.PerspectiveCamera( -5, 5, -5, 5 ,100, 1000);
    //camera.up.set(0,0,1);
    camera.position.z = 10;

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



export var geom = new dwb_geometry();
// Creating 3D Meshes
// ==================
function createMeshes() {
    geom.construct_geometry(scene);
};


function init(){
    // Get a reference to the container element that will hold our scene
    container = document.querySelector( '#scene-container' );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x474747 );

    var axesHelper = new THREE.AxesHelper( 2 );
    scene.add( axesHelper );

    createCamera();
    createControls();
    createLights();
    createMeshes();
    createRenderer();

};


function onWindowResize(){
    const aspect = container.clientWidth / container.clientHeight;
    camera.aspect = aspect ;
    camera.updateProjectionMatrix() ;
    renderer.setSize( container.clientWidth, container.clientHeight );
    controls.update();

};


function update () {

};

// render, or 'draw a still image', of the scene
function render() {
    renderer.render( scene, camera );
};



window.addEventListener('resize', onWindowResize, false);

init();
