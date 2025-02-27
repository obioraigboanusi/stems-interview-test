// @ts-nocheck
export const useTriggerEvent = (elm: any, { event, ...valueObj }: any) => {
  if (!(elm instanceof Element)) {
    throw new Error(`Expected an Element but received ${elm} instead!`);
  }

  const [prop, value] = Object.entries(valueObj)[0] ?? [];
  const desc = Object.getOwnPropertyDescriptor(elm.__proto__, prop);

  desc?.set?.call(elm, value);
  elm.dispatchEvent(new Event(event, { bubbles: true }));
};
