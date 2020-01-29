import {debugLayer} from './main.mjs'
import {ConfigurationDecoder} from './JSONDecoder.mjs'
import {modelData, animationData, animationName} from './fileLoaders.mjs'
import {animation} from './animationLoader.mjs'

var models = [];

var params = 
{
    loadModel : function()
    {
        document.getElementById('modelFile').click()
    },

    loadAnimation : function()
    {
        document.getElementById('animationFile').click()
    },

    createModel : function()
    {
        const decoder = new ConfigurationDecoder(modelData);
        const model = decoder.constructModel();
        models.push(model);
    },

    addAnimation : function()
    {
        for (const i in models)
        {
            var anim = new animation(animationName, animationData, models[i])
        }
        //var anim = new animation(animationName, animationData, models[name])
    },

    inspector : function()
    {
        if (debugLayer.isVisible())
        {
            console.log('Inspector window shown.')
            debugLayer.hide()
        }
        else 
        {
            console.log('Inspector window hiden.')
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

var f1 = gui.addFolder('Standalone Model');
f1.add(params, 'loadModel').name('Load Model Data');
f1.add(params, 'createModel').name('Submit');

var f2 = gui.addFolder('Animation Loader');
f2.add(params, 'loadAnimation').name('Load Animation Data');
f2.add(params, 'addAnimation').name('Add Animation');

gui.add(params, 'inspector').name('Inspector')

