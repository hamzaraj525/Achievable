import { AppState } from './app-selector';

type WithStateSelector<SelectedStateValue, SelectedAppStateSliceKey> = (
    state: SelectedAppStateSliceKey
) => SelectedStateValue;

type AppStateSliceKey = keyof AppState;

const selectStateSlice = <SelectedAppStateSliceKey extends AppStateSliceKey>(
    state: AppState,
    sliceKey: SelectedAppStateSliceKey
): AppState[SelectedAppStateSliceKey] => state[sliceKey];

export const buildWithStateSliceSelector =
    <SelectedAppStateSliceKey extends AppStateSliceKey>(
        sliceKey: SelectedAppStateSliceKey
    ) =>
    <SelectedStateValue>(
        selector: WithStateSelector<
            SelectedStateValue,
            AppState[SelectedAppStateSliceKey]
        >
    ) =>
    (state: AppState) =>
        selector(selectStateSlice(state, sliceKey));
