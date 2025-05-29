import { TypedUseSelectorHook } from "react-redux";
import {
  useDispatch as useDefaultDispatch,
  useSelector as useDefaultSelector,
} from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export const useDispatch: () => AppDispatch = useDefaultDispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
