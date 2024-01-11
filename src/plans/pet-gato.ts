import { ICJ } from '../core/ICJ';
import { ActionType } from '../enums/actions';
import { generateRandomEmail, generateRandomName } from '../services/ramdom';

export default <ICJ>{
  name: '[PET] - Gato - Adoptado',
  actions: [
    { type: ActionType.CLICK, selector: 'pet-type #Option_Cat' },
    { type: ActionType.TYPE, selector: 'pet-name #PetName', stringValueFunc: async (): Promise<string> => generateRandomName() },
    { type: ActionType.CLICK, selector: 'pet-name #next' },
    { type: ActionType.CLICK, selector: 'pet-crossbreed #lbl_No > .card-selector' },
    { type: ActionType.CLICK, selector: 'pet-breed #Option_312' },
    { type: ActionType.CLICK, selector: 'pet-gender #lbl_Hembra' },
    { type: ActionType.SELECT, selector: 'app-pet-birthdate #Month_BirthDate', numericValue: 5 },
    { type: ActionType.SELECT, selector: 'app-pet-birthdate #Year_BirthDate', numericValue: 5 },
    { type: ActionType.CLICK, selector: 'app-pet-birthdate #next' },
    { type: ActionType.CLICK, selector: 'pet-cost #Option_DontKnowItsAdopted' },
    { type: ActionType.TYPE, selector: 'app-zipcode #txt_PostalCode', stringValue: '28002' },
    { type: ActionType.WAIT_UNTIL_VALUE, selector: 'app-zipcode .result-txt', stringValue: 'MADRID', timeout: 90000 },
    { type: ActionType.WAIT, numericValue: 500 },
    { type: ActionType.CLICK, selector: 'app-zipcode #next' },
    { type: ActionType.CLICK, selector: 'cj-process-kind-of-insurance #Option_NotSure' },
    { type: ActionType.TYPE, selector: 'cj-process-email-info #txt_Email', stringValueFunc: async (): Promise<string> => generateRandomEmail() },
    { type: ActionType.CLICK, selector: 'cj-process-email-info #checkBox_Email' },
  ],
  submitAction: { type: ActionType.CLICK, selector: 'cj-process-email-info #next' },
};
