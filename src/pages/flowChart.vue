<template>
  <div class="flex h-screen w-screen">
    <div
      id="stencil"
      ref="stencilContainer"
      class="relative h-full w-1/6"
    />

    <div class="h-full w-5/6">
      <div class="flex h-[60px] w-full items-center justify-center gap-3">
        <button
          class="btn"
          @click="onUndo"
        >
          撤销
        </button>
        <button
          class="btn"
          @click="onRedo"
        >
          重做
        </button>
        <button
          class="btn"
          @click="big"
        >
          放大
        </button>
        <button
          class="btn"
          @click="small"
        >
          缩小
        </button>
      </div>
      <div
        ref="container"
        class="h-[5/6-60px] w-full"
      />
    </div>
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
// import ContextMenuTool from '../utils/ContextMenuTool';

const container = ref('');
let graph = '';

// 控制连接桩显示/隐藏
const showPorts = (ports, show) => {
  for (let i = 0, len = ports.length; i < len; i += 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden';
  }
};

onMounted(() => {
  graph = new Graph({
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
    .use(
      new Keyboard({
        enabled: true,
      }),
    )
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
  graph.centerContent(); // 居中显示

  // 节点移入
  graph.on('node:mouseenter', () => {
    const contai = container.value;
    const ports = contai.querySelectorAll('.x6-port-body');
    showPorts(ports, true);
  });
  // 节点移除
  graph.on('node:mouseleave', () => {
    const contai = container.value;
    const ports = contai.querySelectorAll('.x6-port-body');
    showPorts(ports, false);
  });

  // 节点点击
  graph.on('node:click', (e) => {
    console.log('e: ', e);
  });

  graph.bindKey('Delete', () => {
    // 获取所有选中的元素
    const cells = graph.getSelectedCells();
    graph.removeCells(cells); // 删除元素
  });

  // 监听节点右键事件
  graph.on('node:contextmenu', ({
    cell, e, x, y, node, view,
  }) => {
    const p = graph.clientToGraph(e.clientX, e.clientY);
    node.addTools([
      {
        name: 'contextmenu',
        args: {
          // menu,
          x: p.x,
          y: p.y,
          onHide() {
            node.removeTools();
          },
        },
      },
    ]);
  });

  // 复制
  graph.bindKey('ctrl+c', () => {
    const cells = graph.getSelectedCells();// 选中所有被选中的元素
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  });

  //  粘贴
  graph.bindKey('ctrl+v', () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  });
});

// 放大
function big() {
  graph.zoom(0.2);
}

// 缩小
function small() {
  graph.zoom(-0.2);
}

// 重做
function onRedo() {
  graph.redo();
}

// 撤销
function onUndo() {
  graph.undo();
}

// #endregion
</script>

<style lang="scss" scoped></style>
