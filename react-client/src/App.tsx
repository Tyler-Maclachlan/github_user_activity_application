import React from 'react';
import './App.css';

import Grid from '@material-ui/core/Grid';

import { ProvideGitHub } from './hooks/github';

import AppBar from './components/AppBar/AppBar';
import ActivityList from './components/Activity/ActivityList';

function App() {

  return (
    <div className="App">
      <ProvideGitHub>
        <AppBar />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ActivityList />
          </Grid>
        </Grid>
      </ProvideGitHub>
    </div>
  );
}

export default App;
