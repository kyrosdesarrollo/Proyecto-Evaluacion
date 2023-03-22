import React,{useState} from 'react'
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material';

const VisualFormato = ({id = ''}) => {
    const defaultMaterialTheme = createTheme();

    const [tableData, setTableData] = useState([]);

 const { formatos } = useSelector(state => state.formato);

 let cabezaArreglo = [], concepto=[];
 for (let index = 0; index < formatos[id].cabezaJson.length; index++) {
    //console.log(formatos[id].cabezaJson[index]);
    concepto.push( '  { title : "'+ formatos[id].cabezaJson[index] +'", field: "' + formatos[id].cabezaJson[index] +'" }');
    cabezaArreglo.push( Object.assign( {},concepto)) ;
 }

 console.log('Concepto ------------------>')
 console.log(concepto)
 console.log('FIN Concepto ------------------>')
 console.log('Concepto Objeto --------------')
 console.log(Object.assign( {},concepto));
 console.log('FIN Concepto Objeto --------------')
 console.log(' Concepto Arreglo --------------')
 const result = Object.values(concepto);
 console.log(result)


const columns=[
    { title: 'Artista',field: 'artista'},
    { title: 'País de origen',field: 'pais'},
    { title: 'Genero(s)',field: 'genero' },
    { title: 'Ventas esperadas (MM)', field: 'ventas', type: "numeric"}
]  

const data = [
    {artista:'Nelson' ,pais:'Chile',     genero:'Rock',ventas:1000},
    {artista:'Roberto',pais:'Chile',     genero:'Rock',ventas:7000},
    {artista:'Rodrigo',pais:'Argentina', genero:'Pop', ventas:5000}
] 

    console.log('Columnas');
    console.log(columns)
    console.log('data');
    console.log(data)

   // let data = [{"name":"All"},{"name":"NodeJS"},{"name":"ReactJS"},{"name":"PHP"},{"name":"Wordpress"},{"name":"Joomla"}];

// let values = data.map(function(entry) {
//   return entry.name;
// });

// console.log(values);
  return (
    <>
    <div style={{ width: '100%', height: '100%' }}>
              <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        title="Carga de Formato"
                        columns={Object.values(concepto)}
                        data={data} 
                    />
                </ThemeProvider>
     </div>
    </>
  )
}

export default VisualFormato
