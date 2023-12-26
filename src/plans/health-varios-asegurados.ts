import { ICJ } from '../core/ICJ';
import { ActionType } from '../enums/actions';
import { generateRandomEmail, generateRandomStringBirthDate } from '../services/ramdom';

export default <ICJ>{
  name: '[Health] Varios asegurados',
  actions: [
    { type: ActionType.CLICK, selector: 'app-insured-detail #txtCalendarPolicyDate' },
    {
      type: ActionType.TYPE,
      selector: 'app-insured-detail #txtCalendarPolicyDate',
      stringValueFunc: async (): Promise<string> => new Date().toLocaleDateString('es-ES'),
    },
    {
      type: ActionType.TYPE,
      selector: 'app-insured-detail #txtDateInput',
      stringValueFunc: async (): Promise<string> => generateRandomStringBirthDate({ minAge: 20 }),
    },
    { type: ActionType.CLICK, selector: 'app-insured-detail #lbl_Female' },
    { type: ActionType.CLICK, selector: 'app-insured-detail #radio_false' },
    { type: ActionType.CLICK, selector: 'app-insured-detail .count-plus' },
    { type: ActionType.CLICK, selector: 'app-insured-detail .count-plus' },
    {
      type: ActionType.TYPE,
      selector: 'app-insured-detail #txtDate2',
      stringValueFunc: async (): Promise<string> => generateRandomStringBirthDate({ minAge: 65, maxAge: 75 }),
    },
    {
      type: ActionType.TYPE,
      selector: 'app-insured-detail #txtDate3',
      stringValueFunc: async (): Promise<string> => generateRandomStringBirthDate({ minAge: 2, maxAge: 16 }),
    },
    { type: ActionType.CLICK, selector: 'app-insured-detail #next' },
    { type: ActionType.TYPE, selector: 'app-contact-detail #txt_PostalCode', stringValue: '28002' },
    { type: ActionType.TYPE, selector: 'app-contact-detail #txt_Phone', stringValue: '910790576' },
    { type: ActionType.TYPE, selector: 'app-contact-detail #txt_EmailAddress', stringValueFunc: async (): Promise<string> => generateRandomEmail() },
    { type: ActionType.CLICK, selector: 'app-contact-detail #label_EmailAddress' },
    { type: ActionType.CLICK, selector: 'app-contact-detail #next' },
  ],
};
