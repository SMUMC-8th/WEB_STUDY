import { useSelector as useDefaultSeletor, useDispatch as useDefaultDispatch } from "react-redux";
import  type { AppDispatch } from '../store/store';
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../store/store";

export const useDispatch: () => AppDispatch = useDefaultDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSeletor;