import React from 'react'
import { useSelector } from 'react-redux'
import { EvaluacionMainLayout } from '../layout/EvaluacionMainLayout'
import GetLayoutMain from '../views/GetLayoutMain'
import { NothingSelectedView } from '../views/NothingSelectedView'


export const JournalPage = () => {
  const { isSaving, active } = useSelector(state => state.journal);
  
  let pagina = active?.title; // Página activa obtenida del estado, por ejemplo, 'Dashboard'
  console.log(pagina)
  if (!pagina) {
    console.log('hoalalalalala nullla undei')
    
  }
  return (
    <>
      <EvaluacionMainLayout>
        {pagina ? (
          <GetLayoutMain pagina={pagina} />
        ) : (
          <NothingSelectedView />
        )}
      </EvaluacionMainLayout>
    </>
  );
};
