interface Odontograma {
    "Codigo": number;
    "Cara_codigo": String;
    "Tratamiento_codigo": number;
    "Posicion": number;
    "Tratamiento_nombre": string;
    "Tratamiento_ruta": string;
    "Cara_nombre": string;
  }

  export interface Odontogramas {
    "Odontogramas" : Array<Odontograma>;
  }