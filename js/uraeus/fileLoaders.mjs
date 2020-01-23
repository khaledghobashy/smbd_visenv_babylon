
export var pointsData, modelData, animationData;

var pointsFile, modelFile, animationFile;

pointsFile = document.getElementById('pointsFile')
pointsFile.addEventListener('change', readPoints)

function readPoints(event)
{
    var  reader = new FileReader();
    reader.onload = function()
    {
        pointsData = reader.result
        const filename = pointsFile.files[0].name
        console.log('Configuration File Selected : \n', filename)
    }
    reader.readAsText(pointsFile.files[0])
}



modelFile = document.getElementById('modelFile')
modelFile.addEventListener('change', readModel)

function readModel(event)
{
    var  reader = new FileReader();
    reader.onload = function()
    {
        modelData = reader.result
        const filename = modelFile.files[0].name
        console.log('Visualization File Selected : \n', filename)
    }
    reader.readAsText(modelFile.files[0])
}


animationFile = document.getElementById('animationFile')
animationFile.addEventListener('change', readAnimation)

function readAnimation(event)
{
    var  reader = new FileReader();
    reader.onload = function()
    {
        animationData = reader.result
        const filename = animationFile.files[0].name
        console.log('Animation File Selected : \n', filename)
    }
    reader.readAsText(animationFile.files[0])
}


