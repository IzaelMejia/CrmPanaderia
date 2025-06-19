import { Redirect } from "expo-router";

export default function Index() {
  const logged = false;
  
  return logged ? <Redirect href="/home" /> : <Redirect href="/login" />;
}
