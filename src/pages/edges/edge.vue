<template>
	<div ref="container" class="h-screen w-screen" />
</template>
<script setup>
import { Graph } from '@antv/x6';
import { ref, onMounted } from 'vue';
// import { register, getTeleport } from '@antv/x6-vue-shape';

const data = {
	nodes: [
		{
			id: 'node1',
			shape: 'rect',
			x: 40,
			y: 40,
			width: 100,
			height: 40,
			label: 'hello',
			attrs: {
				// body 是选择器名称，选中的是 rect 元素
				body: {
					stroke: '#8f8f8f',
					strokeWidth: 1,
					fill: '#fff',
					rx: 6,
					ry: 6
				}
			}
		},
		{
			id: 'node2',
			shape: 'rect',
			x: 160,
			y: 180,
			width: 100,
			height: 40,
			label: 'world',
			attrs: {
				body: {
					stroke: '#8f8f8f',
					strokeWidth: 1,
					fill: '#fff',
					rx: 6,
					ry: 6
				}
			}
		}
	],
	// edges: [
	// 	{
	// 		shape: 'edge',
	// 		source: 'node1',
	// 		target: 'node2',
	// 		label: 'x6',
	// 		attrs: {
	// 			// line 是选择器名称，选中的边的 path 元素
	// 			line: {
	// 				stroke: '#8f8f8f',
	// 				strokeWidth: 1
	// 			}
	// 		}
	// 	}
	// ]
};

const container = ref('');

onMounted(() => {
	const graph = new Graph({
		container: container.value,
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


	graph.fromJSON(data); // 渲染元素
	graph.centerContent(); // 居中显示
  graph.addEdge({
    id:'edge1',
    source: { x: 180, y: 40 },
    target: { x: 280, y: 80 },
  })

  graph.addEdge({
    source:{
      cell:'node1'
    },
    target:{
      cell:'node2'
    }
  })

  graph.addEdge({
    source:{
      cell:'node1'
    },
    target:{
      cell:'edge1'
    },
  })


});
</script>

<style lang="less" scoped></style>
