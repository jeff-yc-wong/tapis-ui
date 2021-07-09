import { hot } from 'react-hot-loader/root';
import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { Login } from 'tapis-ui/components';
import { Apps } from 'tapis-app/Sections';
import { ProjectList, SiteList, InstrumentList, VariableList, MeasurementList } from "tapis-ui/components/streams";
import { JobsListing } from 'tapis-ui/components/jobs';
import { FileListing } from 'tapis-ui/components/files';
import { SystemList } from 'tapis-ui/components/systems';
import { SectionHeader } from 'tapis-ui/_common';
import { LoginCallback } from 'tapis-redux/authenticator/types';
import { SystemsListCallback } from 'tapis-redux/systems/types';
//import { ProjectsListCallback } from 'tapis-redux/streams/projects/types';
import { TapisSystem } from '@tapis/tapis-typescript-systems';
import { Project, Site, Instrument, Variable, Measurement } from "@tapis/tapis-typescript-streams"
import { useDispatch } from 'react-redux';
import { useApps, useSystems } from 'tapis-redux';
import Sidebar from '../Sidebar/Sidebar';
import UIPatterns from '../UIPatterns';
import Launcher from '../Launcher';
import Logout from '../Logout';
import './App.scss';

const App: React.FC = () => {
  // Demonstration of using some type of external state
  // management that isn't tapis-redux
  const [jwt, setJwt] = useState<string>(null);
  const [selectedSystem, setSelectedSystem] = useState<TapisSystem>(null);
  const [selectedProject, setSelectedProject] = useState<Project>(null);
  const [selectedSite, setSelectedSite] = useState<Site>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>(null);
  const dispatch = useDispatch();
  const listApps = useApps().list;
  const listSystems = useSystems().list;

  const history = useHistory();
  
  const authCallback = useCallback<LoginCallback>(
    (result) => {
      /* eslint-disable */
      console.log("Authentication api result", result);
      // Handle errors during login
      if (result instanceof Error) {
        return;
      }
      // Set local view state
      setJwt(result.access_token);
      // Can make also make an external call to propagate the login result
      dispatch(listApps({}));
      dispatch(listSystems({}));
    },
    [setJwt]
  );

  const systemsListCallback = useCallback<SystemsListCallback>(
    (result) => {
      /* eslint-disable */
      console.log("Systems listing api result", result);
    },
    []
  );

  const systemSelectCallback = useCallback(
    (system: TapisSystem) => {
      /* eslint-disable */
      console.log("System selected", system);
      setSelectedSystem(system);
    },
    [setSelectedSystem]
  );

  const projectSelectCallback = useCallback(
    (project: Project) => {
      console.log("Project selected", project);
      setSelectedProject(project);
      //clear selected site and instrument
      setSelectedSite(null);
      setSelectedInstrument(null);
    },
    [setSelectedProject]
  );

  const siteSelectCallback = useCallback(
    (site: Site) => {
      console.log("Site selected", site);
      setSelectedSite(site);
      //clear selected instrument
      setSelectedInstrument(null);
    },
    [setSelectedSite]
  );

  const instrumentSelectCallback = useCallback(
    (instrument: Instrument) => {
      console.log("Instrument selected", instrument);
      setSelectedInstrument(instrument);
    },
    [setSelectedInstrument]
  );

  const variableSelectCallback = useCallback(
    (variable: Variable) => {
      console.log("Variable selected", variable);
    },
    []
  );

  const measurementSelectCallback = useCallback(
    (measurement: Measurement) => {
      console.log("Measurement selected", measurement);
    },
    []
  );

  // Demonstration of config to use alternate URLs or provided tokens
  const config = {
    jwt,
    tenant: 'https://dev.develop.tapis.io',
  };

  // return (
  //   <div className="workbench-wrapper">
  //     <Router>
  //       <Sidebar jwt={jwt}/>
  //       <div className="workbench-content">
  //         <Route exact path='/'>
  //           <div>Hello World!</div>
  //         </Route>
  //         <Route path='/login'>
  //           <Login config={config} onAuth={authCallback} />
  //         </Route>
          
  //         <Route path='/systems'>
  //           <Systems config={config} onList={systemsListCallback} onSelect={systemSelectCallback} />
  //         </Route>
  //         <Route path='/files'>
  return (
    <div className="workbench-wrapper">
      <Sidebar/>
      <div className="workbench-content">
        <Route exact path='/'>
          <SectionHeader>Dashboard</SectionHeader>
          <div className="container">[dashboard]</div>
        </Route>
        <Route path='/login'>
          <SectionHeader>Login</SectionHeader>
          <div className="container">
            <Login onAuth={authCallback} />
          </div>
        </Route>
        <Route path='/logout'>
          <Logout />
        </Route>
        <Route path='/streams/projects'>
          <SectionHeader>Project Select</SectionHeader>
          <div className="container">
            <ProjectList config={config} onSelect={projectSelectCallback} selected={selectedProject} />
          </div>
        </Route>
        <Route path='/streams/sites'>
          <SectionHeader>Site Select</SectionHeader>
          <div className="container">
            {
              selectedProject
                ? <SiteList projectId={selectedProject.project_name} onSelect={siteSelectCallback} selected={selectedSite} />
                : <div>No selected project</div>
            }
          </div>
        </Route>
        <Route path='/streams/instruments'>
          <SectionHeader>Instrument Select</SectionHeader>
          <div className="container">
            {
              selectedSite
                ? <InstrumentList projectId={selectedProject.project_name} siteId={selectedSite.site_id} onSelect={instrumentSelectCallback} selected={selectedInstrument} />
                : <div>No selected site</div>
            }
          </div>
        </Route>
        <Route path='/streams/variables'>
          <SectionHeader>Variable Select</SectionHeader>
          <div className="container">
            {
              selectedInstrument
                ? <VariableList projectId={selectedProject.project_name} siteId={selectedSite.site_id} instrumentId={selectedInstrument.inst_id} onSelect={variableSelectCallback} />
                : <div>No selected instrument</div>
            }
          </div>
        </Route>
        <Route path='/streams/measurements'>
          <SectionHeader>Measurements</SectionHeader>
          <div className="container">
            {
              selectedInstrument
                ? <MeasurementList projectId={selectedProject.project_name} siteId={selectedSite.site_id} instrumentId={selectedInstrument.inst_id} onSelect={measurementSelectCallback} />
                : <div>No selected instrument</div>
            }
          </div>
        </Route>
        <Route path='/systems'>
          <SectionHeader>System Select</SectionHeader>
          <div className="container">
            <SystemList onList={systemsListCallback} onSelect={systemSelectCallback} selected={selectedSystem} />
          </div>
        </Route>
        <Route path='/files'>
          <SectionHeader>Files</SectionHeader>
          <div className="container">
            {
              // TODO: This should be a tapis-app file browser component that uses FileListing
              selectedSystem
                ? <FileListing systemId={selectedSystem.id} path={'/'} />
                : <div>No selected system</div>
            }
          </div>
        </Route>
        <Route path='/apps'>
          <Apps />
        </Route>
        <Route path='/jobs'>
        <SectionHeader>Jobs</SectionHeader>
          <div className="container">
            <JobsListing />
          </div>
        </Route>
        {/* <Route path='/launch/:appId/:appVersion'> */}
        <Route path='/launcher'>
          <SectionHeader>Job Launcher</SectionHeader>
          <div className="container">
            <Launcher />
          </div>
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
