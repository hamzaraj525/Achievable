import { PushNotificationMessage } from '../../push-notifications';
import { User } from '../../types/domain-models';

export enum InboundWebViewEventTypes {
  LOGOUT = 'LOGOUT',
  USER_UPDATE = 'USER_UPDATE',
}

export type InboundWebViewEvent = InboundLogOutEvent | InboundUserUpdateEvent;

type InboundLogOutEvent = {
  type: InboundWebViewEventTypes.LOGOUT;
};

export function isLogoutEvent(
  event: InboundWebViewEvent
): event is InboundLogOutEvent {
  return event.type === InboundWebViewEventTypes.LOGOUT;
}

type InboundUserUpdateEvent = {
  type: InboundWebViewEventTypes.USER_UPDATE;
  data: Partial<User>;
};

export function isUserUpdateEvent(
  event: InboundWebViewEvent
): event is InboundUserUpdateEvent {
  return event.type === InboundWebViewEventTypes.USER_UPDATE;
}

export enum OutboundWebViewEventTypes {
  MEDIA_CAPTURE = 'MEDIA_CAPTURE',
  NAV_CHANGE = 'NAV_CHANGE',
  PUSH_NOTIFICATION_INTERACTION = 'PUSH_NOTIFICATION_INTERACTION',
}

export type OutboundWebViewEvent =
  | OutboundMediaCaptureEvent
  | OutboundPushNotificationInteractionEvent
  | OutboundNavChangeEvent;

type OutboundMediaCaptureEvent = {
  type: OutboundWebViewEventTypes.MEDIA_CAPTURE;
};

type OutboundPushNotificationInteractionEvent = {
  type: OutboundWebViewEventTypes.PUSH_NOTIFICATION_INTERACTION;
  data: PushNotificationMessage;
};

type OutboundNavChangeEvent = {
  type: OutboundWebViewEventTypes.NAV_CHANGE;
  data: {
    url: string;
  };
};
