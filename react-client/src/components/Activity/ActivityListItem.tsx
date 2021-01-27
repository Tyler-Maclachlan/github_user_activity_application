import React, { useState, MouseEvent } from 'react';
import { GitHubActivity } from '../../services/github/types';
import moment from 'moment';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import MoreVert from '@material-ui/icons/MoreVert';

interface ActivityListItemProps {
    activity: GitHubActivity;
}

export default function ActivityListItem({ activity }: ActivityListItemProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const repoHttpUrl = activity.repo.url.replace("api.github.com/repos", "github.com");

    const description = () => {
        const type = activity.type?.replace("Event", "") || "Unknown Activity";
        const user = activity.actor.login;
        const timestamp = moment(activity.created_at).format(
        "HH:mm Do MMM YYYY"
        );

        return `${type} by ${user} at ${timestamp}`;
    };

    const openMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const openInNewTab = (type: 'api' | 'html') => {
        const url = type === 'html' ? repoHttpUrl : activity.repo.url;
        window.open(url, '_blank');
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={activity.actor.avatar_url} />
            </ListItemAvatar>
            <ListItemText primary={activity.repo.name} secondary={description()} />
            <ListItemSecondaryAction>
                <IconButton onClick={openMenu}>
                    <MoreVert />
                </IconButton>
                <Menu 
                    anchorEl={anchorEl}
                    id="activity-item-menu"
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                >
                    <MenuItem onClick={() => openInNewTab('api')}>View on GitHub API</MenuItem>
                    <MenuItem onClick={() => openInNewTab('html')}>View on GitHub HTML</MenuItem>
                    <MenuItem disabled>View - Coming Soon&trade;</MenuItem>
                </Menu>
            </ListItemSecondaryAction>
        </ListItem>
    )
}