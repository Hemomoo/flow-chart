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
        shape: 'custom-vue-node',
        x: 100,
        y: 60,

      })
      graph.addNode({
        x: 200,
        y: 120,
        width:100,
        height:100,
        tools: [
            {
              name: 'edge-editor',
              setText: (text) => {
                console.log('text: ', text);
              },
            },
          ],
      })
  })

  // export default defineComponent({
  //   name: 'App',
  //   components: {
  //     TeleportContainer,
  //   },
  //   mounted() {

  //   },
  // })
</script>
