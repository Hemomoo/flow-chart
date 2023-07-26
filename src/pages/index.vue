<script setup>
import { onMounted } from 'vue';
import { initTheme } from '@/composables/theme.js';

onMounted(() => {
  initTheme();
});
</script>

<template>
  <div class="flex cursor-pointer flex-col gap-3 p-8">
    <div>
      <h2 class="font-bold text-2xl">画布</h2>
      <router-link to="/canvas/grid" class="cursor-pointer"> 网格线 </router-link>
      <router-link to="/canvas/background" class="cursor-pointer"> 背景 </router-link>
      <router-link to="/canvas/graphMove" class="cursor-pointer"> 图移动 </router-link>
      <router-link to="/canvas/graphZoom" class="cursor-pointer"> 图缩放 </router-link>
      <!-- 视口变换 -->
      <router-link to="/canvas/graphTransform"> 视口变换 </router-link>
    </div>
    <div>
      <h2 class="font-bold text-2xl">节点</h2>
      <router-link to="/node/BuiltinNodes" class="cursor-pointer"> 内置节点 </router-link>
      <router-link to="/node/vueNode" class="cursor-pointer"> vue节点 </router-link>

    </div>
    <div>
      <h2 class="font-bold text-2xl">连接桩</h2>
      <router-link to="/ports/ports">连接桩</router-link>
    </div>

    <div>
      <h2 class="font-bold text-2xl">边</h2>
      <div class="flex gap-2">
        <router-link to="/edges/edge">边</router-link>
      </div>
    </div>
    <!-- 箭头 -->
    <div>
      <h2 class="font-bold text-2xl">箭头</h2>
      <div class="flex gap-2">
        <router-link to="/arrows/arrow">箭头</router-link>
        <router-link to="/arrows/customArrow">自定义箭头</router-link>
      </div>
    </div>
    <!--交互  -->
    <!-- <div>
      <h2 class="font-bold text-2xl">交互</h2>
      <div class="flex gap-2">
        <router-link to="/interactions/interaction">交互</router-link>
      </div>
    </div> -->
   <!-- 事件  -->
    <div>
      <h2 class="font-bold text-2xl">事件</h2>
      <div class="flex gap-2">
        <router-link to="/events/event">事件</router-link>
      </div>
    </div>

    <div>
      <h2 class="font-bold text-2xl">插件</h2>
      <div class="flex gap-2">
        <router-link to="/plugins/map">小地图</router-link>
        <router-link to="/plugins/keyboard">快捷键</router-link>
      </div>
    </div>

  </div>
</template>

<style></style>
