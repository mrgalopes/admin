/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/Button';
import DateRange from '../../../components/DateRange';
import Process from '../../../components/Process';
import SpinnerLoader from '../../../components/SpinnerLoader';
import * as actions from '../../../redux/actions';


const ProcessesPage = ({
  match,
}) => {
  const dispatch = useDispatch();
  const processesSelector = useSelector((state) => state.processes.processes);
  const getProcessesStart = (workflowId) => actions.getProcessesStart(workflowId);
  const initialDateArray = [new Date('3/12/2020'), new Date('7/27/2020')];
  const [updatedDateArray, setUpdatedDateArray] = useState([]);
  const loading = useSelector((state) => state.processes.loading);
  const totalProcess = useSelector((state) => state.processes.length);
  useEffect(() => {
    dispatch(getProcessesStart(match.params.workflowId));
  }, [dispatch]);
  return (
    <div className="processes-container">
      {loading ? (
        <SpinnerLoader fontSize="1" />
      ) : (
        <>
          <div className="processes-filter">
            <DateRange initialDateArray={initialDateArray} setUpdatedDateArray={setUpdatedDateArray} updatedDateArray={updatedDateArray} />
            <Button title="atualizar" onClick={getProcessesStart(match.params.workflowId)} />
          </div>
          <div className="processes-table">
            <p className="processes-page-title">Processos</p>
            <Process listProcessItem={processesSelector} total={totalProcess} />
          </div>
        </>
      )}
    </div>
  );
};


export default ProcessesPage;
