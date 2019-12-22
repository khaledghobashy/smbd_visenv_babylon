
import {scene} from './main.mjs'


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

export class tubeMesh
{
    constructor(name)
    {
        this.name = name;
    }

    construct(args)
    {   
        // Decomposing the arguments
        const [p1, p2, radius] = args;
        console.log(p1, p2, radius)

        // Create the options object
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

export class compositeMesh
{
    constructor(name)
    {
        this.name = name;
    }

    construct(args)
    {   
        // Create a function that extract the .mesh property of the supplied
        // geometries and store them in the same array
        function extractMeshes(element, index, arr){arr[index] = element.mesh}
        args.forEach(extractMeshes)

        // Creating a MergedMesh from the supplied meshes
        this.mesh = BABYLON.Mesh.MergeMeshes(args);

        // Obtaining the BoundingBox center of the mesh that approximates the
        // mesh centroid.
        var meshCenter= this.mesh.getBoundingInfo().boundingBox.center;

        this.setMeshPosition(meshCenter)
    }

    setMeshPosition(position)
    {
        setMeshPosition(this.mesh, position)
    }
}

var geometries = 
    {
        'tubeMesh' : tubeMesh,
        'compositeMesh' : compositeMesh,
        'cylinder_geometry' : tubeMesh,
    }


export class ModelLoader
{
    constructor(pointsData, modelData)
    {
        this.pointsData = pointsData;
        this.modelData = modelData;

        this.geometries = {}

        this.constructPoints();
        this.constructGeometries();
        //this.constructScene();

        console.log('Model Constructed.')

    }

    constructPoints()
    {
        const json_object = JSON.parse(this.pointsData);

        for (const point in json_object)
        {
            //console.log(point, json_object[point])
            var [x, y, z] = json_object[point]
            //console.log(x, y, z)
            this[point] = new BABYLON.Vector3(x, y, z);
            //console.log(point, this[point])
        }
    }

    constructGeometries()
    {
        const json_object = JSON.parse(this.modelData);

        this.geometriesMap = json_object.geometriesMap;
        //console.log(this.geometriesMap);

        for (const i in json_object.inputs)
        {
            const data = json_object.inputs[i];
            
            if (data instanceof Array)
            {
                var [x, y, z] = data
                this[i] = new BABYLON.Vector3(x, y, z)
                this[i] = this[i].scale(1/100)
            }
            else
            {
                this[i] = data / 100
            }
            
        }

        for (const i in json_object.outputs)
        {
            const geo = json_object.outputs[i];
            //console.log(i, geo)

            this[i] = new geometries[geo.type](i)
            //console.log(this[i])
            const args = []

            for (const key in geo.args)
            {
                const arg = geo.args[key]

                if (this.hasOwnProperty(arg))
                {
                    const element = this[arg];
                    args[key] = element;
                }
                else
                {
                    const element = arg;
                    args[key] = element;
                }
            }

            this.geometries[i] = this[i];
            this[i].construct(args)
            //console.log(this[i])
            //console.log(this.geometries)

        }
    }

    constructScene()
    {
        const json_object = JSON.parse(this.modelData);
        for (const m in json_object.scene)
        {
            const obj = json_object.scene[m]
            //console.log(m, obj)
            scene.add(this[obj].mesh)
        }
    }

}




