import React from 'react'

export const seleccionMenu = (menuSeleccion) => {

    let parametro ;

    if (menuSeleccion === 'ADMINISTRADOR') {
      parametro =  [ 
          {
              id: '1',
              'nombre': 'Dashboard',
              'detalle': 'Menu que cuenta con informacón de analisis monitorizada , y visualiza los indicadors claves'
          },
          {
              id: '2',
              'nombre': 'Registro de Usuario',
              'detalle': 'Menu para crear una nueva cuenta de usuario,posterior a la creación se deberá asignar perfil de usuario y restablecer credencial a este.'
          },
          {
              id: '3',
              'nombre': 'Acceso',
              'detalle': 'Menu que cuenta con informacón de analisis monitorizada , y visualiza los indicadors claves'
          },
          {
              id: '4',
              'nombre': 'Formulario',
              'detalle': 'Menu para ingresar nuevo formato de planilla Excel'
          },
          {
              id: '5',
              'nombre': 'Pauta',
              'detalle': 'Menu para ingresar nueva pauta con el fin de realizar con estos parametros las encuestas reespectivas '
          },
          {
              id: '6',
              'nombre': 'Ejecutivo',
              'detalle': 'Menu para ingresar nuevos ejecutivos'
          },
          {
              id: '7',
              'nombre': 'Campaña',
              'detalle': 'Menu para ingresar nueva campaña'
          },
          {
              id: '8',
              'nombre': 'Carga Excel',
              'detalle': 'Menu para el ingresar de carga en formato Excel'
          },

      ]
    }
    if (menuSeleccion === 'MONITOR'){
      parametro =  [
          {
              id: '1',
              'nombre': 'Dashboard',
              'detalle': 'Menu que cuenta con informacón de analisis monitorizada , y visualiza los indicadors claves'
          },
          {
              id: '2',
              'nombre': 'Formulario',
              'detalle': 'Menu para ingresar nuevo formato de planilla Excel'
          },
          {
              id: '3',
              'nombre': 'Pauta',
              'detalle': 'Menu para ingresar nueva pauta con el fin de realizar con estos parametros las encuestas reespectivas '
          },
          {
              id: '4',
              'nombre': 'Ejecutivo',
              'detalle': 'Menu para ingresar nuevos ejecutivos'
          },
          {
              id: '5',
              'nombre': 'Campaña',
              'detalle': 'Menu para ingresar nueva campaña'
          },
          {
              id: '6',
              'nombre': 'Carga Excel',
              'detalle': 'Menu para el ingresar de carga en formato Excel'
          },
      ]
    }
    if (menuSeleccion === 'EJECUTIVO'){
      parametro =  
      [
            {
                id: '1',
                title: 'Dashboard',
                body: 'Menu que cuenta con informacón de analisis monitorizada , y visualiza los indicadors claves'
            },
            {
                id: '2',
                title: 'Carga Excel',
                body: 'Menu para el ingresar de carga en formato Excel'
            },

        ]
    
    }

  return parametro
}