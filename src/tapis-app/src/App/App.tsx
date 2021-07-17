import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Route } from 'react-router-dom';
import { Apps, Login, Dashboard, Jobs, Systems, Streams } from 'tapis-app/Sections';
import { SectionHeader } from 'tapis-ui/_common';
import Sidebar from '../Sidebar/Sidebar';
import UIPatterns from '../UIPatterns';
import Logout from '../Logout';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="workbench-wrapper">
      <Sidebar/>
      <div className="workbench-content">
        <Route exact path='/'>
          <Dashboard />
        </Route>
        <Route path='/login'>
          <Login /> 
        </Route>
        <Route path='/logout'>
          <Logout />
        </Route>
        <Route path='/streams'>
          <Streams/>
        </Route>
        <Route path='/systems'>
          <Systems />
        </Route>
        <Route path='/apps'>
          <Apps />
        </Route>
        <Route path='/jobs'>
          <Jobs />
        </Route>
        <Route path='/uipatterns'>
          <SectionHeader>UI Patterns</SectionHeader>
          <UIPatterns />
        </Route>
      </div>
    </div>
  );
}

export default hot(App);
