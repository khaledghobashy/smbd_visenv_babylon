
import {input, points} from './read_file.mjs';

function tubeMesh(v1, v2, radius){
    const curv = new THREE.LineCurve3(v1, v2);
    const geom = new THREE.TubeGeometry( curv, 64, radius, 20, true );
    const mesh = new THREE.Mesh(geom);
    return mesh
}

function compositeMesh(meshes, material){

    const geom = new THREE.Geometry();
        
    for (let index = 0; index < meshes.length; index++) {
        const element = meshes[index];
        geom.mergeMesh(element);
    }

    
    const center = new THREE.Vector3(0, 2.5, 2);

    //geom.computeBoundingBox();
    //geom.boundingBox.getCenter(center);
    //geom.center(center);
    //eom.translate(center.x, center.y, center.z)
    //mesh.position.set(center.x, center.y, center.z)

    const mesh = new THREE.Mesh(geom, material);
    //mesh.position.copy(center)

    return mesh
}


export class dwb_geometry {
    constructor(){

        this.ucaf = new THREE.Vector3( 0, 0, 0);
        this.ucar = new THREE.Vector3( 0, 0, 0);
        this.ucao = new THREE.Vector3( 0, 0, 0);

        this.lcaf = new THREE.Vector3( 0, 0, 0);
        this.lcar = new THREE.Vector3( 0, 0, 0);
        this.lcao = new THREE.Vector3( 0, 0, 0);

    };

    construct_points(points)
    {
        for (const key in points) 
        {
            if (this.hasOwnProperty(key)) 
            {
                console.log(key, points[key]);
                this[key] = points[key];
            }
        }
    }

    construct_geometry(scene){

        this.construct_points(points);

        const material = new THREE.MeshStandardMaterial( { color: 0x89918b } );

        const uca_m1 = tubeMesh(this.ucaf, this.ucao, 0.1);
        const uca_m2 = tubeMesh(this.ucar, this.ucao, 0.1);
        const uca_mesh = compositeMesh([uca_m1, uca_m2], material);

        const lca_m1 = tubeMesh(this.lcaf, this.lcao, 0.1);
        const lca_m2 = tubeMesh(this.lcar, this.lcao, 0.1);
        const lca_mesh = compositeMesh([lca_m1, lca_m2], material);

        scene.add(uca_mesh)
        scene.add(lca_mesh)

    };

    load_configuration(){
        return input.files;
    }
    

}
