import { GitHubActivityData, GitHubUserSearchData } from "./types";

import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

export default class GitHubService {
    static readonly GIT_API_URL = 'https://api.github.com/';

    public static async getUserActivity(username: string): Promise<GitHubActivityData> {
        try {
            const activity = await octokit.activity.listPublicEventsForUser({ username });

            return activity.data;
        } catch (error) {
            console.log(error);
            throw new Error(`User ${JSON.parse(error.message).message}`);
        }
    }

    public static async searchUsers(partialUsername: string): Promise<GitHubUserSearchData> {
        try {
            const users = await octokit.search.users({q: encodeURIComponent(`${partialUsername} in:login`)})
            
            return users.data;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
}