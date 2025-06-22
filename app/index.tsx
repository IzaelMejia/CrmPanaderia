import { useAppSelector } from "@src/infrastructure/store/hooks/reduxActions";
import { Redirect } from "expo-router";

export default function Index() {
  const logged = true;
  // const { logged } = useAppSelector((state) =>  state.auth);
  
  return logged ? <Redirect href="/home" /> : <Redirect href="/login" />;
}
