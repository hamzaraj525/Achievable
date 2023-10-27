import { TypedUseSelectorHook } from 'react-redux';
import { store } from './store';
import { useSelector } from 'react-redux';

export type AppState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
