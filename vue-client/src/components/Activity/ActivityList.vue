<template>
  <div v-if="hasActivity">
    <ActivityListItem
      v-for="item in activity"
      :key="item.id"
      :activity="item"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { UserModule } from "@/store";

import ActivityListItem from "@/components/Activity/ActivityListItem.vue";

@Component({
  components: {
    ActivityListItem,
  },
})
export default class ActivityList extends Vue {
  private get hasActivity() {
    return this.activity.length > 0;
  }

  private get activity() {
    return UserModule.activity;
  }
}
</script>