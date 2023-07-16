<template>
	<div class="alert m-auto w-1/2">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-info">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<span>{{ tips }}</span>
	</div>
	<!-- 画图宽高 -->
	<div class="flex">
		<div class="p-6">
			<h3>图宽高</h3>
			<div class="flex">
				<div class="mr-2">宽度：</div>
				<input v-model="widthVal" type="range" min="0" max="1240" class="range range-xs w-80" @change="changeSize" />
			</div>

			<div class="flex">
				<div class="mr-2">长度：</div>
				<input v-model="heightVal" type="range" min="0" max="700" class="range range-xs w-80" @change="changeSize" />
			</div>
		</div>
		<!-- 缩放 -->
		<div class="flex p-6">
			<div class="mr-2">缩放比例</div>
			<input v-model="zoomVal" type="range" min="0" max="30" class="range range-xs w-80" step="0.1" @change="changeZoom" />
			<div class="cursor-pointer" @click="getZoom">获取缩放比例</div>
			<!-- zoomToFit -->
		</div>
		<!-- graph -->
		<div ref="container" class="h-screen w-screen" />
	</div>
</template>

<script setup>
import { Graph } from '@antv/x6';
import { ref, onMounted } from 'vue';

const widthVal = ref(100);
const heightVal = ref(100);
const zoomVal = ref(0.5);
const tips = ref('');

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
let graph;
onMounted(() => {
	graph = new Graph({
		container: container.value,
		// 通过 scaling 配置画布的最小或最大缩放级别。
		scaling: {
			min: 0.05, // 默认值为0.0.1 最小
			max: 12 // 默认值16
		}
	});
	graph.fromJSON(data);
	graph.centerContent();
});

// edit graph size
function changeSize(e) {
	graph.resize(widthVal.value, heightVal.value);
}

// edite graph zoom scale
function changeZoom() {
	graph.zoomTo(zoomVal.value);
}

function getZoom() {
	tips.value = graph.zoom();
	console.log(' graph.getZoom();: ', graph.zoom());
}
</script>

<style lang="scss" scoped></style>
