//OBTENER LISTA DE NOMBRE DE CAMPAÑAS 
export function obtenerCampanaOptions(campania) {
    const nombresCampania = [];
  
    campania.forEach((campania) => {
      nombresCampania.push(campania.NombreCampania.toUpperCase());
    });
  
    const campanaOptions = nombresCampania.sort();
    return campanaOptions;
  }