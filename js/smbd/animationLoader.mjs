import { scene } from "./main.mjs";


class animatable
{
    constructor(geometry)
    {
        this.geometry = geometry;

        this.positionKeys = [];
        this.orientationKeys = [];

        this.positionAnimation = new BABYLON.Animation('', "position", 60, 
                                                        BABYLON.Animation.ANIMATIONTYPE_VECTOR3, 
                                                        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        
        this.orientationAnimation = new BABYLON.Animation('', "rotationQuaternion", 60, 
                                                        BABYLON.Animation.ANIMATIONTYPE_QUATERNION, 
                                                        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);


    }

    addKey(frame, position, orientation)
    {
        const positionKey = {frame: frame, value: position};
        const orientationKey = {frame: frame, value: orientation};

        this.positionKeys.push(positionKey);
        this.orientationKeys.push(orientationKey);

    }

    setKeys()
    {
        this.positionAnimation.setKeys(this.positionKeys);
        this.orientationAnimation.setKeys(this.orientationKeys);

        //console.log(this.positionAnimation)
    }

    addToGroup(animationGroup)
    {
        animationGroup.addTargetedAnimation(this.positionAnimation, this.geometry.mesh)
        animationGroup.addTargetedAnimation(this.orientationAnimation, this.geometry.mesh)
    }
}



export class animation
{
    constructor(name, animationData, model)
    {
        this.name = name;
        this.model = model;
        this.animationData = animationData;

        this.bodies = [];
        this.animationKeys = {}
        this.animationGroup = new BABYLON.AnimationGroup('s');

        this.processStringData();
        this.extractBodiesNames();
        this.setAnimationKeys();
        this.constructAnimation();
    }

    construct()
    {
        

    }


    processStringData()
    {
        this.lines = this.animationData.split('\n').map(function (line){return line.split(',')});
        this.coordinates = this.lines[0].slice(1,-1);

    }

    extractBodiesNames()
    {
        
        for (let index = 0; index < this.coordinates.length; index += 7) 
        {
            const coordinate = this.coordinates[index];
            const bodyName = coordinate.split('.').slice(0,-1).join('.');
            this.bodies.push(bodyName);
        }
        console.log('Extracted Bodies : ', this.bodies);

        for (const bodyIndex in this.bodies)
        {
            this.animationKeys[this.bodies[bodyIndex]] = {};
        }

    }

    setAnimationKeys()
    {
        // Looping over the string lines loaded from the animationData.csv
        // to create numerical objects that can be used in animation.
        for (let frame = 1; frame < this.lines.length-1; frame++) 
        {
            // Converting the array of strings ti an array of floats.
            // the slice [1:-1] is used to trim the index col and the "time" col.
            const line = new Float64Array(this.lines[frame].slice(1,-1));
            //console.log(line)

            // Looping over the system bodies array in order to set the corresponding
            // coordinates as a vector and quaternion types
            for (const bodyIndex in this.bodies)
            {
                const i = bodyIndex * 7;

                // Position Data
                var [x, y, z] = line.slice(i, i+3);
                var vec = new BABYLON.Vector3(x, y, z).scale(1/100);

                // Orientation Data
                var [e0, e1, e2, e3] = line.slice(i+3, i+7);
                var qut = new BABYLON.Quaternion(e1, e2, e3, e0);

                //console.log(this.bodies[bodyIndex], vec);
                //console.log(this.bodies[bodyIndex], qut);

                // Adding the data to the animationKeys container.
                // where animationKeys[body][frame] = [positionData, orientatioData]
                this.animationKeys[this.bodies[bodyIndex]][frame] = [vec, qut];

            }
            
            
        }

        console.log(this.animationKeys)

    }

    constructAnimation()
    {
        this.animatables = {};

        console.log(this.model.geometries)

        for (const geoName in this.model.geometries)
        {
            const geoObj = this.model.geometries[geoName];
            const bodyName = this.model.geometriesMap[geoName];
            const animObj  = new animatable(geoObj);

            for (const frame in this.animationKeys[bodyName])
            {
                const R = this.animationKeys[bodyName][frame][0];
                const P = this.animationKeys[bodyName][frame][1];

                if (frame-1 == 0)
                {
                    console.log('true')
                    geoObj.setMeshPosition(R)
                }
                //console.log(bodyName, frame, R, P)
                animObj.addKey(frame-1, R, P)
            }

            animObj.setKeys();
            animObj.addToGroup(this.animationGroup);
            this.animatables[geoName] = animObj;

        }

        //this.animationGroup.normalize(0, 100)
        this.animationGroup.play(true);

    }
}
