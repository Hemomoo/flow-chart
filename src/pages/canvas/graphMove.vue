<template>
	<div class="m-3 flex cursor-pointer gap-3">
		<div class="text-base" @click="judgeIsOpen">判读是否开启画布移动</div>

		<!-- 启用画布移动 -->'

		<div @click="enablePanning">启用画布移动</div>

		<div @click="disablePanning">禁用画布移动</div>

		<div @click="togglePanning">启用和禁用切换</div>
	</div>
	<div ref="container" class="h-screen w-screen" />
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Graph } from '@antv/x6';

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

const container = ref(null);
let graph = null;
onMounted(() => {
	graph = new Graph({
		container: container.value,
		panning: {
			enabled: true, // 开启画布移动 是否开启画布平移交互。
			/* 拖拽可能和其他操作冲突，此时可以设置 modifiers 参数，设置修饰键后需要按下修饰键并点击鼠标才能触发画布拖拽。
        type ModifierKey = string | ('alt' | 'ctrl' | 'meta' | 'shift')[] | null
        alt 表示按下 alt。
        [alt, ctrl] 表示按下 alt 或 ctrl。
        alt|ctrl 表示按下 alt 或 ctrl。
        alt&ctrl 表示同时按下 alt 和 ctrl。
        alt|ctrl&shift 表示同时按下 alt 和 shift 或者同时按下 ctrl 和 shift。
      */
			modifiers: null
			/*
        eventTypes
        触发画布平移的交互方式。支持三种形式或者他们之间的组合：
        1. leftMouseDown: 按下鼠标左键移动进行拖拽
        2. rightMouseDown: 按下鼠标右键移动进行拖拽
        3. mouseWheel: 使用鼠标滚轮拖拽
      */
			// eventTypes: ['rightMouseDown', 'mouseWheel'],
		},
		grid: {
			size: 10, // 网格大小 10px
			visible: true, // 绘制网格，默认绘制 dot 类型网格
			type: 'dot', //  dot 点状默认值；fixedDot 固定大小点状；
			args: {
				color: '#8f8f8f', // 网点颜色
				thickness: 1 // 网点大小
			}
		}
	});
	graph.fromJSON(data);
	graph.centerContent(); // 居中显示
});

function judgeIsOpen() {
	graph.isPannable();
	alert(`是是否开启？${graph.isPannable()}`);
	console.log(' graph.isPannable(): ', graph.isPannable());
}
// 启用移动
function enablePanning() {
	graph.enablePanning();
}

function disablePanning() {
	graph.disablePanning();
}

// 切换移动和不移动
function togglePanning() {
	graph.togglePanning();
}
</script>

<style lang="less" scoped></style>
