<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="6">
        <ActivityList />
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ActivityList from "@/components/Activity/ActivityList.vue";

@Component({
  components: {
    ActivityList,
  },
})
export default class Home extends Vue {}
</script>
