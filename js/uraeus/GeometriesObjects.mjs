import {scene} from './main.mjs'

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
    }

    setMeshPosition(position)
    {
        setMeshPosition(this.mesh, position)
    }
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
    }

    setMeshPosition(position)
    {
        setMeshPosition(this.mesh, position)
    }
}

export class Triangular_Prism
{
    constructor(name)
    {
        this.name = name;
    }

    construct(p1, p2, p3, thickness)
    {   
        // Create the options object for the BABYLON TubeMesh
    }

    setMeshPosition(position)
    {
        setMeshPosition(this.mesh, position)
    }
}

