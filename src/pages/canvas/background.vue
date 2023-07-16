<template>
	<div ref="container" class="h-screen w-screen" />
</template>
<script setup>
import { Dom, Graph } from '@antv/x6';
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
let graph;
onMounted(() => {
	graph = new Graph({
		container: container.value,
		virtual: true,
		// width: 500,
		// height: 700,
		grid: {
			size: 10, // 网格大小 10px
			visible: true, // 绘制网格，默认绘制 dot 类型网格
			type: 'dot', //  dot 点状默认值；fixedDot 固定大小点状；
			args: {
				color: '#8f8f8f', // 网点颜色
				thickness: 1 // 网点大小
			}
		},
		autoResize: false,
		background: {
			/*
			 *  值：
			 *  red
			 *  #f5f5f5
			 *  rgba(255, 255, 128, 0.5)
			 *  hsla(50, 33%, 25%, 0.75)
			 * radial-gradient(ellipse at center, red, green)
			 */
			// color: '#F2F7FA',
			image:
				'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcd0d78d91bd445da2589d6b7da8bed6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?', // 背景图为URL地址
			position: 'center', // 背景图片位置，支持所有 CSS background-position 属性的取值，默认为
			size: '10 10', // 背景图片大小，支持所有 CSS background-size 属性的取值，默认为 'auto auto'。
			/* 背景图片重复方式，支持所有 CSS background-repeat 属性的取值，默认为 'no-repeat'
			 * watermark: 水印
			 * flip-x： 水平反转背景图片
			 * flip-y: 垂直翻转背景图片
			 * flip-xy: 水平和垂直翻转背景图片
			 */
			repeat: 'watermark',
			opacity: '0.7', // 透明度
			angle: '20' // 水印角度
		}
	});
	graph.fromJSON(data); // 渲染元素
	graph.centerContent(); // 居中显示
});
</script>

<style lang="less" scoped></style>
