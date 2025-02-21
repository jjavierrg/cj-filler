import { ICJ } from '../core/ICJ';
import bikeNueva from './bike-nueva';
import bikeSegundaMano from './bike-segunda-mano';
import carFranquicias from './car-franquicias';
import carSegundaMano from './car-segunda-mano';
import carSinMatricula from './car-sin-matricula';
import healthUnico from './health-un-asegurado';
import healthVarios from './health-varios-asegurados';
import hogar from './hogar-propietario';
import gatoAdoptado from './pet-gato';
import perroVeterinario from './pet-perro';

export default <ICJ[]>[
  carSinMatricula,
  bikeNueva,
  carSegundaMano,
  gatoAdoptado,
  healthUnico,
  healthVarios,
  bikeSegundaMano,
  perroVeterinario,
  carFranquicias,
  hogar,
];
