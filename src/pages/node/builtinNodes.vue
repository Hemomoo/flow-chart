<template>
	<div ref="container" class="h-screen w-screen" />
</template>
<script setup>
import { Graph } from '@antv/x6';
import { ref, onMounted } from 'vue';

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
			shape: 'circle',
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

onMounted(() => {
  console.log("llll");
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



	graph.fromJSON(data); // 渲染元素
	graph.centerContent(); // 居中显示


    graph.addNode({
      x: 10,
      y: 20,
      width: 120,
      height: 60,
      label: "rect",
      attrs: {
        body: {
          stroke: "#237804",
          fill: "#73d13d",
          rx: 10,
          ry: 10
        },
        label: {
          refX: 0.5,
          refY: "100%",
          refY2: -8,
          textAnchor: "middle",
          textVerticalAnchor: "bottom"
        }
      }
    });
});
</script>

<style lang="less" scoped></style>
