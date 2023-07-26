<template>
	<div class="m-6 h-screen w-screen">
		<div class="flex gap-3">
			<div class="cursor-pointer" @click="setGridSize">修改size</div>
			<div class="cursor-pointer" @click="hideGrid">隐藏网格</div>
			<div class="cursor-pointer" @click="showGrid">显示网格</div>
			<!-- <div class="cursor-pointer" @click="clearGird">清除网格</div>
			<div class="cursor-pointer" @click="drawGrid">绘制网格</div> -->
		</div>
		<div ref="container" class="h-full w-full" />
	</div>
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
// 自定义网格
Graph.registerGrid('red-dot', {
	color: 'red',
	thickness: 2, // 疏密度
	markup: 'rect',
	update(elem, options) {
		const width = options.thickness * options.sx;
		const height = options.thiickness * options.sy;
		Dom.attr(elem, {
			width,
			height,
			rx: width,
			ry: height,
			fill: options.color
		});
	}
});

const container = ref('');
let graph;
onMounted(() => {
	graph = new Graph({
		container: container.value,
		virtual: true,
		grid: {
			size: 10, // 网格大小 10px
			visible: true, // 绘制网格，默认绘制 dot 类型网格
			/*
			 * dot：默认值
			 * fixedDot: 固定网点大小的点状网络 ，画布大小随着画布缩放比例缩放
			 * mesh 网状网格
			 * doubleMesh: 双线网状网格
			 */
			type: 'dot', //  dot 点状默认值；fixedDot 固定大小点状；
			args: {
				color: '#8f8f8f', // 网点颜色
				thickness: 1 // 网点大小
			}
		},
		autoResize: false,
		background: {
			color: '#F2F7FA'
		}
	});
	graph.fromJSON(data); // 渲染元素
	graph.centerContent(); // 居中显示

	/*
	 * graph.getGridSize();
	 * 获取网格大小
	 */
	// console.log('graph.getGridSize(): ', graph.getGridSize());
	/*
	 * graph.setGridSize();
	 * 设置网格大小
	 * setGridSize(gridSize:number) :this
	 */
});

// 设置网格大小
function setGridSize() {
	console.log('click is success ');
	graph.setGridSize(6);
}

// 隐藏网格
function hideGrid() {
	graph.hideGrid();
}

// 显示网格
function showGrid() {
	graph.showGrid();
}

// 清除网格
// function clearGird() {
// 	graph.clearGird();
// }
/*
 * drawGrid(options?: DrawGridOptions): this
 * 名称	类型	必选	默认值	描述
 * type	string		dot	网格类型。详情请参考这里。
 * args	object		-	与网格类型对应的网格参数。
 * 项目用不上不看了
 */
// function drawGrid() {
//   // console.log('绘制网格');
//   graph.drawGrid({
//     type: 'red-dot',
//     attr: {
//       color: 'red',
//       thickness: 2,
//     },
//   });
// }
</script>

<style lang="less" scoped></style>
