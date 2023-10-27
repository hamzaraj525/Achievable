export const WEB_VIEW_SLICE_NAMESPACE = 'web-view';

export type WebViewState = {
  urlStack: string[];
};

export const initialState: WebViewState = {
  urlStack: [],
};
