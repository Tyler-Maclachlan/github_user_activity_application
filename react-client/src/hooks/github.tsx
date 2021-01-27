import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import GitHubService from '../services/github/Github';
import { GitHubActivityData } from '../services/github/types';

interface IGitHubContext {
    activities: GitHubActivityData;
    error: string;
    loading: boolean;
    username: string;
    setUsername: (username: string) => void;
    fetchUserActivity: (username: string) => Promise<void>;
    clearError: () => void;
}

type GitHubContext = IGitHubContext;

const gitHubContext = createContext<GitHubContext | undefined>(undefined);

export const ProvideGitHub = ({ children }: { children: ReactNode}): JSX.Element => {
    const github = useProvideGithub();
    return <gitHubContext.Provider value={github}>{children}</gitHubContext.Provider>
}

export const useGitHub = (): GitHubContext => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return useContext(gitHubContext)!;
}

function useProvideGithub() {
    const [activities, setActivities] = useState<GitHubActivityData>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const activity = localStorage.getItem('activity');
        const username = localStorage.getItem('username');

        if (activity)
            setActivities(JSON.parse(activity));

        if (username)
            setUsername(username);
    }, [setActivities, setUsername])

    const fetchUserActivity = async (username: string) => {
        setLoading(true);
        try {
            const activity = await GitHubService.getUserActivity(username);

            localStorage.setItem('activity', JSON.stringify(activity));
            localStorage.setItem('username', username);
            setActivities(activity);
        } catch (error) {
            setError(error.message);
            localStorage.setItem('activity', JSON.stringify([]));
            localStorage.setItem('username', '');
            setActivities([]);
        }
        
        setLoading(false);
    }

    const clearError = () => {
        setError('');
    }

    return {
        activities,
        error,
        loading,
        username,
        setUsername,
        fetchUserActivity,
        clearError
    }
}