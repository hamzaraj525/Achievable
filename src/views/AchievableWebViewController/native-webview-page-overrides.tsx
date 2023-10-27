import { getConfig } from '../../config';
import { MediaCapture } from './views/MediaCapture';

export const isMediaCaptureWebView = (url: string) =>
  url.includes(`${getConfig().WEB_APP_BASE}task-completion-flow/media-capture`);

export const NATIVE_VIEW_OVERRIDES = [
  {
    match: isMediaCaptureWebView,
    Component: MediaCapture,
  },
];
