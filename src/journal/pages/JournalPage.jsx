import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EvaluacionMainLayout } from '../layout/EvaluacionMainLayout'
import GetLayoutMain from '../views/GetLayoutMain'
import { NothingSelectedView } from '../views/NothingSelectedView'


export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal);

  return (
    <>
      <EvaluacionMainLayout>
        {active?.title ? (
          <GetLayoutMain pagina={active.title} />
        ) : (
          <NothingSelectedView />
        )}
      </EvaluacionMainLayout>
    </>
  );
};
