
var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); // Generate the BABYLON 3D engine

export let scene, debugLayer, followCamera, focusTarget, camera;

/******* Scene Creation function ******/
function createScene()
{
    scene = new BABYLON.Scene(engine);
    scene.useRightHandedSystem = true;

    //scene.clearColor = new BABYLON.Color3(0.09803921568627451, 0.11372549019607843, 0.10980392156862745);
    scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    scene.autoClear = true;

    debugLayer = new BABYLON.DebugLayer(scene)
    debugLayer.show({embedMode: true, handleResize: true});

    var axis = new BABYLON.AxesViewer(scene);
    
    var groundOptions = {width: 1000, height: 1000, subdivisions: 50, sideOrientation: BABYLON.Mesh.DOUBLESIDE}
    var groundMaterial = new BABYLON.GridMaterial("groundMaterial", scene);
	groundMaterial.majorUnitFrequency = 10;
	groundMaterial.minorUnitVisibility = 0.45;
	groundMaterial.gridRatio = 2;
	groundMaterial.backFaceCulling = false;
	groundMaterial.mainColor = new BABYLON.Color3(0.2, 0.2, 0.2);
	groundMaterial.lineColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    groundMaterial.opacity = 0.2;
    //groundMaterial.minorUnitVisibility = 0.18
    
    var groundMesh = BABYLON.MeshBuilder.CreatePlane("ground", groundOptions, scene);
    groundMesh.material = groundMaterial;

    // Initialize GizmoManager
    var gizmoManager = new BABYLON.GizmoManager(scene)

    // Initialize all gizmos
    //gizmoManager.boundingBoxGizmoEnabled = true;
    //gizmoManager.positionGizmoEnabled = true;
    //gizmoManager.rotationGizmoEnabled = true;
    //gizmoManager.scaleGizmoEnabled = true;
    //gizmoManager.clearGizmoOnEmptyPointerEvent = true;
    //gizmoManager.usePointerToAttachGizmos = false;

};

/******* Camera Creation function ******/
function createCamera()
{
    // Add a camera to the scene and attach it to the canvas
    camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 4, Math.PI / 4, 15, new BABYLON.Vector3.Zero(), scene);
    camera.upVector = new BABYLON.Vector3(0, 0, 1);
    camera.attachControl(canvas, true);

    // Shape to follow
    //focusTarget = new BABYLON.TransformNode("ft");
    //focusTarget.position = new BABYLON.Vector3(0, 0, 0); 
    //var offset = new BABYLON.Vector3(-15, -25, -20);
    // Add a camera to the scene and attach it to the canvas
    followCamera = new BABYLON.ArcRotateCamera("FollowCamera", Math.PI / 4, Math.PI / 4, 15, new BABYLON.Vector3.Zero(), scene);
    followCamera.upVector = new BABYLON.Vector3(0, 0, 1);
    followCamera.attachControl(canvas, true);
    
    console.log(followCamera)

};

function createFollowCamera()
{
    followCamera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, 10), scene);
    followCamera.upVector = new BABYLON.Vector3(0, 0, 1);
    // The goal distance of camera from target
    followCamera.radius = 30;

    // The goal height of camera above local origin (centre) of target
    followCamera.heightOffset = 5;

    // The goal rotation of camera around local origin (centre) of target in x y plane
    followCamera.rotationOffset = 0;

    // Acceleration of camera in moving from current to goal position
    followCamera.cameraAcceleration = 0.05

    // The speed at which acceleration is halted
    followCamera.maxCameraSpeed = 10

    // This attaches the camera to the canvas
    //followCamera.attachControl(canvas, true);
};


/******* Lights Creation function ******/
function createLights()
{
    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(10, 10, 10), scene);
}


   

/* INIT Fucntion */
function init()
{
    createScene(); //Call the createScene function
    createCamera();
    createLights();

}

// Call the programm init function
init()

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () { 
        scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () { 
        engine.resize();
});