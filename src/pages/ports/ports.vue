<!-- 连接桩 -->
<template>
  <div class="w-screen h-screen">
    <div class="flex h-16 items-center justify-center bg-white gap-2">
      <button class="btn" @click="add">新增</button>
      <button class="btn" @click="del">删除</button>
      <button class="btn" @click="update">更新</button>
    </div>
    <div ref="container" class="h-[64px] w-screen" />
  </div>
</template>
<script setup>
import { Graph, Color } from "@antv/x6";
import { ref, onMounted } from "vue";

// 连接桩点位置
// const ports = {
//   groups: {
//     top: {
//       position: "top",
//       attrs: {
//         circle: {
//           r: 4,
//           magnet: true,
//           stroke: "#5F95FF",
//           strokeWidth: 1,
//           fill: "#fff",
//           style: {
//             visibility: "hidden",
//           },
//         },
//       },
//     },
//     right: {
//       position: "right",
//       attrs: {
//         circle: {
//           r: 4,
//           magnet: true,
//           stroke: "#5F95FF",
//           strokeWidth: 1,
//           fill: "#fff",
//           style: {
//             visibility: "hidden",
//           },
//         },
//       },
//     },
//     bottom: {
//       position: "bottom",
//       attrs: {
//         circle: {
//           r: 4,
//           magnet: true,
//           stroke: "#5F95FF",
//           strokeWidth: 1,
//           fill: "#fff",
//           style: {
//             visibility: "hidden",
//           },
//         },
//       },
//     },
//     left: {
//       position: "left",
//       attrs: {
//         circle: {
//           r: 4,
//           magnet: true,
//           stroke: "#5F95FF",
//           strokeWidth: 1,
//           fill: "#fff",
//           style: {
//             visibility: "hidden",
//           },
//         },
//       },
//     },
//   },
//   items: [
//     {
//       group: "top",
//     },
//     {
//       group: "right",
//     },
//     {
//       group: "bottom",
//     },
//     {
//       group: "left",
//     },
//   ],
// };

const data = {
  nodes: [
    {
      id: "node1",
      shape: "rect",
      x: 80,
      y: 190,
      width: 100,
      height: 40,
      label: "hello",
      // ports: ports,
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
      ports: {
        groups: {
          left: {
            position: 'top',

          },
        },
      },
    },
  ],
};

const container = ref("");
let graph = "";

// 控制连接桩显示/隐藏
const showPorts = (ports, show) => {
  for (let i = 0, len = ports.length; i < len; i += 1) {
    ports[i].style.visibility = show ? "visible" : "hidden";
  }
};

onMounted(() => {
  graph = new Graph({
    container: container.value,
    // width: 800,  // 可以通过设置 width 和 height 固定画布大小，如果不设置，就会以画布容器大小初始化画布
    // height: 600,
    autoResize: true,
    background: {
      color: "#F2F7FA",
    },
    grid: true,
    // 鼠标滚轮配合说法
    mousewheel: {
      enabled: true,
      modifiers: ["ctrl", "meta"],
    },
  });
  graph.fromJSON(data); // 渲染元素
  graph.centerContent(); // 居中显示

  graph.on("node:mouseenter", () => {
    const contai = container.value;
    const ports = contai.querySelectorAll(".x6-port-body");
    showPorts(ports, true);
  });
});

// 增加节点
function add() {
  // 获取指定id的节点
  const node = graph.getCellById("node1");
  // 获取所有的连接桩
  const ports = node.getPorts()
  if(ports.length < 4){
    node.addPort({
    group: 'left',
    attrs: {
      circle: {
        magnet: true,
        stroke: '#31d0c6',
        strokeWidth: 2,
        fill: '#ffffff',
      },
      text: {
        position:'top',
        text: `${ ports.length }`
      }
    },
  })
  }
}

// 更新ports颜色
function update() {
  // 获取指定id的节点
  const node = graph.getCellById("node1");
  // 获取所有的连接桩
  const ports = node.getPorts()
  const color = Color.random().toHex();
  ports.forEach((port) => {
    node.portProp(port.id, "attrs/circle/stroke", color);
    node.portProp(port.id, "attrs/circle/fill", color);
  });
}

// 删除ports
function del() {
  const node = graph.getCellById("node1");
  // 获取所有的连接桩
  const ports = node.getPorts()
  if (ports.length) {
    node.removePortAt(ports.length - 1)
  }
}

</script>

<style lang="less" scoped></style>
