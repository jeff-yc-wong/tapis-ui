import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Measurement } from "@tapis/tapis-typescript-streams";
import { useMeasurements } from 'tapis-redux';
import { MeasurementsListCallback } from 'tapis-redux/streams/measurements/types';
import { Config } from 'tapis-redux/types';
import { LoadingSpinner } from 'tapis-ui/_common';
import { getId } from "tapis-util";
import "./MeasurementList.scss";

export type OnSelectCallback = (measurement: Measurement) => any;

interface IdMeasurement {
  id: string,
  measurement: Measurement
}

interface MeasurementListItemProps {
  measurement: Measurement,
  select: Function
}

const MeasurementListItem: React.FC<MeasurementListItemProps> = ({ measurement, select }) => {
  return (
    <div onClick={() => select ? select(measurement) : null}>
      {`${measurement.datetime}`}
    </div>
  );
};

MeasurementListItem.defaultProps = {};

interface MeasurementListProps {
  projectId: string,
  siteId: string,
  instrumentId: string,
  config?: Config,
  onList?: MeasurementsListCallback,
  onSelect?: OnSelectCallback
}

const MeasurementList: React.FC<MeasurementListProps> = ({ projectId, siteId, instrumentId, config, onList, onSelect }) => {
  const dispatch = useDispatch();
  const { measurements, list } = useMeasurements(config);
  useEffect(() => {
    dispatch(list({ 
      onList, 
      request: {
        projectUuid: projectId,
        siteId,
        instId: instrumentId
      }
    }));
  }, [dispatch]);
  const definitions: Array<IdMeasurement> = measurements.results.map((measurement: Measurement) => {
    return {
      id: getId(),
      measurement
    }
  });


  const select = useCallback((measurement: Measurement) => {
    if(onSelect) {
      onSelect(measurement);
    }
  }, [onSelect]);

  if (measurements.loading) {
    return <LoadingSpinner/>
  }

  return (
    <div className="measurement-list nav flex-column">
      {
        definitions.length
          ? definitions.map(
              (measurement) => <MeasurementListItem measurement={measurement.measurement} key={measurement.id} select={select} />
            )
          : <i>No measurements found</i>
      }
    </div>
  );
};

MeasurementList.defaultProps = {
  config: null,
  onList: null,
  onSelect: null
}

export default MeasurementList;
