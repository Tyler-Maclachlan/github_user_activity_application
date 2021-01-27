<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img :src="avatarUrl" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="repoName" />
      <v-list-item-subtitle v-text="description" />
    </v-list-item-content>
    <v-list-item-action>
      <v-menu top offset-x>
        <template #activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item :href="repoUrlApi" target="_blank">
            <v-list-item-title>View on GitHub API</v-list-item-title>
          </v-list-item>
          <v-list-item :href="repoUrlHtml" target="_blank">
            <v-list-item-title>View on GitHub HTML</v-list-item-title>
          </v-list-item>
          <v-list-item disabled>
            <v-list-item-title
              >View Activity - Coming Soon&trade;</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import moment from "moment";

import { GitHubActivity } from "@/services/github/types";

@Component
export default class ActivityListItem extends Vue {
  @Prop() public activity!: GitHubActivity;

  private get avatarUrl() {
    return this.activity.actor.avatar_url;
  }

  private get repoName() {
    return this.activity.repo.name;
  }

  private get repoUrlHtml() {
    return this.activity.repo.url.replace("api.github.com/repos", "github.com");
  }

  private get repoUrlApi() {
    return this.activity.repo.url;
  }

  private get description() {
    const type = this.activity.type?.replace("Event", "") || "Unknown Activity";
    const user = this.activity.actor.login;
    const timestamp = moment(this.activity.created_at).format(
      "HH:mm Do MMM YYYY"
    );

    return `${type} by ${user} at ${timestamp}`;
  }
}
</script>