import {scene} from './main.mjs'
import {tubeMesh, compositeMesh} from './geometries.mjs'

function construct()
{    
    var ucaf = new BABYLON.Vector3( 5,0,1);
    var ucar = new BABYLON.Vector3(-5,0,1);
    var ucao = new BABYLON.Vector3( 0,5,1);

    var uca_c1 = new tubeMesh('uca_c1')
    uca_c1.construct([ucaf, ucao, 0.2])

    var uca_c2 = new tubeMesh('uca_c2')
    uca_c2.construct([ucar, ucao, 0.2])

    var uca = new compositeMesh('uca')
    uca.construct([uca_c1, uca_c2])


    var uca_anim = new BABYLON.Animation('uca_anim', "position", 60, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keys = [];

    keys.push({
        frame: 0,
        value: new BABYLON.Vector3(10,10,10)
    });

    keys.push({
        frame: 50,
        value: new BABYLON.Vector3(20,20,20)
    });

    keys.push({
        frame: 100,
        value: new BABYLON.Vector3(30,30,30)
    });

    keys.push({
        frame: 150,
        value: new BABYLON.Vector3(40,40,40)
    });

    uca_anim.setKeys(keys);

    uca.mesh.animation = [];
    uca.mesh.animation.push(uca_anim);


    scene.beginDirectAnimation(uca.mesh, [uca_anim], 0, 200, true)
}



