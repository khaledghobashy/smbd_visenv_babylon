import {debugLayer} from './main.mjs'
import {ConfigurationDecoder} from './JSONDecoder.mjs'
import {animation} from './animationLoader.mjs'

var models = {};

var modelData, modelName;
var modelFileDOM = document.getElementById('modelFile')
modelFileDOM.addEventListener('change', readModel)

var animationData, animationName;
var animFileDOM = document.getElementById('animationFile')
animFileDOM.addEventListener('change', readAnimation)

function readModel()
{
    const file = this.files[0]
    console.log(file)
    if (file)
    {
        modelName = file.name
        console.log('Visualization File Selected : \n', modelName)
        var  reader = new FileReader();
        reader.onload = function()
        {
            modelData = reader.result
            const decoder = new ConfigurationDecoder(modelData);
            const model = decoder.constructModel();
            models[modelName] = model;
            loadModel.setValue(modelName);
            loadModel.updateDisplay();
        }
        reader.readAsText(file)
    }
}

function readAnimation()
{
    const file = this.files[0]
    console.log(file)
    if (file)
    {
        animationName = file.name
        console.log('Animation File Selected : \n', animationName)
        var  reader = new FileReader();
        reader.onload = function()
        {
            animationData = reader.result
            var anim = new animation(animationName, animationData, models)
        }
        reader.readAsText(file)
    }
}

var params = 
{
    loadModel : '',

    loadModel2 : function()
    {
        modelFileDOM.click()
    },

    loadAnimation : '',

    inspector : function()
    {
        if (debugLayer.isVisible())
        {
            console.log('Inspector window hiden.')
            debugLayer.hide()
        }
        else 
        {
            console.log('Inspector window shown.')
            debugLayer.show({embedMode: true, handleResize: true})
        }
    }
};


var gui = new dat.GUI({ autoPlace: false });
gui.domElement.id = 'moveGUI'
gui.domElement.style.position= 'absolute';
gui.domElement.style.top = '0px';
gui.domElement.style.left = '0px';
gui.domElement.style.width = '50mm';


var customContainer = document.getElementById('body');
customContainer.appendChild(gui.domElement);

var folderCreateNew = gui.addFolder('Create New Model');
var f2Standalone = folderCreateNew.addFolder('Standalone Model');
var loadModel = f2Standalone.add(params, 'loadModel')
loadModel.name('Load Model Data');
loadModel.listen()
loadModel.domElement.onclick = function(){modelFileDOM.click()}

var f2Assembly = folderCreateNew.addFolder('Assembled Model');
var loadModel2 = f2Assembly.add(params, 'loadModel2')
loadModel2.name('Add SubSystem');


var f2 = gui.addFolder('Animation Loader');
var loadAnim = f2.add(params, 'loadAnimation')
loadAnim.name('Load Animation Data');
loadAnim.listen();
loadAnim.domElement.onclick = function(){animFileDOM.click()}

gui.add(params, 'inspector').name('Toggle Inspector')


var gui2 = new dat.GUI({ autoPlace: false });
gui2.domElement.id = 'moveGUI2'
gui2.domElement.style.position= 'absolute';
gui2.domElement.style.top = '100mm';
gui2.domElement.style.left = '0mm';
gui2.domElement.style.width = '50mm';
//gui2.domElement.style.height  = '1px'

gui2.add(params, 'inspector').name('Toggle Inspector')

customContainer.appendChild(gui2.domElement);

console.log(gui.domElement.style.bottom);

gui2.hide();