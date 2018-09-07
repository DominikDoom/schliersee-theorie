// Viewer Setup
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4Nzc0NmM0ZC1iNzI4LTQ4YTMtYTM3OS0zMDA3MjNiZTFhY2QiLCJpZCI6MjgyNCwiaWF0IjoxNTM0NzkwNTQyfQ.ne57ToXCxAPe7sC7BydLEP_icwPxjXgjZ1EWo5iFixE"
var viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayerPicker : false,
    animation: false,
    geocoder: new Cesium.BingMapsGeocoderService({key:"Ait4bnMrx-aqcQ1DNwfQrqmmvEWI-aqn1fx2i4T76wYMCnkMPMR54JhgmiiFty0h"})
});


// Terrain Setup
var terrainProvider = Cesium.createWorldTerrain({
    requestVertexNormals: true  // For Lighting
});
viewer.terrainProvider = terrainProvider;
viewer.scene.globe.enableLighting = true;

// Data Setup
viewer.dataSources.add(Cesium.KmlDataSource.load('./data/kml/16.08.2018.kml',
     {
          camera: viewer.scene.camera,
          canvas: viewer.scene.canvas
     })
);

// Camera
// Read saved camera position
$.getJSON("./data/camera/start.json", function(data) {
    viewer.camera.setView({
        destination : new Cesium.Cartesian3(data.position.x,data.position.y,data.position.z),
        orientation: {
            direction : new Cesium.Cartesian3(data.direction.x,data.direction.y,data.direction.z),
            up : new Cesium.Cartesian3(data.up.x,data.up.y,data.up.z),
            right : new Cesium.Cartesian3(data.right.x,data.right.y,data.right.z)
        }
    });
});


// Extract current camera view (Debug)
$(document).on("click","#saveCam", function () {

    var camera = viewer.camera;
    var store = {
        position: camera.position.clone(),
        direction: camera.direction.clone(),
        up: camera.up.clone(),
        right: camera.right.clone()
    };

    download( JSON.stringify(store,undefined,4) , "camera.json","json");
});