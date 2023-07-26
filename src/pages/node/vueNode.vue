<template>
  <div class="app-content">
    <div id="container"  class="w-screen h-screen"></div>
    <TeleportContainer />
  </div>
</template>

<script setup>
  // import { defineComponent } from 'vue'
  import ProgressNode from '../../components/ProgressNode.vue'
  import { Graph } from '@antv/x6'
  import { register, getTeleport } from '@antv/x6-vue-shape'
  import { ref, onMounted } from 'vue';

  // 先注册节点
  register({
    shape: 'custom-vue-node',
    width: 100,
    height: 100,
    component: ProgressNode,
  })
  const TeleportContainer = getTeleport()

  onMounted(()=>{
    const graph = new Graph({
        container: document.getElementById('container'),
        grid:true,
        background: {
          color: '#F2F7FA',
        },
        autoResize: true,
      })

      graph.addNode({
        shape: 'custom-vue-node', // 将节点渲染到画布上
        x: 100,
        y: 60,

      })
  })
</script>
