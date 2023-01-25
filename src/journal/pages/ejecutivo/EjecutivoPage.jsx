import React from 'react'
import DataTableEjecutivo from '../../components/ejecutivo/ejecutivo-list-results'
import { EjecutivoToolbar } from '../../components/ejecutivo/EjecutivoToolbar'
import { EjecutivoToolbarList } from '../../components/ejecutivo/EjecutivoToolbarList'
import { EjecutivosListToolbar } from '../../components/ejecutivo/ejecutvo-list-toolbar'


export const EjecutivoPage = () => {
  return (
    <>
    
        <EjecutivosListToolbar/>
        
        <DataTableEjecutivo />
    </>
  )
}
