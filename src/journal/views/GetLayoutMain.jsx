import React from 'react'
import { RegisterPage } from '../../auth/pages/RegisterPage';
import { AsignacionPage } from '../pages/asignacion/AsignacionPage';
import { AuditoriaPage } from '../pages/auditoria/AuditoriaPage';
import { CampanaPage } from '../pages/campana/CampanaPage';
import CargaPage from '../pages/cargaexcel/CargaPage';
import { CierrePage } from '../pages/cierre/CierrePage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { EjecutivoPage } from '../pages/ejecutivo/EjecutivoPage';
import { FormularioPage } from '../pages/formulario/FormularioPage';
import { InformesPage } from '../pages/informes/InformesPage';
import MenuEleccion from '../pages/menueleccion/MenuEleccion';
import { PautaPage } from '../pages/pauta/PautaPage';
import { RolPage } from '../pages/rol/RolPage';
import { NoteView } from './NoteView';


const GetLayoutMain = ({ pagina }) => {

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

        case 'Asignación': 
          return <AsignacionPage />;

        case 'Auditoría': 
          return <AuditoriaPage />;

        case 'Cierre': 
          return <CierrePage />;

        case 'Informes': 
          return <InformesPage />;

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
