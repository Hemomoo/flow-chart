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
	graph.fromJSON(data); // 渲染元素
	graph.centerContent(); // 居中显示

  // 点击边

  graph.on('cell:click', ({ e, x, y, cell, view }) => {
    console.log('单击元素')
  })
  graph.on('node:click', ({ e, x, y, node, view }) => {
    console.log('单击节点')
  })
  graph.on('edge:click', ({ e, x, y, edge, view }) => {
    console.log('单击边')
  })
  graph.on('blank:click', ({ e, x, y }) => {
    console.log('单击画布空白处')
  })

  graph.on('cell:dblclick', ({ e, x, y, cell, view }) => {
    console.log('双击元素')
  })
  graph.on('node:dbcell:dblclick', ({ e, x, y, node, view }) => {
    console.log('双击节点')
  })
  graph.on('edge:dbcell:dblclick', ({ e, x, y, edge, view }) => {
    console.log('双击边')
  })
  graph.on('blank:dbcell:dblclick', ({ e, x, y }) => {
    console.log('双击画布空白处')
  })


  graph.on('cell:mouseenter', ({ e, cell, view }) => {
    console.log('鼠标移入元素')
  })
  graph.on('node:mouseenter', ({ e, node, view }) => {
    console.log('鼠标移入节点')
  })
  graph.on('edge:mouseenter', ({ e, edge, view }) => {
    console.log('鼠标移入边')
  })
  graph.on('graph:mouseenter', ({ e }) => {
    console.log('鼠标移入画布')
  })

  // 移除
  graph.on('cell:mouseleave', ({ e, cell, view }) => {
    console.log('鼠标移出元素')
  })
  graph.on('node:mocell:mouseleave', ({ e, node, view }) => {
    console.log('鼠标移出节点')
  })
  graph.on('edge:mocell:mouseleave', ({ e, edge, view }) => {
    console.log('鼠标移出边')
  })
  graph.on('graph:mocell:mouseleave', ({ e }) => {
    console.log('鼠标移出画布')
  })

  graph.on('scale', ({ sx, sy, ox, oy }) => {
    console.log('缩放画布时触发，sx 和 sy 是缩放比例，ox 和 oy 是缩放中心。');
  })
  graph.on('resize', ({ width, height }) => {
    console.log('画布大小改变被触发');
  })
  graph.on('translate', ({ tx, ty }) => {
    console.log('平移画布时触发，tx 和 ty 分别是 X 和 Y 轴的偏移量。');
  })


  graph.on('node:move', ({ e, x, y, node, view }) => {
    console.log('开始移动节点时触发。');
  })

  graph.on('node:moving', ({ e, x, y, node, view }) => {
    console.log('移动节点时触发。');
  })

  graph.on('node:moved', ({ e, x, y, node, view }) => {
    console.log('移动节点结束时触发。');
  })


  graph.on('edge:move', ({ e, x, y, node, view }) => {
    console.log('开始移动节点时触发。');
  })

  graph.on('edge:moving', ({ e, x, y, node, view }) => {
    console.log('移动节点时触发。');
  })

  graph.on('edge:moved', ({ e, x, y, node, view }) => {
    console.log('移动节点结束时触发。');
  })

});
</script>

<style lang="less" scoped></style>
