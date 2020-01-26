
var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); // Generate the BABYLON 3D engine

// Create the scene space
let camera;

export let scene, debugLayer;

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

    // Initialize GizmoManager
    var gizmoManager = new BABYLON.GizmoManager(scene)

    // Initialize all gizmos
    gizmoManager.boundingBoxGizmoEnabled = true;
    gizmoManager.positionGizmoEnabled = true;
    gizmoManager.rotationGizmoEnabled = true;
    gizmoManager.scaleGizmoEnabled = true;
    gizmoManager.clearGizmoOnEmptyPointerEvent = true;
    //gizmoManager.usePointerToAttachGizmos = false;

    document.onkeydown = (e)=>
    {
        if(e.key == 'w')
        {
            console.log('Pressed "w"')
        }
    }

};

/******* Camera Creation function ******/
function createCamera()
{
    // Add a camera to the scene and attach it to the canvas
    camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 4, Math.PI / 4, 15, new BABYLON.Vector3.Zero(), scene);
    camera.upVector = new BABYLON.Vector3(0, 0, 1);
    camera.attachControl(canvas, true);
}


/******* Lights Creation function ******/
function createLights()
{
    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
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