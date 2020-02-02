import {scene, camera, followCamera, focusTarget} from './main.mjs'
import {getNormal} from './vectorOperations.mjs'

export class Cylinder_Geometry
{
    constructor(name)
    {
        this.name = name;
    }

    construct(p1, p2, radius)
    {   
        // Create the options object for the BABYLON TubeMesh
        const options = {path: [p1, p2],
                        radius: radius,
                        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                        cap: BABYLON.Mesh.CAP_ALL}
        
        // Create the tube mesh
        this.mesh =  BABYLON.MeshBuilder.CreateTube(this.name, options, scene );
        //console.log('Position 1: ', this.mesh.position)
        
        // Obtaining the BoundingBox center of the mesh that approximates the
        // mesh centroid.
        var meshCenter = this.mesh.getBoundingInfo().boundingBox.center;
        this.setMeshPosition(meshCenter)

        this.makePickable(this.mesh)
    }

    setMeshPosition(position)
    {
        setMeshPosition(this.mesh, position)
    }

    makePickable()
    {
        makePickable(this.mesh)
    };
}


export class Sphere_Geometry
{
    constructor(name)
    {
        this.name = name;
    }

    construct(p1, radius)
    {   
        // Create the options object for the BABYLON TubeMesh
        const options = {segments: 32,
                        diameter: 2 * radius}
        // Create the sphere mesh
        this.mesh =  BABYLON.MeshBuilder.CreateSphere(this.name, options, scene );
        
        // Setting the mesh position
        this.setMeshPosition(p1)
        this.makePickable()
    }

    setMeshPosition(position)
    {
        this.mesh.position = position
    };

    makePickable()
    {
        makePickable(this.mesh)
    };
}

export class Triangular_Prism
{
    constructor(name)
    {
        this.name = name;
    }

    construct(p1, p2, p3, thickness)
    {  
        // Evaluating the normal of the triangular plan
        const normal = getNormal(p1, p2, p3);

        // Evaluate offsetted points from the provided points
        // to create a mid-plan extrude
        const f1p1 = p1.add(normal.scale(-thickness/2))
        const f2p1 = p1.add(normal.scale(thickness/2))

        const f1p2 = p2.add(normal.scale(-thickness/2))
        const f2p2 = p2.add(normal.scale(thickness/2))

        const f1p3 = p3.add(normal.scale(-thickness/2))
        const f2p3 = p3.add(normal.scale(thickness/2))

        // The extrude path of the edges for the ribbon object
        const extrude_path = [[f1p1, f2p1],
                              [f1p2, f2p2], 
                              [f1p3, f2p3]];
        
        // Create the options object for the BABYLON TubeMesh
        const options = {pathArray: extrude_path, sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                        closeArray: true, closePath: false}
        // Create the egdes ribbon
        var edges =  BABYLON.MeshBuilder.CreateRibbon(this.name, options, scene);


        // Creating raw mesh for the prism faces
        var face1 = new BABYLON.Mesh(this.name, scene);
        var face2 = new BABYLON.Mesh(this.name, scene);
        
        var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.backFaceCulling = false;
        face1.material = mat;
        face2.material = mat;
                              
        var face1_verts  = [f1p1.x, f1p1.y, f1p1.z,
                            f1p2.x, f1p2.y, f1p2.z,
                            f1p3.x, f1p3.y, f1p3.z];
        
        var face2_verts  = [f2p1.x, f2p1.y, f2p1.z,
                            f2p2.x, f2p2.y, f2p2.z,
                            f2p3.x, f2p3.y, f2p3.z];
        
        var indices = [0, 1, 2];
        var uvs = [0, 0, 0, 1, 1, 0];

        var normals = [];
        BABYLON.VertexData.ComputeNormals(face1_verts, indices, normals);

        var f1vertexData = new BABYLON.VertexData();
        var f2vertexData = new BABYLON.VertexData();

        f1vertexData.positions = face1_verts;
        f1vertexData.indices = indices;
        f1vertexData.normals = normals;
        f1vertexData.uvs = uvs;

        f2vertexData.positions = face2_verts;
        f2vertexData.indices = indices;
        f2vertexData.normals = normals;
        f2vertexData.uvs = uvs;

        f1vertexData.applyToMesh(face1, true);
        f2vertexData.applyToMesh(face2, true);

        this.mesh = BABYLON.Mesh.MergeMeshes([face1, edges, face2])

        // Obtaining the BoundingBox center of the mesh that approximates the
        // mesh centroid.
        var meshCenter = this.mesh.getBoundingInfo().boundingBox.center;

        // Setting the mesh position
        this.setMeshPosition(meshCenter)

        this.makePickable()

    }

    setMeshPosition(position)
    {
        setMeshPosition(this.mesh, position)
    };

    makePickable()
    {
        makePickable(this.mesh)
    };
}

// A function that reposition the mesh origin to the provided new position
function setMeshPosition(mesh, position)
{
    const oldPosition = mesh.position.clone();
    const meshCenter = position;

    // Moving the mesh position to be located at the negated meshCenter
    mesh.position.copyFrom(meshCenter.scale(-1).add(oldPosition))

    // Apply the current transformation/translation to the mesh vertices
    mesh.bakeCurrentTransformIntoVertices();

    // Moving the mesh position to its centroidal center.
    mesh.position.copyFrom(meshCenter.add(oldPosition))

    const newPosition = mesh.position
    console.log('Mesh Position changed from :', oldPosition, 'to :', newPosition)
}


function makePickable(mesh)
{
    mesh.isPickable = true;
    mesh.actionManager = new BABYLON.ActionManager(scene);

    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger, function(bjsevt)
            {
                //console.log(bjsevt);
                console.log(mesh.name);
                followCamera.setTarget(mesh);
            }))
};
