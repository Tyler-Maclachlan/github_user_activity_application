<template>
  <v-app>
    <AppBar />

    <v-main>
      <router-view></router-view>
    </v-main>

    <notifications position="bottom center" group="notifications" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AppBar from "@/components/Layout/AppBar.vue";

@Component({
  components: {
    AppBar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;

  font-size: 12px;

  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }

  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }
}
</style>