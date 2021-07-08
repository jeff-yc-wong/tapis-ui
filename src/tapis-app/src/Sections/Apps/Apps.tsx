import React, { useState, useCallback } from 'react';
import { TapisApp } from '@tapis/tapis-typescript-apps';
import { Jobs } from '@tapis/tapis-typescript';
import { AppsListing } from 'tapis-ui/components/apps';
import Launcher from 'tapis-app/Launcher';
import { OnSelectCallback } from 'tapis-ui/components/apps/AppsListing';
import { SectionMessage } from 'tapis-ui/_common';
import { 
  ListSection, 
  ListSectionBody, 
  ListSectionDetail,
  ListSectionList,
  ListSectionHeader
} from 'tapis-app/Sections/ListSection';

const Apps: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<TapisApp>(null);
  const appSelectCallback = useCallback<OnSelectCallback>(
    (app: TapisApp) => {
      setSelectedApp(app);
    },
    [ setSelectedApp ]
  )
  const appId = "SleepSeconds";
  const appVersion = "0.0.1";
  const initialValues: Jobs.ReqSubmitJob = {
    appId,
    appVersion,
    name: `${appId}-${appVersion}-${new Date().toISOString().slice(0, -5)}`,
    execSystemId: 'tapisv3-exec'
  }

  return (
    <ListSection>
      <ListSectionHeader>Apps</ListSectionHeader>
      <ListSectionBody>
        <ListSectionList>
          <AppsListing onSelect={appSelectCallback} />
        </ListSectionList>
        <ListSectionDetail>
          <ListSectionHeader type={"sub-header"}>Launcher</ListSectionHeader>
          <div>
            {selectedApp
              ? <Launcher initialValues={initialValues}/>
              : <SectionMessage type="info">
                  Select an app from the list.
                </SectionMessage>
            }
          </div>
        </ListSectionDetail>
      </ListSectionBody>
    </ListSection>
  )
}

export default Apps;