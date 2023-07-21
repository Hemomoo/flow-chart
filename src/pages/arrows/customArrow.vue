<!-- 自定义箭头 -->
<template>
  <div ref="container" class="h-screen w-screen" />
</template>
<script setup>
import { Graph } from '@antv/x6';
import { ref, onMounted } from 'vue';
// import { register, getTeleport } from '@antv/x6-vue-shape';


const container = ref('');


// 注册一个箭头
Graph.registerMarker('image2', (args) => {
  const { imageUrl, imageWidth, imageHeight, ...attrs } = args
  return {
    ...attrs, // 原样返回非特殊涵义的参数
    tagName: 'image', // 使用 <image> 标签渲染箭头，其余键值对都将作为该元素的属性。
    width: imageWidth,
    height: imageHeight,
    'xlink:href': imageUrl,
  }
})


onMounted(() => {
  const graph = new Graph({
    container: container.value,
    // width: 800,  // 可以通过设置 width 和 height 固定画布大小，如果不设置，就会以画布容器大小初始化画布
    // height: 600,
    autoResize: true,
    background: {
      color: '#F2F7FA'
    },
    grid: true,
    // 鼠标滚轮配合说法
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta']
    }
  });
  // graph.centerContent(); // 居中显示

  // path  自定义箭头
  graph.addEdge({
    source: { x: 100, y: 40 },
    target: { x: 400, y: 40 },
    attrs: {
      line: {
        stroke: '#31d0c6',
        sourceMarker: {
          name: 'path',
          d: 'M5.5,15.499,15.8,21.447,15.8,15.846,25.5,21.447,25.5,9.552,15.8,15.152,15.8,9.552z',
        },
        targetMarker: {
          name: 'path',
          offsetX: 10,
          d: 'M4.834,4.834L4.833,4.833c-5.889,5.892-5.89,15.443,0.001,21.334s15.44,5.888,21.33-0.002c5.891-5.891,5.893-15.44,0.002-21.33C20.275-1.056,10.725-1.056,4.834,4.834zM25.459,5.542c0.833,0.836,1.523,1.757,2.104,2.726l-4.08,4.08c-0.418-1.062-1.053-2.06-1.912-2.918c-0.859-0.859-1.857-1.494-2.92-1.913l4.08-4.08C23.7,4.018,24.622,4.709,25.459,5.542zM10.139,20.862c-2.958-2.968-2.959-7.758-0.001-10.725c2.966-2.957,7.756-2.957,10.725,0c2.954,2.965,2.955,7.757-0.001,10.724C17.896,23.819,13.104,23.817,10.139,20.862zM5.542,25.459c-0.833-0.837-1.524-1.759-2.105-2.728l4.081-4.081c0.418,1.063,1.055,2.06,1.914,2.919c0.858,0.859,1.855,1.494,2.917,1.913l-4.081,4.081C7.299,26.982,6.379,26.292,5.542,25.459zM8.268,3.435l4.082,4.082C11.288,7.935,10.29,8.571,9.43,9.43c-0.858,0.859-1.494,1.855-1.912,2.918L3.436,8.267c0.58-0.969,1.271-1.89,2.105-2.727C6.377,4.707,7.299,4.016,8.268,3.435zM22.732,27.563l-4.082-4.082c1.062-0.418,2.061-1.053,2.919-1.912c0.859-0.859,1.495-1.857,1.913-2.92l4.082,4.082c-0.58,0.969-1.271,1.891-2.105,2.728C24.623,26.292,23.701,26.983,22.732,27.563z',
        },
      },
    },
  })

  // 使用svg 箭头
  graph.addEdge({
    source: { x: 240, y: 120 },
    target: { x: 420, y: 80 },
    vertices: [{ x: 320, y: 170 }],
    connector: { name: 'rounded' },
    attrs: {
      line: {
        sourceMarker: {
          tagName: 'circle',
          r: 12,
          cx: 12,
          fill: '#ffd591',
          stroke: '#ffa940',
        },
        targetMarker: {
          tagName: 'ellipse',
          rx: 20,
          ry: 10,
          cx: 20,
          fill: '#73d13d',
          stroke: '#237804',
        },
      },
    },
  })

  // 使用图片

  const marker = {
    tagName: 'image',
    // https://www.iconfinder.com/icons/15539/arrow_left_previos_icon
    'xlink:href':
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFMklEQVRYR+2WaWxUVRiGnzt3lntnptPOdGba6ZRS7ALUsFY2g7SyhKWA0ALKHrBgWBRqQioQKJZdVpHdH5jKokGBgopoBCpbIkvYJIoIspUudGEYmHY6c8eMLCHIojVATLjJ+XfP9z75znve7wg84094xvo8B/jfd8AsQZMq2AP4a+On/9KBZqmyvPpnj+enUhhTG/HgnloB6GFU/8YJM40Gg/mjA0dHK7DiaQHEN0CYkzmke8ao+SOYmTk/MGvrj12A7540gDEE+neJi80ZO/0tZ7v+rwOVZMSkuTddvNIKOPWkAV4a1jBu/3sLummi6xmpqizh/O8VZI3e8UeB60ZroPhJAOiA6juFW5vlrV99k9lDY5BAFDm2+wyjx205dNLnG2AymRJdLtevwJl7QGQguEyACqgCKgDPvbAPMqEzCkY6NdpOB2u8fYHLgKZnXJ19+Wc+bQFBLpk9679k8rsfX7e+3MZrMBrD9+Xnr/W4XMcjjVJilD08tq4zMiY03GTTaWVtQPELJUVlyuWzhZeOFhYVXERZDRy5/xY0jYIBHRvEDewz/NWoUJuRqZPW7T10pXRzS4u5w8ylmd3a9G8D1X7Qacib9AknTonkfr6OJYsXUT/iJimpzTHHRgABwAWuIryuMnzVHnw1ApWlHvZvP8GGlQWVWyuuDQG2CREwPNFoHNa1S6OWKV2StInJDkJC/Cg1XorOlXPxTCUxDevgiLdzo+IqNdfKELwlrFpwmMjkMYyYNY0ZM6bx5tAEHFFq3L8c4dql01Rdr0AjmZBCLaj1JrSGUDSSjE6vpiD/HJPHrT27z+NuFTyCVxJFMXvMoLZpaekRhJo8uCt9+Lw1CHjRaDQoiPj8IKol1JIOQ5jEqnlHCU3sxdD3c8jJzmJAiwtY9T4EKQSjIw5DZCxanRFkAyjgdRXjdZVjtEaD3kBWxyks3nui310PqGB8rzrWKeOyUy3J7euhlqz4FQMBRSEQ8COogj4S8N6oxO8+zcoPjqB/oTudR2WyYtFcsnpL2BwOVDrDrXjz3+piTc1NqsqKCfi9mOomIVscqIUq5o1dw8SNB7LuN2GjeEHMGdYzKSN9UALRCTEIchwIOqrdZfg9blQ6CcF3gSW5uxCdnWiakc6OTWvITtdhDNHj94sEVEGjiqAIBEQBtU6PWjbi93sRUOG7fp4lU75m5s6zfwO4Y8zBaZGm3IG9bHWTW8iExaWgtTVBo9WhUmtwnd7C0tk7uWpuT6u+vfn+szWBpOqTQp1oPXaHCZvDhMlqRh9mxRBuRyOF4PepUNChxsPpfRtZNPs31l9yjX3ULIirhzBncIq9z2v9HMQmp2KMCaauSNnxPJbN2Myuy9HlSZ1TLMcOHjp78PDhhWEQHymKjZ2y2CDSoolwOnRiRIQOq02L3WnBEWPD5ykl/4vz7D+s1Pzgrmz/uGGk0sDbfeuZc9/IkEzNU1rjbDsV9+UCFr+Ty/Sd5XMFWS4ON5uTCwsLB9++f1rACsSroGkYNI4U1UkOvTYxVBYssloreKq07C0vziuBkY8DuBNa7doapeVDu6pf7NivDbb6HViW/SFTtl+Z44WJt9PuJuB7SCTrATvQUA/NvODzQR5Q9E8BgnWj6wvi8mGdQnr0Tjfw7Q6FCZuvzPfChNrOgdq8B3QWmD0+1ZJlCtEwaVvxspsw9mkC/KUlw/jeDvvC3cVXNxQqysCnDhAUlGCkXaVqcUFRRj3i7B/L9m888KBiDqAM8D5W6SE//FeA2ure3fcc4HkH/gSNF7Qt0mUkowAAAABJRU5ErkJggg==',
    width: 32,
    height: 32,
    x: -16,
    y: -16,
  }

  graph.addEdge({
    source: { x: 140, y: 300 },
    target: { x: 420, y: 300 },
    // vertices: [{ x: 320, y: 170 }],
    connector: { name: 'rounded' },
    attrs: {
      line: {
        stroke: '#653433',
        sourceMarker: { ...marker },
        targetMarker: { ...marker },
      },
    },
  })

  // 使用注册的箭头
  graph.addEdge({
    source: { x: 140, y: 400 },
    target: { x: 420, y: 400 },
    attrs: {
      line: {
        sourceMarker: {
          name: 'image2',
          imageUrl:
            'http://cdn3.iconfinder.com/data/icons/49handdrawing/24x24/left.png',
          imageWidth: 24,
          imageHeight: 24,
          y: -12,
        },
        targetMarker: {
          name: 'image2',
          imageUrl:
            'http://cdn3.iconfinder.com/data/icons/49handdrawing/24x24/left.png',
          imageWidth: 24,
          imageHeight: 24,
          y: -12,
        },
      },
    },
  })

});
</script>

<style lang="less" scoped></style>
