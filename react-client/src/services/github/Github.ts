import { GitHubActivityData } from "./types";

import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

export default class GitHubService {
    static readonly GIT_API_URL = 'https://api.github.com/';

    public static async getUserActivity(username: string): Promise<GitHubActivityData> {
        try {
            const activity = await octokit.activity.listPublicEventsForUser({ username });

            return activity.data;
        } catch (error) {
            console.log(error.message);
            throw new Error(`User ${error.message}`);
        }
    }
}