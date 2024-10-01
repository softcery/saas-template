export interface IEvent<TPayload extends object = object, TEventType = any> {
  readonly eventType: TEventType;
  readonly payload: Readonly<TPayload>;
}
