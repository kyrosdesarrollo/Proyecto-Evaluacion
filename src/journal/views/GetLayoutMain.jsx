import React from 'react'
import { RegisterPage } from '../../auth/pages/RegisterPage';
import CargaPage from '../pages/cargaexcel/CargaPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { EjecutivoPage } from '../pages/ejecutivo/EjecutivoPage';
import { RolPage } from '../pages/rol/RolPage';
import { NoteView } from './NoteView';


const GetLayoutMain = ({ pagina }) => {
    const renderContent = React.useCallback(() => {
      switch(pagina) {
        case 'Dashboard': 
          return <DashboardPage />;

        case 'Registro Usuario': 
          return <RegisterPage />;
        
        case 'Acceso': 
          return <RolPage />;
  
        case 'Carga Excel': 
          return <CargaPage />;

        case 'Ejecutivo': 
          return <EjecutivoPage />;

        default: 
          return < NoteView />;
        
      
      }
    }, [pagina]);
  
    return (
      <div className="container">
        {renderContent()}
      </div>
    );
  };


export default GetLayoutMain
