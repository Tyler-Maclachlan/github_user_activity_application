import React from 'react';
import { useGitHub } from '../../hooks/github';

import List from '@material-ui/core/List'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

import ActivityListItem from './ActivityListItem';

export default function ActivityList() {
    const { activities, error, clearError, loading } = useGitHub();

    return (
        <>
            { 
                loading ? 
                    (<LinearProgress />) :
                    undefined
                }
            { activities.length > 0 ? 
                (<List>
                    { activities.map(activity => (<ActivityListItem key={activity.id} activity={activity} />))}
                </List>) : 
                undefined
            }
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={Boolean(error)}
                autoHideDuration={4000}
                onClose={clearError}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </>
    )
}