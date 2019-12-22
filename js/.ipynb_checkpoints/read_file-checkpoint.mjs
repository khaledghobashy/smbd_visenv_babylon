
import {geom, scene} from './hello_world.mjs'

export let input, lines, points;

input = document.getElementById('upload')
input.addEventListener('change', readFileAsString)


function readFileAsString(event)
{
    var reader = new FileReader();
    console.log(input.files[0])
    reader.onload = function ()
    {

        lines  = reader.result.split('\n').map(function (line){return line.split(',')})
        
        points = {}

        for (let i = 1; i < lines.length; i++) 
        {
            const line = lines[i]
            const name = line[0]

            const x = parseFloat(line[1]);
            const y = parseFloat(line[2]);
            const z = parseFloat(line[3]);

            points[name] = new THREE.Vector3(x, y, z);
        }

        console.log(points)

        geom.construct_geometry(scene)
    }

    reader.readAsText(input.files[0])
}



