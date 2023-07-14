// import { Graph, ToolsView, EdgeView } from '@antv/x6';

// // 新增右键
// class ContextMenuTool extends ToolsView.ToolItem {
//   render() {
//     if (!this.knob) {
//       this.knob = ToolsView.createElement('div', false);
//       this.knob.style.position = 'absolute';
//       this.container.appendChild(this.knob);
//     }
//     return this;
//   }

//   // 切换menu
//   toggleContextMenu(visible) {
//     // ReactDom.unmountComponentAtNode(this.knob);
//     document.removeEventListener('mousedown', this.onMouseDown);

//     if (visible) {
//       const content = 'Hello, world!';
//       const div = document.createElement('div');
//       div.innerHTML = `<p>${content}</p>`;

//       // 将创建的 div 元素添加到文档中的某个位置
//       this.knob.appendChild(div);
//       document.addEventListener('mousedown', this.onMouseDown);
//     }
//   }

//   updatePosition(e) {
//     const { style } = this.knob;
//     if (e) {
//       const pos = this.graph.clientToGraph(e.clientX, e.clientY);
//       style.left = `${pos.x}px`;
//       style.top = `${pos.y}px`;
//     } else {
//       style.left = '-1000px';
//       style.top = '-1000px';
//     }
//   }

//   onMouseDown() {
//     this.timer = window.setTimeout(() => {
//       this.updatePosition();
//       this.toggleContextMenu(false);
//     }, 200);
//   }

//   onContextMenu(e) {
//     if (this.timer) {
//       clearTimeout(this.timer);
//       this.timer = 0;
//     }
//     this.updatePosition(e);
//     this.toggleContextMenu(true);
//   }

//   delegateEvents() {
//     this.cellView.on('cell:contextmenu', this.onContextMenu, this);
//     return super.delegateEvents();
//   }

//   onRemove() {
//     this.cellView.off('cell:contextmenu', this.onContextMenu, this);
//   }
// }
