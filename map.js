// Viewer Setup
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4Nzc0NmM0ZC1iNzI4LTQ4YTMtYTM3OS0zMDA3MjNiZTFhY2QiLCJpZCI6MjgyNCwiaWF0IjoxNTM0NzkwNTQyfQ.ne57ToXCxAPe7sC7BydLEP_icwPxjXgjZ1EWo5iFixE"
var viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayerPicker: false,
    geocoder: false,
    projectionPicker: false,
    homeButton: false,
    navigationInstructionsInitiallyVisible: false,
    scene3DOnly: true
});


// Terrain Setup
var terrainProvider = Cesium.createWorldTerrain({
    requestVertexNormals: true // For Lighting
});
viewer.terrainProvider = terrainProvider;
viewer.scene.globe.enableLighting = true;

// Clock Setup

viewer.animation.viewModel.dateFormatter = localeDateTimeFormatter;
viewer.animation.viewModel.timeFormatter = localeTimeFormatter;
viewer.timeline.makeLabel = function(time) { return localeDateTimeFormatter(time); }

var TZcode = 'CEST';
var UTCoffset = new Date();
UTCoffset = -2;
var UTCscratch = new Cesium.JulianDate();

// Date formatting to a global form
function localeDateTimeFormatter(datetime, viewModel, ignoredate) {
    if (UTCoffset) datetime = Cesium.JulianDate.addMinutes(datetime, UTCoffset, UTCscratch);
    var gregorianDT = Cesium.JulianDate.toGregorianDate(datetime),
        objDT;
    if (ignoredate)
        objDT = '';
    else {
        objDT = new Date(gregorianDT.year, gregorianDT.month - 1, gregorianDT.day);
        objDT = gregorianDT.day + ' ' + objDT.toLocaleString("en-us", {
            month: "short"
        }) + ' ' + gregorianDT.year;
        if (viewModel || gregorianDT.hour + gregorianDT.minute === 0)
            return objDT;
        objDT += ' ';
    }
    return objDT + Cesium.sprintf("%02d:%02d " + TZcode, gregorianDT.hour, gregorianDT.minute);
}
function localeTimeFormatter(time, viewModel) {
    return localeDateTimeFormatter(time, viewModel, true);
}

// Data Setup

// Load all sources
var data_day1 = Cesium.KmlDataSource.load('./data/kml/16.08.2018.kml', {
    camera: viewer.scene.camera,
    canvas: viewer.scene.canvas
});
var data_day2 = Cesium.KmlDataSource.load('./data/kml/17.08.2018.kml', {
    camera: viewer.scene.camera,
    canvas: viewer.scene.canvas
});
var data_day3 = Cesium.KmlDataSource.load('./data/kml/18.08.2018.kml', {
    camera: viewer.scene.camera,
    canvas: viewer.scene.canvas
});
var data_day4 = Cesium.KmlDataSource.load('./data/kml/19.08.2018.kml', {
    camera: viewer.scene.camera,
    canvas: viewer.scene.canvas
});

$(document).on("click", "#day1Button", function () {
    if (!$(this).hasClass("selected")) {
        $(this).addClass("selected");
        $("#day2Button").removeClass("selected");
        $("#day3Button").removeClass("selected");
        $("#day4Button").removeClass("selected");
        viewer.dataSources.removeAll();
        viewer.dataSources.add(data_day1).then(function(dataSource){
            viewer.clock.shouldAnimate = false;
            var rider = dataSource.entities.getById('tour');
            viewer.flyTo(rider).then(function(){
                viewer.trackedEntity = rider;
                viewer.selectedEntity = viewer.trackedEntity;
                viewer.clock.multiplier = 30;
                viewer.clock.shouldAnimate = true;
            });
        });
    } else {
        $(this).removeClass("selected");
        viewer.dataSources.removeAll();
    }
});
$(document).on("click", "#day2Button", function () {
    if (!$(this).hasClass("selected")) {
        $(this).addClass("selected");
        $("#day1Button").removeClass("selected");
        $("#day3Button").removeClass("selected");
        $("#day4Button").removeClass("selected");
        viewer.dataSources.removeAll();
        viewer.dataSources.add(data_day1);
        viewer.dataSources.add(data_day2).then(function(dataSource){
            viewer.clock.shouldAnimate = false;
            var rider = dataSource.entities.getById('tour');
            viewer.flyTo(rider).then(function(){
                viewer.trackedEntity = rider;
                viewer.selectedEntity = viewer.trackedEntity;
                viewer.clock.multiplier = 30;
                viewer.clock.shouldAnimate = true;
            });
        });;
    } else {
        $(this).removeClass("selected");
        viewer.dataSources.removeAll();
    }
});
$(document).on("click", "#day3Button", function () {
    if (!$(this).hasClass("selected")) {
        $(this).addClass("selected");
        $("#day1Button").removeClass("selected");
        $("#day2Button").removeClass("selected");
        $("#day4Button").removeClass("selected");
        viewer.dataSources.removeAll();
        viewer.dataSources.add(data_day1);
        viewer.dataSources.add(data_day2);
        viewer.dataSources.add(data_day3).then(function(dataSource){
            viewer.clock.shouldAnimate = false;
            var rider = dataSource.entities.getById('tour');
            viewer.flyTo(rider).then(function(){
                viewer.trackedEntity = rider;
                viewer.selectedEntity = viewer.trackedEntity;
                viewer.clock.multiplier = 30;
                viewer.clock.shouldAnimate = true;
            });
        });;
    } else {
        $(this).removeClass("selected");
        viewer.dataSources.removeAll();
    }
});
$(document).on("click", "#day4Button", function () {
    if (!$(this).hasClass("selected")) {
        $(this).addClass("selected");
        $("#day1Button").removeClass("selected");
        $("#day2Button").removeClass("selected");
        $("#day3Button").removeClass("selected");
        viewer.dataSources.removeAll();
        viewer.dataSources.add(data_day1);
        viewer.dataSources.add(data_day2);
        viewer.dataSources.add(data_day3);
        viewer.dataSources.add(data_day4).then(function(dataSource){
            viewer.clock.shouldAnimate = false;
            var rider = dataSource.entities.getById('tour');
            viewer.flyTo(rider).then(function(){
                viewer.trackedEntity = rider;
                viewer.selectedEntity = viewer.trackedEntity;
                viewer.clock.multiplier = 30;
                viewer.clock.shouldAnimate = true;
            });
        });;
    } else {
        $(this).removeClass("selected");
        viewer.dataSources.removeAll();
    }
});

// Camera
// Read saved camera position
$.getJSON("./data/camera/start.json", function (data) {
    viewer.camera.setView({
        destination: new Cesium.Cartesian3(data.position.x, data.position.y, data.position.z),
        orientation: {
            direction: new Cesium.Cartesian3(data.direction.x, data.direction.y, data.direction.z),
            up: new Cesium.Cartesian3(data.up.x, data.up.y, data.up.z),
            right: new Cesium.Cartesian3(data.right.x, data.right.y, data.right.z)
        }
    });
});


// Extract current camera view (Debug)
$(document).on("click", "#saveCam", function () {

    var camera = viewer.camera;
    var store = {
        position: camera.position.clone(),
        direction: camera.direction.clone(),
        up: camera.up.clone(),
        right: camera.right.clone()
    };

    download(JSON.stringify(store, undefined, 4), "camera.json", "json");
});