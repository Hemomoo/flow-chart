<template>
  <div class="flex h-screen w-screen">
    <div
      id="stencil"
      ref="stencilContainer"
      class="h-full w-1/5"
    />
    <div
      ref="container"
      class="h-full w-4/5"
    />
  </div>
</template>
<script setup>
import { Graph, Shape } from '@antv/x6';
import { ref, onMounted } from 'vue';
import { Transform } from '@antv/x6-plugin-transform';
import { Stencil } from '@antv/x6-plugin-stencil';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';
import nodeRegister from '../utils/nodeRegistration';

const data = {
  // 节点
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
          ry: 6,
        },
      },
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
          ry: 6,
        },
      },
    },
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
          strokeWidth: 1,
        },
      },
    },
  ],
};

const container = ref('');

// 控制连接桩显示/隐藏
const showPorts = (ports, show) => {
  for (let i = 0, len = ports.length; i < len; i += 1) {
    // eslint-disable-next-line no-param-reassign
    ports[i].style.visibility = show ? 'visible' : 'hidden';
  }
};

onMounted(() => {
  const graph = new Graph({
    container: container.value,
    grid: true,
    autoResize: true,
    background: {
      color: '#F2F7FA',
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#5F95FF',
            stroke: '#5F95FF',
          },
        },
      },
    },
    connecting: {
      router: 'manhattan',
      connector: {
        name: 'rounded',
        args: {
          radius: 8,
        },
      },
      allowNode: true,
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8,
              },
            },
          },
          tools: [
            {
              name: 'edge-editor',
              setText: (text) => {
                console.log('text: ', text);
              },
            },
          ],
          zIndex: 2,
        });
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet;
      },
    },
  });
  // 增加节点
  graph
    .use(
      new Transform({
        resizing: true,
        rotating: false, // 是不是支持旋转
      }),
    )
    .use(
      new Selection({
        rubberband: true,
        showNodeSelectionBox: true,
      }),
    )
    .use(new Snapline())
    .use(new Keyboard())
    .use(new Clipboard())
    .use(new History());
  // #endregion
  const nodeDefaultsize = {
    width: 50,
    height: 50,
  };
  nodeRegister();
  const r1 = graph.createNode({
    shape: 'custom-rect',
    label: '自定义',
  });
  const r2 = graph.createNode({
    shape: 'rect',
    size: nodeDefaultsize,
  });
  const r3 = graph.createNode({
    shape: 'rect',
    size: nodeDefaultsize,
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
  });
  const r4 = graph.createNode({
    shape: 'polygon',
    size: nodeDefaultsize,
    attrs: {
      body: {
        refPoints: '0,10 10,0 20,10 10,20',
      },
    },
  });
  const r5 = graph.createNode({
    shape: 'polygon',
    size: nodeDefaultsize,
    attrs: {
      body: {
        refPoints: '10,0 40,0 30,20 0,20',
      },
    },
  });
  const r6 = graph.createNode({
    shape: 'circle',
    size: nodeDefaultsize,
  });
  // 初始化
  const stencil = new Stencil({
    title: '流程图',
    target: graph,
    stencilGraphWidth: 200,
    stencilGraphHeight: 180,
    collapsable: true,
    groups: [
      {
        title: '基础流程图',
        name: 'group1',
      },
      {
        title: '系统设计图',
        name: 'group2',
        graphHeight: 250,
        layoutOptions: {
          rowHeight: 70,
        },
      },
    ],
    layoutOptions: {
      columns: 2,
      columnWidth: 80,
      rowHeight: 55,
    },
  });
  stencil.load([r1, r2, r3, r4, r5, r6], 'group1');
  document.getElementById('stencil').appendChild(stencil.container);

  // const dnd = new Dnd({
  //   target: graph,
  // });

  graph.fromJSON(data); // 渲染元素
  graph.centerContent(); // 居中显示

  graph.on('node:mouseenter', () => {
    console.log('jaj');
    const contai = container.value;
    const ports = contai.querySelectorAll(
      '.x6-port-body',
    );
    showPorts(ports, true);
  });
  graph.on('node:mouseleave', () => {
    const contai = container.value;
    const ports = contai.querySelectorAll(
      '.x6-port-body',
    );
    showPorts(ports, false);
  });
});

// #endregion
</script>

<style lang="scss" scoped></style>
