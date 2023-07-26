<template>
	<div ref="container" class="h-screen w-screen" />
  <div ref="minimap" id="minimap" class="absolute bottom-0  w-28 h-28"></div>
</template>
<script setup>
import { Graph } from '@antv/x6';
import { ref, onMounted } from 'vue';
import { MiniMap } from '@antv/x6-plugin-minimap'


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
	edges: [
		{
			shape: 'edge',
			source: 'node1',
			target: 'node2',
			label: 'x6',
			attrs: {
				// line 是选择器名称，选中的边的 path 元素
				line: {
					stroke: '#8f8f8f',
					strokeWidth: 1
				}
			}
		}
	]
};

const container = ref('');
const minimap = ref("")

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

  graph.use(
  new MiniMap({
    container: minimap.value,
  }),
)

	graph.fromJSON(data); // 渲染元素
	graph.centerContent(); // 居中显示
});
</script>

<style lang="less" scoped></style>
