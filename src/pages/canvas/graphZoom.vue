<!-- 画布缩放 -->

<template>
	<div class="flex cursor-pointer gap-3">
		<div @click="judgeIsZoom">判断是否开启</div>
		<div @click="enableMouseWheel">启用滚轮缩放画布</div>
		<div @click="disableMouseWheel">禁用滚轮缩放画布</div>
		<div @click="toggleMouseWheel">切换滚轮缩放的状态</div>
	</div>
	<div ref="container" class="h-screen w-screen" />
</template>
<script setup>
import { Graph } from '@antv/x6';
import { ref, onMounted } from 'vue';

const container = ref('');
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
let graph;
onMounted(() => {
	graph = new Graph({
		container: container.value,
		grid: {
			type: 'dot'
		},
		/*
      interface MouseWheelOptions {
        enabled?: boolean // 是否开启
        global?: boolean // 是否为全局事件，设置为 true 时滚轮事件绑定在 Document 上，否则绑定在画布容器上。默认为 false。
        factor?: number // 动缩放因子。默认为 1.2。
        zoomAtMousePosition?: boolean // 是否将鼠标位置作为中心缩放，默认为 true。
        modifiers?: string | ('alt' | 'ctrl' | 'meta' | 'shift')[] | null
        guard?: (this: Graph, e: WheelEvent) => boolean // 判断一个滚轮事件是否被处理
      }
    */
		mousewheel: {
			enabled: true
			/*
        修饰键(alt、ctrl、meta、shift)，设置修饰键后需要按下修饰键并滚动鼠标滚轮时才触发画布缩放。通过设置修饰键可以解决默认滚动行为与画布缩放冲突问题。修饰键支持以下几种形式：
        alt 表示按下 alt。
        [alt, ctrl] 表示按下 alt 或 ctrl。
        alt|ctrl 表示按下 alt 或 ctrl。
        alt&ctrl 表示同时按下 alt 和 ctrl。
        alt|ctrl&shift 表示同时按下 alt 和 shift 或者同时按下 ctrl 和 shift。
      */
			// modifiers: ['ctrl', 'meta'],
			// guard(self, e) {
			//   if (e.altKey) {
			//     return false;
			//   }
			//   return true;
			// },
		}
	});
	graph.fromJSON(data);
	graph.centerContent();
});

function judgeIsZoom() {
	alert(`是不是开启了缩放${graph.isMouseWheelEnabled()}`);
	graph.isMouseWheelEnabled();
}

function enableMouseWheel() {
	graph.enableMouseWheel();
}

function disableMouseWheel() {
	graph.disableMouseWheel();
}

function toggleMouseWheel() {
	graph.toggleMouseWheel();
}
</script>

<style lang="less" scoped></style>
