import { getConfig } from '../../config';
import { buildWithStateSliceSelector } from '../state-utils';
import { WEB_VIEW_SLICE_NAMESPACE } from './model';

const withState = buildWithStateSliceSelector(WEB_VIEW_SLICE_NAMESPACE);

export const selectCurrentPage = withState(
  state => state.urlStack[state.urlStack.length - 1] || getConfig().WEB_APP_BASE
);
