import { useAppSelector } from "@src/infrastructure/store/hooks/reduxActions";
import { Redirect } from "expo-router";

export default function Index() {
  const { logged } = useAppSelector((state) => state.auth);
  console.log("logged", logged);

  return logged ? <Redirect href="/home" /> : <Redirect href="/login" />;
}
