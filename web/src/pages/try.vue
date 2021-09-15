<template>
  <div class="all">
    <div class="head">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">文件</el-menu-item>
        <el-submenu index="2">
          <template slot="title">置入</template>
          <el-menu-item index="2-1">矩形</el-menu-item>
          <el-menu-item index="2-2">圆形</el-menu-item>
          <el-menu-item index="2-3">三角形</el-menu-item>
          <el-menu-item index="2-4">星形</el-menu-item>
          <el-menu-item index="2-5">文件</el-menu-item>
        </el-submenu>

        <el-menu-item index="3">
          <a href="#" target="_blank">帮助</a>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <div class="a">
        <el-col :span="12">
          <h5>图层</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <span slot="title" @click="getRectangle()">矩形</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title" @click="getCircle()">圆形</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title" @click="getTrangle()">三角形</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title" @click="getStar()">星形</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </div>
      <div class="b">
        <div id="container" ref="container" class="container" />
      </div>
      <div class="c">
        <div>
          <h4>基本</h4>
          <div>
            <span>
              <input type="text" v-model="x" @change="change()" id="X" />
              <input type="text" v-model="y" @change="change()" id="X" />
            </span>
            <span>
              <input type="text" v-model="width" value="w" @change="change()" id="X" />
              <input type="text" v-model="height" value="h" @change="change()" id="X" />
            </span>
          </div>
        </div>
        <div>
          <h4>背景色</h4>
          <div>
            <el-color-picker v-model="color1" @change="changeColor()" size="mini"></el-color-picker>
            <input type="text" v-model="color" />
          </div>
          <div class="demonstration">颜色</div>
        </div>
        <div>
          <h4>边框</h4>
          <div>
            <el-color-picker v-model="color2" @change="changeColor1()" size="mini"></el-color-picker>
            <input type="text" v-model="borderWidth" @change="changeWidth()" />
          </div>
        </div>
        <div>
          <h4>阴影</h4>
          <div>
            <el-color-picker v-model="color2" @change="changeColor2()" size="mini"></el-color-picker>
            <input type="text" v-model="x1" @change="changeX()" />
            <input type="text" v-model="y1" @change="changeY()" />
            <input type="text" v-model="blur" @change="changeBlur()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.el-col-12 {
  width: 100%;
}
.main .a {
  float: left;
  height: 1000px;
  width: 200px;
  /* background-color: lightgray; */
}
.main .b {
  float: left;
  height: 1000px;
  width: 1274px;
  background-color: lightgray;
}
.main .c {
  float: left;
  height: 1000px;
  width: 200px;
}
h4 {
  text-align: left;
  margin: 10 0;
}
.demonstration {
  float: left;
  font-size: 12px;
  margin: 5px;
  //height: 40px;
}
#X {
  width: 80px;
  padding: 5px;
}

#container {
  width: 1000px;
  height: 1274px;
}
</style>



<script>
import Konva from "konva";

