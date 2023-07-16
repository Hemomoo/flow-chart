import Index from '@/pages/index.vue';
import NotFound from '@/pages/not-found.vue';
import FlowChart from '@/pages/flowChart.vue';
import BaseGraph from '@/pages/base/graph.vue';
import BaseGrid from '@/pages/canvas/grid.vue';
import BaseBackground from '@/pages/canvas/background.vue';
import BaseGraphMove from '@/pages/canvas/graphMove.vue';
import BaseGraphZoom from '@/pages/canvas/graphZoom.vue';
import BaseGraphTransform from '@/pages/canvas/graphTransform.vue';
import BuiltinNodes from '@/pages/node/builtinNodes.vue'
import VueNode from '@/pages/node/vueNode.vue'
import Ports from '@/pages/ports/ports.vue'
import Edge from '@/pages/edges/edge.vue'
import Arrow from "@/pages/edges/arrow.vue"


export const routes = [
	{ path: '/', component: Index },
	{ path: '/flowChart', component: FlowChart },
	{ path: '/base/graph', component: BaseGraph },
	{ path: '/canvas/grid', component: BaseGrid },
	{ path: '/canvas/background', component: BaseBackground },
	{ path: '/canvas/graphZoom', component: BaseGraphZoom },
	{ path: '/canvas/graphMove', component: BaseGraphMove },
	{ path: '/canvas/graphTransform', component: BaseGraphTransform },
  { path: '/node/BuiltinNodes', component:BuiltinNodes},
  { path: '/node/vueNode', component:VueNode},
  { path: '/ports/ports',component:Ports},
  { path: '/edges/edge', component:Edge},
  { path: '/edges/arrow', component:Arrow},

	{ path: '/:path(.*)', component: NotFound }
];

export default routes;



// export default routes;
