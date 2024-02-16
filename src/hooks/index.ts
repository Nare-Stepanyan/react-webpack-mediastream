import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const useAppSelector = useSelector<RootState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
