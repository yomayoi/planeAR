//three.jsの各設定
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setClearColor(new THREE.Color("black"), 0);
renderer.setSize(640, 480);
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0px";
renderer.domElement.style.left = "0px";
document.body.appendChild(renderer.domElement);
var onRenderFcts = [];

//カメラ作成
var camera = new THREE.Camera();
scene.add(camera);

//arToolkitSource
var source = new THREEx.ArToolkitSource({
  sourceType: "webcam"
});
source.init(function onReady() {
  //onReady関数
  onResize();
});

// atToolkitContext
var context = new THREEx.ArToolkitContext({
  cameraParametersUrl: "camera_para.dat",
  detectionMode: "mono",
  imageSmoothingEnabled: true,
  maxDetectionRate: 30,
  canvasWidth: source.parameters.sourceWidth
});
context.init(function onCompleted() {
  camera.projectionMatrix.copy(context.getProjectionMatrix());
});
// update artoolkit on every frame
onRenderFcts.push(function() {
  if (source.ready === false) return;
  context.update(source.domElement);
});

//リサイズ
window.addEventListener("resize", function() {
  onResize();
});

function onResize() {
  source.onResizeElement();
  source.copyElementSizeTo(renderer.domElement);
  if (context.arController !== null) {
    source.copyElementSizeTo(context.arController.canvas);
  }
}

//////////////////////////////////////////////////////////////////////////////////
//		render the whole thing on the page
//////////////////////////////////////////////////////////////////////////////////
// render the scene
onRenderFcts.push(function() {
  renderer.render(scene, camera);
});
// run the rendering loop
var lastTimeMsec = null;
requestAnimationFrame(function animate(nowMsec) {
  // keep looping
  requestAnimationFrame(animate);
  // measure time
  lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
  var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
  lastTimeMsec = nowMsec;
  // call each update function
  onRenderFcts.forEach(function(onRenderFct) {
    onRenderFct(deltaMsec / 1000, nowMsec / 1000);
  });
});

////////////////////////////////////////////////////////////////////////////////
//          Create a ArMarkerControls
////////////////////////////////////////////////////////////////////////////////

var markerRoot_Axis = new THREE.Group();
var artoolkitMarker = new THREEx.ArMarkerControls(context, markerRoot_Axis, {
  type: "pattern",
  patternUrl: "pattern/patt.hiro"
});
// build a smoothedControls
var smoothedRoot_Axis = new THREE.Group();
scene.add(smoothedRoot_Axis);
var smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot_Axis, {
  lerpPosition: 0.4,
  lerpQuaternion: 0.3,
  lerpScale: 1
});
onRenderFcts.push(function(delta) {
  smoothedControls.update(markerRoot_Axis);
});
//////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
//////////////////////////////////////////////////////////////////////////////////
var lightobj = [];
var axisArray = [];
var object = [];
var gridArray = [];
var markerScene = new THREE.Scene();
smoothedRoot_Axis.add(markerScene);

////環境光表示
//平行光源
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 100, 0);
markerScene.add(light);
lightobj.push(light); //no0
//自然光
var ambient = new THREE.AmbientLight(0x666666);
markerScene.add(ambient);
lightobj.push(ambient); //no1
////環境光表示（終）

