import BABYLON from 'babylonjs';

var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    var camera = new BABYLON.FreeCamera("camera1",
                                          new BABYLON.Vector3(0, 0, -10),
                                          scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    // Add and manipulate meshes in the scene
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:2}, scene);
    sphere.position.x = 2;

    var assetsManager = new BABYLON.AssetsManager(scene);

    //same old bollocks with not being able to load stuff locally
    var meshTask = assetsManager.addMeshTask("skull task", "", "assets/", "skull.babylon");
    meshTask.onSuccess = function (task) {
        console.log("LOAD SUCCESS");
    }
    assetsManager.load();

    return scene;
};

/******* End of the create scene function ******/    

var scene = createScene(); //Call the createScene function

engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
        scene.render();
});

window.addEventListener("resize", function () { // Watch for browser/canvas resize events
        engine.resize();
});
