<template>
  <div ref="container" class="h-screen w-screen" />
</template>
<script setup>
import { Graph } from '@antv/x6';
import { ref, onMounted } from 'vue';
// import { register, getTeleport } from '@antv/x6-vue-shape';

const container = ref('');

onMounted(() => {
  const graph = new Graph({
    container: container.value,
    // width: 800,  // 可以通过设置 width 和 height 固定画布大小，如果不设置，就会以画布容器大小初始化画布
    // height: 600,
    autoResize: true,
    background: {
      color: '#F2F7FA'
    },
    grid: true,
    // 鼠标滚轮配合说法
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta']
    }
  });


  const markers = [
    ['block', { size: 6 }],
    ['classic', { size: 6 }],
    ['diamond', { size: 8 }],
    ['circle', { size: 6 }],
    ['circlePlus', { size: 6 }],
    ['ellipse', { rx: 6, ry: 4 }],
    ['cross', { size: 8, offset: 1 }],
    ['async', { size: 8, offset: 1 }],
  ]

  markers.forEach(([marker, args], i) => {
    graph.addEdge({
      sourcePoint: [220, 30 + i * 40],
      targetPoint: [500, 30 + i * 40],
      label: marker,
      attrs: {
        line: {
          sourceMarker: {
            args,
            name: marker,
          },
          targetMarker: {
            args,
            name: marker,
          },
          strokeWidth: 1,
        },
      },
    })
  })
  graph.fromJSON(data); // 渲染元素
  graph.centerContent(); // 居中显示
});
</script>

<style lang="less" scoped></style>
