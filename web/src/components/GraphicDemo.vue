<template>
<div id="graphicContainer">
    
</div>
</template>

<style>
 #graphicContainer {
     width: 800px;
     height: 800px;
 }
</style>
<script>
import Konva from 'konva';
export default {
    mounted() {
        const stage = new Konva.Stage({
            container: 'graphicContainer',   // id of container <div>
            width: 800,
            height: 800
        });
        const layer = new Konva.Layer();
        const circle = new Konva.Circle({
            x: stage.width() / 2,
            y: stage.height() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            });

        const tr = new Konva.Transformer();
        layer.add(tr);
      // by default select all shapes
        tr.nodes([circle]);
        layer.add(circle);
        stage.add(layer);
        layer.draw();
        
    }
}
</script>