////grid表示gridhelper(半径大きさ,分割数,色１,色２)
//x-y
var gridxy = new THREE.GridHelper(2, 10, 0x2e2e2e, 0x2efef7);
gridxy.position.y = -0.01;
gridxy.visible = false;
markerScene.add(gridxy);
gridArray.push(gridxy); //no0
//y-z
var gridyz1 = new THREE.GridHelper(1, 5, 0xd358f7, 0xd358f7);
gridyz1.rotation.x = Math.PI / 2;
gridyz1.position.x = 0.5;
gridyz1.position.y = 0.5;
gridyz1.visible = false;
markerScene.add(gridyz1);
gridArray.push(gridyz1); //no1
var gridyz2 = new THREE.GridHelper(1, 5, 0xd358f7, 0xd358f7);
gridyz2.rotation.x = Math.PI / 2;
gridyz2.position.x = -0.5;
gridyz2.position.y = 0.5;
gridyz2.visible = false;
markerScene.add(gridyz2);
gridArray.push(gridyz2); //no2
//x-z
var gridxz1 = new THREE.GridHelper(1, 5, 0xf4fa58, 0xf4fa58);
gridxz1.rotation.z = Math.PI / 2;
gridxz1.position.z = 0.5;
gridxz1.position.y = 0.5;
gridxz1.visible = false;
markerScene.add(gridxz1);
gridArray.push(gridxz1); //no3
var gridxz2 = new THREE.GridHelper(1, 5, 0xf4fa58, 0xf4fa58);
gridxz2.rotation.z = Math.PI / 2;
gridxz2.position.z = -0.5;
gridxz2.position.y = 0.5;
gridxz2.visible = false;
markerScene.add(gridxz2);
gridArray.push(gridxz2); //no4
////grid表示（終

////xyz軸表示THREE.ArrowHelper(向き,始点,長さ,色,頭の長さ,頭の太さ)
var axisLength = 2; // 矢印の長さ
var axisHeadLength = 0.15; // 矢印の頭の長さ
var axisHeadWidth = 0.1; // 矢印の頭の太さ
//x軸
var directionX = new THREE.Vector3(0, 0, 1); // 矢印の向き(X方向)
var startX = new THREE.Vector3(0, 0, -1); // 矢印の始点
var colorX = 0xff0000; //赤
var axisX = new THREE.ArrowHelper(
  directionX,
  startX,
  axisLength + axisHeadLength * 2,
  colorX,
  axisHeadLength,
  axisHeadWidth
);
markerScene.add(axisX);
axisArray.push(axisX); //no0
//ｙ軸
var directionY = new THREE.Vector3(1, 0, 0); // 矢印の向き(Y方向)
var startY = new THREE.Vector3(-1, 0, 0); // 矢印の始点
var colorY = 0x00ff00; //緑
var axisY = new THREE.ArrowHelper(
  directionY,
  startY,
  axisLength + axisHeadLength * 2,
  colorY,
  axisHeadLength,
  axisHeadWidth
);
markerScene.add(axisY);
axisArray.push(axisY); //no1
//z軸
var directionZ = new THREE.Vector3(0, 1, 0); // 矢印の向き(Z方向)
var startZ = new THREE.Vector3(0, 0, 0); // 矢印の始点
var colorZ = 0x0000ff; //青
var axisZ = new THREE.ArrowHelper(
  directionZ,
  startZ,
  axisLength - 1 + axisHeadLength * 2,
  colorZ,
  axisHeadLength,
  axisHeadWidth
);
markerScene.add(axisZ);
axisArray.push(axisZ); //no2
////xyz軸表示（終）

