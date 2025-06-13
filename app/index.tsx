import { Redirect } from "expo-router";

export default function Index() {
  // const logged = useAppSelector((state) => state.auth.logged);
  // console.log("logged", logged);
  const logged = false;
  

  return logged ? <Redirect href="/home" /> : <Redirect href="/login" />;
}
