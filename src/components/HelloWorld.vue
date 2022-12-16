<script setup lang="ts">
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { onMounted } from "vue";

onMounted(() => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  canvas.style.width = "100%";
  canvas.style.height = "350px";

  // 生成 BABYLON 3D 引擎
  var engine = new BABYLON.Engine(canvas, true);

  const createScene = function () {
    engine.enableOfflineSupport = false;

    BABYLON.Animation.AllowMatricesInterpolation = true;

    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); //设置画布背景透明

    var camera = new BABYLON.ArcRotateCamera(
      "camera1",
      Math.PI / 2,
      Math.PI / 2,
      4,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;
    camera.wheelDeltaPercentage = 0.01;

    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.6;
    light.specular = BABYLON.Color3.White();

    var light2 = new BABYLON.DirectionalLight(
      "dir01",
      new BABYLON.Vector3(0, -0.5, -1.0),
      scene
    );
    light2.position = new BABYLON.Vector3(0, 5, 5);

    // 阴影
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light2);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;

    // The model('https://shuquan-static.oss-cn-hangzhou.aliyuncs.com/u/pi/AYBlkLZDR4eHdiJHKI5SLQ/SZuRYxYWx7IR/0')
    // is passed from the backEnd to the frontEnd.
    // The model just is a url.
    BABYLON.SceneLoader.ImportMesh(
      "",
      "",
      "https://shuquan-static.oss-cn-hangzhou.aliyuncs.com/u/pi/AYBlkLZDR4eHdiJHKI5SLQ/SZuRYxYWx7IR/0",
      scene,
      function (meshes: any) {
        console.log(meshes);
      }
    );
    return scene;
  };

  // 调用 createScene 函数
  const scene = createScene();

  // 注册渲染循环以重复渲染场景
  engine.runRenderLoop(function () {
    scene.render();
  });

  // 监视浏览器/画布调整尺寸事件
  window.addEventListener("resize", function () {
    engine.resize();
  });
});
</script>

<template>
  <h2>The main code is in HelloWorld.vue under the components directory.</h2>
  <canvas></canvas>
</template>

<style scoped></style>
