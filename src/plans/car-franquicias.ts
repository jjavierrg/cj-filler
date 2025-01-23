import { ICJ } from '../core/ICJ';
import { ActionType } from '../enums/actions';
import {
  generateRandomEmail,
  generateRandomName,
  generateRandomStringBirthDate,
  generateRandomSurname,
  generateRandomTelephone,
} from '../services/random';
/** */
export default <ICJ>{
  name: '[CAR] - YaLoTenia - seguro ultimos 60 días - SI',
  actions: [
    {
      type: ActionType.CLICK,
      selector: '#NotNew',
      optional: true,
      executeIf: async (): Promise<boolean> => !window?.location?.hash || window?.location?.hash === '#Q1',
    },
    { type: ActionType.TYPE, selector: 'app-license-plate input', stringValue: '3478MLW' },
    { type: ActionType.CLICK, selector: '#btnLicensePlateClick' },
    { type: ActionType.CLICK, selector: 'app-license-plate .selector-wrapper .card-selector', timeout: 90000 },
    { type: ActionType.CLICK, selector: '#MainDriver' },
    { type: ActionType.CLICK, selector: '#div-No' },
    { type: ActionType.SELECT, selector: '#CJCarDetailsBuyDateB_Month', numericValue: 13 },
    { type: ActionType.SELECT, selector: '#CJCarDetailsBuyDateB_Year', stringValue: '2023' },
    { type: ActionType.CLICK, selector: '#btn_submit' },
    { type: ActionType.CLICK, selector: '#PrivateWork' },
    { type: ActionType.CLICK, selector: '#CollectiveGarageVigilance-span' },
    { type: ActionType.CLICK, selector: '#radioKM14000To20000' },
    { type: ActionType.CLICK, selector: 'another-vehicle #divOption1 #span_No-span' },
    { type: ActionType.CLICK, selector: 'another-vehicle #divOption2 #Two-span' },
    {
      type: ActionType.TYPE,
      selector: 'vehicle-driver-dob input',
      executeFunc: async (): Promise<string> => generateRandomStringBirthDate({ minAge: 25 }),
    },
    { type: ActionType.CLICK, selector: 'vehicle-driver-dob #btn_submit' },
    { type: ActionType.CLICK, selector: "div[title='España']" },
    { type: ActionType.SELECT, selector: '#CJDriverDetailsLicenceDate_Month', numericValue: 13 },
    { type: ActionType.SELECT, selector: '#CJDriverDetailsLicenceDate_Year', numericValue: 3 },
    { type: ActionType.CLICK, selector: 'license-obtain-date #btn_submit' },
    { type: ActionType.CLICK, selector: "license-obtained-place div[title='España']" },
    { type: ActionType.CLICK, selector: 'vehicle-drive-gender #radioMale+div' },
    { type: ActionType.CLICK, selector: '#Single' },
    { type: ActionType.CLICK, selector: 'children-at-home #radioChildNo' },
    { type: ActionType.CLICK, selector: 'vehicle-driver-profession #Director-span' },
    { type: ActionType.CLICK, selector: 'app-address-search #btnSkipAddressSearch' },
    { type: ActionType.CLICK, selector: 'app-address-search .address-none > a' },
    { type: ActionType.TYPE, selector: 'app-address #txtPostalCode', stringValue: '28002' },
    { type: ActionType.SELECT, selector: 'app-address #driverStreetkind', stringValue: 'Calle' },
    { type: ActionType.TYPE, selector: 'app-address #txtVia', stringValue: 'Sánchez Pacheco' },
    { type: ActionType.TYPE, selector: 'app-address #txtNumero', stringValue: '85' },
    { type: ActionType.WAIT_UNTIL_VALUE, selector: 'app-address #driverTown > option:nth-child(2)', stringValue: 'Madrid, Madrid', timeout: 90000 },
    { type: ActionType.CLICK, selector: 'app-address #btnSkipAddress' },
    { type: ActionType.CLICK, selector: 'residence-duration #Between2and3' },
    { type: ActionType.CLICK, selector: 'who-policy-holder #MainDriver' },
    { type: ActionType.TYPE, selector: 'app-dni #txtDniNumber', stringValue: '12345678Z' },
    { type: ActionType.CLICK, selector: 'app-dni #btnDniClick' },
    { type: ActionType.TYPE, selector: 'app-policy-holder-name #txtFistName', executeFunc: async (): Promise<string> => generateRandomName() },
    {
      type: ActionType.TYPE,
      selector: 'app-policy-holder-name #txtMiddleName',
      executeFunc: async (): Promise<string> => generateRandomSurname(),
    },
    { type: ActionType.TYPE, selector: 'app-policy-holder-name #txtLastName', executeFunc: async (): Promise<string> => generateRandomSurname() },
    { type: ActionType.CLICK, selector: 'app-policy-holder-name #btnPolicyHolderNameClick' },
    { type: ActionType.CLICK, selector: 'app-isocassional-driver #No' },
    { type: ActionType.CLICK, selector: 'preferred-insurer #Yes-span' },
    { type: ActionType.CLICK, selector: '#li18' },
    { type: ActionType.SELECT, selector: '#CJInsuranceDetailsNotNewNotInsuredPolicyExpiredDate_Month', numericValue: 4 },
    { type: ActionType.SELECT, selector: '#CJInsuranceDetailsNotNewNotInsuredPolicyExpiredDate_Year', numericValue: 2 },
    { type: ActionType.CLICK, selector: 'policy-expired-date #btn_submit' },
    { type: ActionType.SELECT, selector: '#CJInsuranceDetailsNotNewNotInsuredCurrentInsurerDuration_dropdown', numericValue: 4 },
    { type: ActionType.SELECT, selector: '#CJInsuranceDetailsNotNewNotInsuredPolicyHoldingDuration_dropdown', numericValue: 5 },
    { type: ActionType.CLICK, selector: 'current-insurer-duration #btn_submit' },
    { type: ActionType.CLICK, selector: '#spanNo-span' },
    { type: ActionType.CLICK, selector: '#No-span' },
    {
      type: ActionType.TYPE,
      selector: 'expected-policy-buy-date input',
      executeFunc: async (): Promise<string> => {
        const today = new Date();
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        return nextMonth.toLocaleDateString('es-ES', { month: '2-digit', day: '2-digit', year: 'numeric' });
      },
    },
    { type: ActionType.CLICK, selector: 'expected-policy-buy-date #btn_submit' },
    { type: ActionType.CLICK, selector: '#thirdPartyGlassFireTheft' },
    { type: ActionType.TYPE, selector: 'email-with-tele #txtEmail', executeFunc: async (): Promise<string> => generateRandomEmail() },
    { type: ActionType.TYPE, selector: 'email-with-tele #txtphone', executeFunc: async (): Promise<string> => generateRandomTelephone() },
    { type: ActionType.CLICK, selector: 'email-with-tele .checkmark' },
  ],
  submitAction: { type: ActionType.CLICK, selector: 'email-with-tele #btnEmailClick' },
  isEnabledForLocation: (location: string): boolean => location.startsWith('https://seguros-coche'),
};
