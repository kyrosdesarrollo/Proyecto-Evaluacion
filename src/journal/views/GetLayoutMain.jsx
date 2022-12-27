import React from 'react'
import { RegisterPage } from '../../auth/pages/RegisterPage';
import { CampanaPage } from '../pages/campana/CampanaPage';
import CargaPage from '../pages/cargaexcel/CargaPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { EjecutivoPage } from '../pages/ejecutivo/EjecutivoPage';
import { FormularioPage } from '../pages/formulario/FormularioPage';
import { MenuEleccion } from '../pages/menueleccion/MenuEleccion';
import { PautaPage } from '../pages/pauta/PautaPage';
import { RolPage } from '../pages/rol/RolPage';
import { NoteView } from './NoteView';


const GetLayoutMain = ({ pagina }) => {
    
    console.log(pagina);
    const renderContent = React.useCallback(() => {
      switch(pagina) {
        case 'Dashboard': 
          return <DashboardPage />;

        case 'Inicio': 
          return <MenuEleccion />;

        case 'Registro Usuario': 
          return <RegisterPage />;
        
        case 'Acceso': 
          return <RolPage />;
  
        case 'Carga Excel': 
          return <CargaPage />;

        case 'Ejecutivo': 
          return <EjecutivoPage />;

        case 'Formulario': 
          return <FormularioPage />;

        case 'Campaña': 
          return <CampanaPage />;

        case 'Pauta': 
          return <PautaPage />;

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
