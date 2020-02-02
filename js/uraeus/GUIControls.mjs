
// GUI
var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

var grid = new BABYLON.GUI.Grid();   
grid.addColumnDefinition(50, true);
grid.addColumnDefinition(50, true);
grid.addRowDefinition(25, true);
grid.addRowDefinition(25, true);

// This rect will be on first row and second column
var rect = new BABYLON.GUI.Rectangle();
rect.background = "green";
rect.thickness = 0;
grid.addControl(rect, 0, 0);   

// This rect will be on second row and third column
rect = new BABYLON.GUI.Rectangle();
rect.background = "red";
rect.thickness = 0;
grid.addControl(rect, 1, 2);

advancedTexture.addControl(grid); 

