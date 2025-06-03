import { Redirect } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { store } from "../src/presentation/store/store";
import { createContext } from "react";
export default function Start() {
  // const AuthContext = createContext({});
  // const { logged } = useSelector((state) =>  state.auth);

  return (
    <Provider store={store}>
      <>

      </>
      {/* <AuthContext.Provider value={{}}></AuthContext.Provider> */}
    </Provider>
  );
  // <Redirect href="/login" />;
}
