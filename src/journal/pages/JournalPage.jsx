
import { AddBoxOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { orange } from '@mui/material/colors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'
import { EvaluacionMainLayout } from '../layout/EvaluacionMainLayout'
import { JournalLayout } from '../layout/JournalLayout'
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

   
{/*       
        <JournalLayout>
        {
            (!!active)
            ?  <GetLayoutMain pagina = { active.title }  />
            : <NothingSelectedView />
          }

            <IconButton
            onClick = { onClickNewNote }
            size='large'
            disabled= { isSaving }
            sx={{
              color: 'white',
              backgroundColor: orange.A400,
              ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
              position: 'fixed',
              right: 50,
              bottom: 50
            }}
           >
            <AddBoxOutlined sx={{ fontSize: 55 }} />
           
          </IconButton>
        </JournalLayout>   */}

        {/* <JournalLayout> */}
        

          {/* <IconButton
            onClick = { onClickNewNote }
            size='large'
            disabled= { isSaving }
            sx={{
              color: 'white',
              backgroundColor: orange.A400,
              ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
              position: 'fixed',
              right: 50,
              bottom: 50
            }}
           >
            <AddBoxOutlined sx={{ fontSize: 55 }} />
           
          </IconButton> */}

          {/* <NoteView /> */}
        {/* </JournalLayout> */}

    </>

  )
}
