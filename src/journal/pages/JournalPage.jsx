import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'
import { EvaluacionMainLayout } from '../layout/EvaluacionMainLayout'
import GetLayoutMain from '../views/GetLayoutMain'
import { NothingSelectedView } from '../views/NothingSelectedView'


export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state=> state.journal);

  const onClickNewNote =()=>{
    dispatch(startNewNote());
  }

  return (
    <>
    <EvaluacionMainLayout>
    {
            (!!active)
            ?  <GetLayoutMain pagina = { active.title }  />
            : <NothingSelectedView />
          }
    </EvaluacionMainLayout>
    </>

  )
}