export default {
  name: "Star",

  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      x: "x",
      y: "y",
      width: 0,
      height: 0,
      stage: null,
      color1: "#FFFFFF",
      color: "#FFFFFF",
      color2: "#030303",
      borderWidth: 1,
      x1: 0,
      y1: 0,
      blur: 0
    };
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeX() {
      console.log(this.x1);
    },
    changeColor() {
      console.log(this.color1);
      this.color = this.color1;
      var shape = this.stage.find("#myRect")[0];
      //console.log(this.color1);
      shape.fill(this.color1);
    },
    changeWidth() {
      console.log("....");
      var shape = this.stage.find("#myRect")[0];
      shape.strokeWidth(this.borderWidth);
      //console.log(shape.layer);
      this.layer.draw();
    },
    change() {
      // console.log(this.x);
      var shape = this.stage.find("#myRect")[0];

      if (this.tween) {
        this.tween.destroy();
      }
      console.log("--------------");

      this.tween = new Konva.Tween({
        node: shape,
        duration: 0,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,

        easing: Konva.Easings.Linear
      }).play();
    },

    getStar() {
      console.log("44");
      // const

      const star = new Konva.Star({
        x: this.stage.width() / 2,
        y: this.stage.height() / 2,
        numPoints: 5,
        innerRadius: 40,
        outerRadius: 70,
        fill: "#FFF",
        stroke: "black",
        shadowColor: "black",
        strokeWidth: 1,
        shadowBlur: 0,
        shadowOffset: { x: 0, y: 0 },
        shadowOpacity: 0.5,
        draggable: true
      });

      const tr = new Konva.Transformer();
      this.layer.add(tr);
      // by default select all shapes
      tr.nodes([star]);
      this.layer.add(star);
      this.stage.add(this.layer);
      this.layer.draw();
      this.x = star.attrs.x;
      this.y = star.attrs.y;
      this.width = star.getWidth();
      this.height = star.getHeight();

      console.log(star.attrs.shadowBlur);
      this.x1 = star.attrs.shadowOffsetX;
      this.y1 = star.attrs.shadowOffsetY;
      this.blur = star.attrs.shadowBlur;

      star.on("dragmove", event => {
        console.log(event.evt.layerX);
        this.x = event.evt.layerX;
        this.y = event.evt.layerY;
      });
    },

    getRectangle() {
      console.log("11");
      console.log(this.x + ".." + this.y);

      const rect = new Konva.Rect({
        x: this.stage.width() / 2,
        y: this.stage.height() / 2,
        width: 100,
        height: 50,
        fill: "#FFF",
        stroke: "black",
        shadowColor: "black",
        strokeWidth: 1,
        shadowBlur: 0,
        shadowOffset: { x: 10, y: 10 },
        shadowOpacity: 0.5,
        draggable: true,
        id: "myRect"
      });

      const tr = new Konva.Transformer();
      this.layer.add(tr);
      // by default select all shapes
      tr.nodes([rect]);
      this.layer.add(rect);
      this.stage.add(this.layer);
      this.layer.draw();
      this.x = rect.attrs.x;
      this.y = rect.attrs.y;
      this.width = rect.attrs.width;
      this.height = rect.attrs.height;

      rect.on("dragmove", event => {
        //console.log(event.evt.layerX);
        this.x = event.evt.layerX;
        this.y = event.evt.layerY;
      });
    },

    getCircle() {
      console.log("22");

      const circle = new Konva.Circle({
        x: this.stage.width() / 2,
        y: this.stage.height() / 2,
        radius: 70,
        fill: "#FFF",
        stroke: "black",
        strokeWidth: 1,
        shadowBlur: 0,
        shadowOffset: { x: 10, y: 10 },
        shadowOpacity: 0.5,
        draggable: true
      });

      const tr = new Konva.Transformer();
      this.layer.add(tr);
      // by default select all shapes
      tr.nodes([circle]);
      this.layer.add(circle);
      this.stage.add(this.layer);
      this.layer.draw();
      this.x = circle.attrs.x;
      this.y = circle.attrs.y;
      this.width = circle.getWidth();
      this.height = circle.getHeight();

      circle.on("dragmove", event => {
        console.log(event.evt.layerX);

        this.x = event.evt.layerX;
        this.y = event.evt.layerY;
      });

      // simulate click on circle
    },

    getTrangle() {
      console.log("33");

      const line = new Konva.RegularPolygon({
        x: 100,
        y: 150,
        sides: 3,
        radius: 60,
        fill: "#FFF",
        stroke: "black",
        strokeWidth: 1,
        shadowBlur: 0,
        shadowOffset: { x: 10, y: 10 },
        shadowOpacity: 0.5,
        draggable: true
        //closed: true
      });

      const tr = new Konva.Transformer();
      this.layer.add(tr);
      // by default select all shapes
      tr.nodes([line]);
      this.layer.add(line);
      this.stage.add(this.layer);
      this.layer.draw();
      this.x = line.attrs.x;
      this.y = line.attrs.y;
      this.width = line.getWidth();
      this.height = line.getHeight();

      line.on("dragmove", event => {
        console.log(event.evt.layerX);
        this.x = event.evt.layerX;
        this.y = event.evt.layerY;
      });
    }
  },

  mounted() {
    this.stage = new Konva.Stage({
      container: "container", // id of container <div>
      width: 1274,
      height: 1000
    });
    var tween;
    this.layer = new Konva.Layer();
  }
};
</script>