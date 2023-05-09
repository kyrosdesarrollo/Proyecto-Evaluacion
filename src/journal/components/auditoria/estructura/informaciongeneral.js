// Declaración de la variable respuestas
const respuestas = {
  fechaConversacion: '',
  idConversacion: '',
  horaInicio: '',
  tipoAtencion: '',
  producto: '',
  // Agrega los demás campos aquí
};


export const campos = [
    {
      pregunta: 'Fecha de Conversación',
      categoria: 'GENERAL 1',
      tipo: 'fecha',
      label: 'Fecha de Conversación',
      valor: respuestas['fechaConversacion'] || '',
      onChange: (e) =>
        setRespuestas({
          ...respuestas,
          fechaConversacion: e.target.value,
        }),
    },
    {
      pregunta: 'Id de Conversación (Chat)',
      categoria: 'GENERAL 1',
      tipo: 'numero',
      label: 'Id de Conversación (Chat)',
      valor: respuestas['idConversacion'] || '',
      onChange: (e) =>
        setRespuestas({
          ...respuestas,
          idConversacion: e.target.value,
        }),
    },
    {
      pregunta: 'Hora Inicio',
      categoria: 'GENERAL 1',
      tipo: 'hora',
      label: 'Hora Inicio',
      valor: respuestas['horaInicio'] || '',
      onChange: (e) =>
        setRespuestas({
          ...respuestas,
          horaInicio: e.target.value,
        }),
    },
    {
      pregunta: 'Tipo de Atención',
      categoria: 'GENERAL 1',
      tipo: 'lista',
      label: 'Tipo de Atención',
      opciones: ['Reclamo', 'Solicitud', 'Consulta'],
      valor: respuestas['tipoAtencion'] || '',
      onChange: (e) =>
        setRespuestas({
          ...respuestas,
          tipoAtencion: e.target.value,
        }),
    },
    {
      pregunta: 'Producto',
      categoria: 'GENERAL 2',
      tipo: 'lista',
      label: 'Producto',
      opciones: [
        'Cliente Total Pack',
        'Compras en Holding',
        'Crédito de Consumo',
        'Crédito Automotriz',
        'Crédito Hipotecario',
        'Cuenta Corriente',
        'Cuenta Vista',
        'Depósito a Plazo',
        'Falabella Connect',
        'Fondos Mutuos',
        'Internet',
        'Producto CMR',
        'Promociones',
        'Puntos CMR',
        'Recibe SMS',
        'Sobre Oficinas',
        'Tarjeta Crédito',
        'Tarjeta Débito',
      ],
      valor: respuestas['producto'] || '',
      onChange: (e) =>
        setRespuestas({
          ...respuestas,
          producto: e.target.value,
        }),
    },
    // Agrega los demás campos aquí
  ];


  export const categoriasGenerales = ['GENERAL 1', 'GENERAL 2', 'GENERAL 3']; // Agrega todas las categorías generales