////座標名称表示
var fontLoader = new THREE.FontLoader();
fontLoader.load("fonts/helvetiker_bold.typeface.json", function(font1) {
  //x
  var textXGeometry = new THREE.TextGeometry("X", {
    font: font1,
    size: axisLength / 20,
    height: 0.01,
    curveSegments: 0,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 0
  });
  var textXMaterial = new THREE.MeshPhongMaterial({
    color: colorX,
    transparent: true
  });
  var textX = new THREE.Mesh(textXGeometry, textXMaterial);
  textX.position.set(-0.04, 0, axisLength / 2 + 0.25 + axisHeadLength);
  markerScene.add(textX);
  axisArray.push(textX); //no3
  //y
  var textYGeometry = new THREE.TextGeometry("Y", {
    font: font1,
    size: axisLength / 20,
    height: 0.01,
    curveSegments: 0,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 0
  });
  var textYMaterial = new THREE.MeshPhongMaterial({
    color: colorY,
    transparent: true
  });
  var textY = new THREE.Mesh(textYGeometry, textYMaterial);
  textY.position.set(axisLength / 2 + 0.25 + axisHeadLength, 0, 0);
  markerScene.add(textY);
  axisArray.push(textY); //no4
  //z
  var textZGeometry = new THREE.TextGeometry("Z", {
    font: font1,
    size: axisLength / 20,
    height: 0.01,
    curveSegments: 0,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 0
  });
  var textZMaterial = new THREE.MeshPhongMaterial({
    color: colorZ,
    transparent: true
  });
  var textZ = new THREE.Mesh(textZGeometry, textZMaterial);
  textZ.position.set(-0.04, axisLength / 2 + 0.25 + axisHeadLength, 0);
  markerScene.add(textZ);
  axisArray.push(textZ); //no5
  ////座標名称表示（終）

  ///////////////////////////////////////
  //sprite label
  ////////////////////////////////////////
  //a spritelanel
  var Alavelmaterial = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load("images/A.png")
  });
  var Asprite = new THREE.Sprite(Alavelmaterial);
  Asprite.scale.set(0.2, 0.2, 0.2);
  Asprite.position.set(ay / 5 + 0.05, az / 5 + 0.05, ax / 5 + 0.1);
  markerScene.add(Asprite);
  axisArray.push(Asprite);
  //b spritelabel
  var Blavelmaterial = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load("images/B.png")
  });
  var Bsprite = new THREE.Sprite(Blavelmaterial);
  Bsprite.scale.set(0.2, 0.2, 0.2);
  Bsprite.position.set(by / 5 + 0.05, bz / 5 - 0.05, bx / 5 + 0.1);
  markerScene.add(Bsprite);
  axisArray.push(Bsprite);
  //c spritelabel
  var Clavelmaterial = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load("images/C.png")
  });
  var Csprite = new THREE.Sprite(Clavelmaterial);
  Csprite.scale.set(0.2, 0.2, 0.2);
  Csprite.position.set(cy / 5 - 0.05, cz / 5 - 0.05, cx / 5 + 0.1);
  markerScene.add(Csprite);
  axisArray.push(Csprite);
  ////finish sprite label
});
/////////////////////////////////////
///要素の作成
/////////////////////////////////////
///点の表示
//点aの座標
var ax = 0;
var ay = 5;
var az = 0;
//点aの描画
var geometry = new THREE.SphereGeometry(0.05); //半径
var amaterial = new THREE.MeshPhongMaterial({
  color: 0xfe2e2e //赤
});
var amesh = new THREE.Mesh(geometry, amaterial);
amesh.position.set(ay / 5, az / 5, ax / 5);
markerScene.add(amesh);
object.push(amesh); //no0
//点bの座標
var bx = 5;
var by = 0;
var bz = 0;
//点bの描画
var geometry = new THREE.SphereGeometry(0.05); //半径
var bmaterial = new THREE.MeshPhongMaterial({
  color: 0x0040ff //青
});
var bmesh = new THREE.Mesh(geometry, bmaterial);
bmesh.position.set(by / 5, bz / 5, bx / 5);
markerScene.add(bmesh);
object.push(bmesh); //no1
//点cの座標
var cx = 0;
var cy = 0;
var cz = 5;
//点cの描画
var geometry = new THREE.SphereGeometry(0.05); //半径
var cmaterial = new THREE.MeshPhongMaterial({
  color: 0x00ff00 //緑
});
var cmesh = new THREE.Mesh(geometry, cmaterial);
cmesh.position.set(cy / 5, cz / 5, cx / 5);
markerScene.add(cmesh);
object.push(cmesh); //no2

var normalgeometry = new THREE.Geometry();
//頂点を設定
normalgeometry.vertices[0] = new THREE.Vector3(ay / 5, az / 5, ax / 5);
normalgeometry.vertices[1] = new THREE.Vector3(by / 5, bz / 5, bx / 5);
normalgeometry.vertices[2] = new THREE.Vector3(cy / 5, cz / 5, cx / 5);
//面を設定
normalgeometry.faces[0] = new THREE.Face3(0, 1, 2);
normalgeometry.computeFaceNormals();
normalgeometry.computeVertexNormals();
var normalmaterial = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,
  color: 0x0a2a29,
  metal: true,
  opacity: 0.8,
  transparent: true,
  depthTest: false
});
var normal = new THREE.Mesh(normalgeometry, normalmaterial);
markerScene.add(normal);
object.push(normal); //no3
