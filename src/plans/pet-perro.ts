import { ICJ } from '../core/ICJ';
import { ActionType } from '../enums/actions';
import { generateRandomEmail, generateRandomName } from '../services/ramdom';

export default <ICJ>{
  name: '[PET] - Perro - Seguro Veterinario',
  actions: [
    { type: ActionType.CLICK, selector: 'pet-type #Option_Dog' },
    { type: ActionType.TYPE, selector: 'pet-name #PetName', stringValueFunc: async (): Promise<string> => generateRandomName() },
    { type: ActionType.CLICK, selector: 'pet-name #next' },
    { type: ActionType.CLICK, selector: 'pet-crossbreed #lbl_No > .card-selector' },
    { type: ActionType.CLICK, selector: 'pet-breed #Option_19' },
    { type: ActionType.CLICK, selector: 'pet-gender #lbl_Macho' },
    { type: ActionType.SELECT, selector: 'app-pet-birthdate #Month_BirthDate', numericValue: 2 },
    { type: ActionType.SELECT, selector: 'app-pet-birthdate #Year_BirthDate', stringValue: '2021' },
    { type: ActionType.CLICK, selector: 'app-pet-birthdate #next' },
    { type: ActionType.CLICK, selector: 'pet-usage #lbl_Compañía' },
    { type: ActionType.CLICK, selector: 'pet-cost #Option_LessThan500' },
    { type: ActionType.TYPE, selector: 'app-zipcode #txt_PostalCode', stringValue: '08080' },
    { type: ActionType.WAIT_UNTIL_VALUE, selector: 'app-zipcode .result-txt', stringValue: 'BARCELONA', timeout: 90000 },
    { type: ActionType.WAIT, numericValue: 1000 },
    { type: ActionType.CLICK, selector: 'app-zipcode #next' },
    { type: ActionType.CLICK, selector: 'cj-process-kind-of-insurance #Option_SeguroVeterinario' },
    { type: ActionType.TYPE, selector: 'cj-process-email-info #txt_Email', stringValueFunc: async (): Promise<string> => generateRandomEmail() },
    { type: ActionType.CLICK, selector: 'cj-process-email-info #checkBox_Email' },
  ],
  submitAction: { type: ActionType.CLICK, selector: 'cj-process-email-info #next' },
};
