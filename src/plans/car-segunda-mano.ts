import { ICJ } from '../core/ICJ';
import { ActionType } from '../enums/actions';
import {
  generateRandomEmail,
  generateRandomName,
  generateRandomStringBirthDate,
  generateRandomSurname,
  generateRandomTelephone,
} from '../services/random';

export default <ICJ>{
  name: '[CAR] - Segunda mano - carfax - todos tipos',
  actions: [
    {
      type: ActionType.CLICK,
      selector: 'already-bought #radioNone',
      optional: true,
      executeIf: async (): Promise<boolean> => !window?.location?.hash || window?.location?.hash === '#Q1',
    },
    { type: ActionType.CLICK, selector: 'just-bought-type #SecondHandFromPerson' },
    { type: ActionType.TYPE, selector: 'app-license-plate input', stringValue: '6458CPS' },
    { type: ActionType.CLICK, selector: '#btnLicensePlateClick' },
    { type: ActionType.CLICK, selector: 'app-license-plate .selector-wrapper .card-selector', timeout: 90000 },
    { type: ActionType.CLICK, selector: '#MainDriver' },
    { type: ActionType.CLICK, selector: '#div-No' },
    { type: ActionType.CLICK, selector: '#PrivateWork' },
    { type: ActionType.CLICK, selector: '#StreetParking' },
    { type: ActionType.CLICK, selector: '#radioKM14000To20000' },
    { type: ActionType.CLICK, selector: 'another-vehicle #divOption1 #span_YesBike-span' },
    { type: ActionType.CLICK, selector: 'another-vehicle #divOption2 #Two-span' },
    {
      type: ActionType.TYPE,
      selector: 'vehicle-driver-dob input',
      executeFunc: async (): Promise<string> => generateRandomStringBirthDate({ minAge: 30, maxAge: 50 }),
    },
    { type: ActionType.CLICK, selector: 'vehicle-driver-dob #btn_submit' },
    { type: ActionType.CLICK, selector: "div[title='España']" },
    { type: ActionType.SELECT, selector: '#CJDriverDetailsLicenceDate_Month', numericValue: 2 },
    { type: ActionType.SELECT, selector: '#CJDriverDetailsLicenceDate_Year', numericValue: 3 },
    { type: ActionType.CLICK, selector: 'license-obtain-date #btn_submit' },
    { type: ActionType.CLICK, selector: "license-obtained-place div[title='España']" },
    { type: ActionType.CLICK, selector: 'vehicle-drive-gender #radioMale+div' },
    { type: ActionType.CLICK, selector: 'vehicle-drive-gender #radioMarried' },
    { type: ActionType.CLICK, selector: 'children-at-home #radioChildYes' },
    { type: ActionType.CLICK, selector: 'children-at-home #radioYoungerYes' },
    { type: ActionType.CLICK, selector: 'children-at-home #radioAdultNo' },
    { type: ActionType.CLICK, selector: 'children-at-home #btnMainDriverChildSubmit' },
    { type: ActionType.CLICK, selector: 'vehicle-driver-profession #EngineerArchitect' },
    { type: ActionType.CLICK, selector: 'app-address-search #btnSkipAddressSearch' },
    { type: ActionType.CLICK, selector: 'app-address-search .address-none > a' },
    { type: ActionType.TYPE, selector: 'app-address #txtPostalCode', stringValue: '28002' },
    { type: ActionType.SELECT, selector: 'app-address #driverStreetkind', stringValue: 'Calle' },
    { type: ActionType.TYPE, selector: 'app-address #txtVia', stringValue: 'Sánchez Pacheco' },
    { type: ActionType.TYPE, selector: 'app-address #txtNumero', stringValue: '85' },
    { type: ActionType.WAIT_UNTIL_VALUE, selector: 'app-address #driverTown > option:nth-child(2)', stringValue: 'Madrid, Madrid', timeout: 90000 },
    { type: ActionType.CLICK, selector: 'app-address #btnSkipAddress' },
    { type: ActionType.CLICK, selector: 'residence-duration #Between4and5' },
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
    { type: ActionType.CLICK, selector: 'insurence-question #Yes' },
    { type: ActionType.CLICK, selector: 'insurer-name #li36' },
    {
      type: ActionType.SELECT,
      selector: 'policy-expired-date #CJInsuranceDetailsNotNewNotInsuredPolicyExpiredDate_Month',
      executeFunc: async (): Promise<number> => new Date().getMonth() + 2,
    },
    {
      type: ActionType.SELECT,
      selector: 'policy-expired-date #CJInsuranceDetailsNotNewNotInsuredPolicyExpiredDate_Year',
      numericValue: 3,
    },
    { type: ActionType.CLICK, selector: 'policy-expired-date #btn_submit' },
    {
      type: ActionType.SELECT,
      selector: 'current-insurer-duration #CJInsuranceDetailsNotNewNotInsuredCurrentInsurerDuration_dropdown',
      numericValue: 6,
    },
    {
      type: ActionType.SELECT,
      selector: 'current-insurer-duration #CJInsuranceDetailsNotNewNotInsuredPolicyHoldingDuration_dropdown',
      numericValue: 12,
    },
    { type: ActionType.CLICK, selector: 'current-insurer-duration #btn_submit' },
    { type: ActionType.CLICK, selector: 'claim-details #radioNo' },
    { type: ActionType.CLICK, selector: 'fine-details #No' },
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
    { type: ActionType.CLICK, selector: 'cover-type #next' },
    { type: ActionType.TYPE, selector: 'email-with-tele #txtEmail', executeFunc: async (): Promise<string> => generateRandomEmail() },
    { type: ActionType.TYPE, selector: 'email-with-tele #txtphone', executeFunc: async (): Promise<string> => generateRandomTelephone() },
    { type: ActionType.CLICK, selector: 'email-with-tele .checkmark' },
  ],
  submitAction: { type: ActionType.CLICK, selector: 'email-with-tele #btnEmailClick' },
  isEnabledForLocation: (location: string): boolean => location.startsWith('https://seguros-coche'),
};
