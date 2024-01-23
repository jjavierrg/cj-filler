import { ICJ } from '../core/ICJ';
import { ActionType } from '../enums/actions';
import {
  generateRandomEmail,
  generateRandomName,
  generateRandomStringBirthDate,
  generateRandomSurname,
  generateRandomTelephone,
} from '../services/ramdom';

export default <ICJ>{
  name: '[CAR] - sin matrícula',
  actions: [
    {
      type: ActionType.CLICK,
      selector: 'already-bought #ThinkingToBuying',
      optional: true,
      executeIf: async (): Promise<boolean> => !window?.location?.hash || window?.location?.hash === '#Q1',
    },
    { type: ActionType.CLICK, selector: 'make li[title="BMW"]' },
    { type: ActionType.CLICK, selector: 'model li[title="X1"]' },
    { type: ActionType.CLICK, selector: 'fuel-type #D' },
    { type: ActionType.CLICK, selector: 'power #radio150' },
    { type: ActionType.CLICK, selector: 'version #radio00131110081' },
    { type: ActionType.CLICK, selector: '#MainDriverParent' },
    { type: ActionType.CLICK, selector: 'purchasing-way #NewCar' },
    { type: ActionType.CLICK, selector: 'usage #PrivateWeekend' },
    { type: ActionType.CLICK, selector: 'parking-type #CollectiveGarageVigilance' },
    { type: ActionType.CLICK, selector: 'annual-kilometer #radioKMLess5000' },
    { type: ActionType.CLICK, selector: 'another-vehicle #divOption1 #radioNo' },
    { type: ActionType.CLICK, selector: 'another-vehicle #divOption2 #radioTwo' },
    {
      type: ActionType.TYPE,
      selector: 'vehicle-driver-dob input',
      stringValueFunc: async (): Promise<string> => generateRandomStringBirthDate({ minAge: 30 }),
    },
    { type: ActionType.CLICK, selector: 'vehicle-driver-dob #btn_submit' },
    { type: ActionType.CLICK, selector: 'place-of-birth #radio-1' },
    { type: ActionType.CLICK, selector: 'place-of-birth li[title="Alemania"]' },
    { type: ActionType.SELECT, selector: '#CJDriverDetailsLicenceDate_Month', numericValue: 2 },
    { type: ActionType.SELECT, selector: '#CJDriverDetailsLicenceDate_Year', numericValue: 3 },
    { type: ActionType.CLICK, selector: 'license-obtain-date #btn_submit' },
    { type: ActionType.CLICK, selector: 'license-obtained-place #radio724' },
    { type: ActionType.CLICK, selector: 'vehicle-drive-gender #radioFemale' },
    { type: ActionType.CLICK, selector: 'vehicle-drive-gender #radioMarried' },
    { type: ActionType.CLICK, selector: 'children-at-home #radioChildYes' },
    { type: ActionType.CLICK, selector: 'children-at-home #radioYoungerYes' },
    { type: ActionType.CLICK, selector: 'children-at-home #radioAdultNo' },
    { type: ActionType.CLICK, selector: 'children-at-home #btnMainDriverChildSubmit' },
    { type: ActionType.CLICK, selector: 'vehicle-driver-profession #ComputerTechnician' },
    { type: ActionType.TYPE, selector: 'app-address #txtPostalCode', stringValue: '28002' },
    { type: ActionType.SELECT, selector: 'app-address #driverStreetkind', stringValue: 'Calle' },
    { type: ActionType.TYPE, selector: 'app-address #txtVia', stringValue: 'Sánchez Pacheco' },
    { type: ActionType.TYPE, selector: 'app-address #txtNumero', stringValue: '85' },
    { type: ActionType.WAIT_UNTIL_VALUE, selector: 'app-address #driverTown span.ng-value-label', stringValue: 'Madrid, Madrid', timeout: 90000 },
    { type: ActionType.CLICK, selector: 'app-address #btnSkipAddress' },
    { type: ActionType.CLICK, selector: 'residence-duration #radioBetween2and3' },
    { type: ActionType.CLICK, selector: 'who-policy-holder #radioMainDriverSpouse' },
    { type: ActionType.TYPE, selector: 'app-age #txtAge', stringValue: '40' },
    { type: ActionType.CLICK, selector: 'app-age #btn_submit' },
    { type: ActionType.TYPE, selector: 'app-licence-age #txtAge', stringValue: '18' },
    { type: ActionType.CLICK, selector: 'app-licence-age #btn_submit' },
    { type: ActionType.CLICK, selector: 'policy-holder-gender #Male' },
    { type: ActionType.TYPE, selector: 'app-dni #txtDniNumber', stringValue: '12345678Z' },
    { type: ActionType.CLICK, selector: 'app-dni #btnDniClick' },
    { type: ActionType.TYPE, selector: 'app-policy-holder-name #txtFistName', stringValueFunc: async (): Promise<string> => generateRandomName() },
    {
      type: ActionType.TYPE,
      selector: 'app-policy-holder-name #txtMiddleName',
      stringValueFunc: async (): Promise<string> => generateRandomSurname(),
    },
    { type: ActionType.TYPE, selector: 'app-policy-holder-name #txtLastName', stringValueFunc: async (): Promise<string> => generateRandomSurname() },
    { type: ActionType.CLICK, selector: 'app-policy-holder-name #btnPolicyHolderNameClick' },
    { type: ActionType.CLICK, selector: 'app-defaulter #defaulterNo' },
    { type: ActionType.CLICK, selector: 'app-isocassional-driver #No' },
    { type: ActionType.CLICK, selector: 'insurence-question #No' },
    { type: ActionType.CLICK, selector: 'claim-details #radioNo' },
    { type: ActionType.CLICK, selector: 'fine-details #No' },
    { type: ActionType.CLICK, selector: 'expected-policy-buy-date #btn_submit' },
    { type: ActionType.CLICK, selector: 'cover-type #next' },
    { type: ActionType.TYPE, selector: 'email-with-tele #txtEmail', stringValueFunc: async (): Promise<string> => generateRandomEmail() },
    { type: ActionType.TYPE, selector: 'email-with-tele #txtphone', stringValueFunc: async (): Promise<string> => generateRandomTelephone() },
    { type: ActionType.CLICK, selector: 'email-with-tele .checkmark' },
  ],
  submitAction: { type: ActionType.CLICK, selector: 'email-with-tele #btnEmailClick' },
};
