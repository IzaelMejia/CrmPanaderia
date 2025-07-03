import { Permission } from "@src/domain/entities/permission.entity";
import { User } from "@src/domain/entities/user.entity";
import { createSlice } from "@reduxjs/toolkit";

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "not-authenticated"
  | "checking";

interface AuthState {
  status: AuthStatus;
  user: User | null;
  errorMessage?: string;
  logged: boolean;
  permission: Permission[];
}

const initialState: AuthState = {
  status: "not-authenticated",
  user: null,
  logged: false,
  permission: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = null;
      state.errorMessage = undefined;
      state.logged = false;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.permission = payload.PermisosPerfil || [];
      state.errorMessage = undefined;
      state.logged = true;
    },
    onLogout: (state) => {
      state.status = "not-authenticated";
      state.user = null;
      state.permission = [];
      state.errorMessage = undefined;
      state.logged = false;
    },

    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
    onLoginAuth: (state) => {
      state.status = "authenticated";
      state.errorMessage = undefined;
      state.logged = true;
    },
  },
});

export const { onChecking, onLogin, onLogout, onLoginAuth, clearErrorMessage } =
  authSlice.actions;

export default authSlice;
