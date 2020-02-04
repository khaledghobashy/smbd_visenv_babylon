
export var modelData, animationData, modelName, animationName;

var modelFile, animationFile;



/* modelFile = document.getElementById('modelFile')
modelFile.addEventListener('change', readModel)

function readModel(event)
{
    var  reader = new FileReader();
    reader.onload = function()
    {
        modelData = reader.result
        modelName = modelFile.files[0].name
        const filename = modelFile.files[0].name
        console.log('Visualization File Selected : \n', filename)
    }
    reader.readAsText(modelFile.files[0])
} */

/* modelFile = document.getElementById('modelFile')
modelFile.addEventListener('change', readModel)

function readModel(event)
{
    var  reader = new FileReader();
    reader.onload = function()
    {
        modelData = reader.result
        modelName = modelFile.files[0].name
        const filename = modelFile.files[0].name
        console.log('Visualization File Selected : \n', filename)
    }
    reader.readAsText(modelFile.files[0])
} */


animationFile = document.getElementById('animationFile')
animationFile.addEventListener('change', readAnimation)

function readAnimation(event)
{
    var  reader = new FileReader();
    reader.onload = function()
    {
        animationData = reader.result
        const filename = animationFile.files[0].name
        animationName = filename.split('.')[0]
        console.log('Animation File Selected : \n', filename)
    }
    reader.readAsText(animationFile.files[0])
}


