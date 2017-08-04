<template>
  <div id="app" class="paddingLeft10">
    <div>
        <router-link to="/addapply">addapply</router-link>
        <router-link to="/areadata"><span>hospital</span></router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
</style>
