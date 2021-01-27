import './AppBar.css';
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typograph from '@material-ui/core/Typography';
import Textfield from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from "@material-ui/core/Button";

import { useGitHub } from '../../hooks/github';


export default function AppBarComponent() {
    const { fetchUserActivity, username, setUsername } = useGitHub();

    const [dirty, setDirty] = useState(false);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const _username = event.target.value;
        setDirty(true);
        setUsername(_username);
    }

    const search = () => {
        if (username.length) {
            fetchUserActivity(username);
        }
    }

    return (
        <div className="app-bar-container">
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typograph variant="h6" className="title" >GitHub User Activity</Typograph>

                    <Textfield 
                        id="username-input"
                        color="primary"
                        placeholder="Enter a username"
                        error={dirty && username.length < 1}
                        value={username}
                        onChange={handleUsernameChange}
                        InputProps={{
                            endAdornment: 
                                <InputAdornment position="end">
                                    <Button onClick={search} disabled={dirty && username.length < 1}>Go</Button>
                                </InputAdornment>
                        }}
                    />
                </Toolbar>
            </AppBar>
        </div>
    )
}