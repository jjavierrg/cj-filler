import { ICJ } from '../core/ICJ';
import { ICJAction } from '../core/ICJAction';
import { ActionType } from '../enums/actions';

function ActionToTypescriptConverter(action: ICJAction): string {
  const { type, selector, stringValue, numericValue, booleanValue, optional, timeout, omitFireEvents } = action;
  const enumKey = Object.keys(ActionType).find((k) => ActionType[k as keyof typeof ActionType] === type);

  let actionString = `{ type: ActionType.${enumKey}`;

  if (selector) {
    const escapedSelector = selector.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    actionString += `, selector: '${escapedSelector}'`;
  }

  if (stringValue !== undefined) {
    actionString += `, stringValue: '${stringValue}'`;
  }

  if (numericValue !== undefined) {
    actionString += `, numericValue: ${numericValue}`;
  }

  if (booleanValue !== undefined) {
    actionString += `, booleanValue: ${booleanValue ? 'true' : 'false'}`;
  }

  if (optional !== undefined) {
    actionString += `, optional: ${optional ? 'true' : 'false'}`;
  }

  if (timeout !== undefined) {
    actionString += `, timeout: ${timeout}`;
  }

  if (omitFireEvents !== undefined) {
    actionString += `, omitFireEvents: ${omitFireEvents ? 'true' : 'false'}`;
  }

  actionString += ' }';
  return actionString;
}

export function convertPlanToTypescript(plan: ICJ): string {
  const { name, actions, submitAction } = plan;
  const actionsString = actions.map(ActionToTypescriptConverter).join(',\n    ');

  return `import { ICJ } from '../core/ICJ';
import { ActionType } from '../enums/actions';

export default <ICJ>{
  name: '${name || 'Unnamed Plan'}',
  actions: ${actions.length ? `[\n    ${actionsString}\n  ]` : '[]'},
  isEnabledForLocation: (location: string): boolean => location.startsWith('${window.location.protocol}//${window.location.host.split('.')[0]}'),
  submitAction: ${ActionToTypescriptConverter(submitAction)},
};`;
}
