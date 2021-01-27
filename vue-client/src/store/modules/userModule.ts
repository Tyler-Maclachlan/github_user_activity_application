import GitHubService from '@/services/github/Github';
import { GitHubActivityData } from '@/services/github/types';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

import Notifications from '@/services/notifications/notifications';

@Module({
    name: 'userModule',
    namespaced: true
})
export default class UserModule extends VuexModule {
    private _username = '';
    private _activity: GitHubActivityData = [];

    public get username() {
        return this._username;
    }

    public get activity() {
        return this._activity;
    }

    @Mutation
    public setUsername(username: string) {
        this._username = username;
    }

    @Mutation
    public setActivity(activity: GitHubActivityData) {
        this._activity = activity;
    }

    @Action
    public async fetchUserActivity() {
        try {
            const activity = await GitHubService.getUserActivity(this._username);
            this.setActivity(activity);
        } catch (error) {
            console.log(error.message);
            Notifications.displayErrorNotification('Fetch Activity Error', error.message);
        }
    }
}