<template>
  <div class="w-full min-h-screen relative" data-theme="aqua">
    <!-- <progress class="progress progress-primary w-full absolute" value="1" max="2"></progress> -->
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transitionName" mode="default">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>
