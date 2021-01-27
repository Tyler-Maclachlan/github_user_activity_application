<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title>GitHub User Activity</v-app-bar-title>

    <v-spacer></v-spacer>
    <v-form ref="usernameForm" @submit.prevent="search">
      <v-text-field
        v-model="username"
        label="Search a GitHub user"
        :rules="[(v) => !!v || 'Username is required']"
        placeholder="Enter a username"
        hide-details
        single-line
      >
        <template #append>
          <v-btn type="submit" text>Go</v-btn>
        </template>
      </v-text-field>
    </v-form>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { UserModule } from "@/store";

@Component
export default class AppBar extends Vue {
  private get username() {
    return UserModule.username;
  }

  private set username(username: string) {
    UserModule.setUsername(username);
  }

  private async search() {
    console.log();
    if ((this.$refs.usernameForm as any).validate()) {
      await UserModule.fetchUserActivity();
      console.log("done");
    }
  }
}
</script>