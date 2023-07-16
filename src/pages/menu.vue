/* eslint-disable */
<template>
  <div>
    <div
      ref="container"
      class="h-screen w-screen" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Graph, Shape, ToolsView } from '@antv/x6';

const container = ref(null);
// const

class ContextMenuTool extends ToolsView.ToolItem {
  render() {
    if (!this.knob) {
      this.knob = ToolsView.createElement('div', false)
      this.knob.style.width = '100px'
      this.knob.style.height = '100px'
      this.knob.style.background = 'red'
      this.knob.style.position = 'absolute'
      this.container.appendChild(this.knob)
    }
    return this
  }


  toggleContextMenu(visible) {

    // const child =  this.knob.children[0]
    // // 判断是否有
    // if(child){ this.knob.removeChild(child)}
    // document.removeEventListener('mousedown', this.onMouseDown);
    // if (visible) {
    //   const div = document.createElement('div');
    //   div.innerHTML = `
    //     <div>niho </div>
    //   `
    //   this.knob.appendChild(div);
    //   console.log('this.knob',this.knob);
      // document.addEventListener('mousedown', this.onMouseDown)
    // }
  }

  updatePosition(e) {
    // e 拿到的是右键点击事件
    const style = this.knob.style
    if (e) {
      const p = this.graph.clientToGraph(e.clientX, e.clientY);
      style.display = 'block'
      style.left = `${p.x}px`
      style.top  =`${p.y}px`
      style.background = 'yellow'
    } else {
      style.display = 'none'
      style.left = '-1000px'
      style.top = '-1000px'
    }
  }



  onMouseDown = () => {
    this.timer = window.setTimeout(() => {
      this.updatePosition()
      this.toggleContextMenu(false)
    }, 500)
  }


  onContextMenu({ e }) {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = 0
    }
    this.updatePosition(e)
    this.toggleContextMenu(true)
  }


  delegateEvents() {
    this.cellView.on('cell:contextmenu', this.onContextMenu, this)
    return super.delegateEvents()
  }
  onRemove() {
    this.cellView.off('cell:contextmenu', this.onContextMenu, this)
  }
}




onMounted(() => {
  const graph = new Graph({
    container: container.value,
    grid: true,
  });

  ContextMenuTool.config({
    tagName: 'div',
    isSVGElement: false,
  });
  Graph.registerNodeTool('contextmenu', ContextMenuTool, true);
  const source = graph.addNode({
    x: 180,
    y: 60,
    width: 100,
    height: 40,
    attrs: {
      body: {
        stroke: '#5F95FF',
        fill: '#EFF4FF',
        strokeWidth: 1,
      },
    },
  });

  // const target = graph.addNode({
  //   x: 320,
  //   y: 250,
  //   width: 100,
  //   height: 40,
  //   label:"你好",
  //   attrs: {
  //     body: {
  //       stroke: '#5F95FF',
  //       fill: '#EFF4FF',
  //       strokeWidth: 1,
  //     },
  //   },
  // });

  // graph.addEdge({
  //   source,
  //   target,
  //   attrs: {
  //     line: {
  //       stroke: '#A2B1C3',
  //       strokeWidth: 2,
  //     },
  //   },
  // });

  // 增加节点右键事件
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
          // onHide() {
          //   node.removeTools();
          // },
        },
      },
    ]);
  });

});
</script>

<style lang="scss" scoped></style>
