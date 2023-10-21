import { redirect } from "react-router-dom";

export async function requiredAuth() {
  const isLoggingin: boolean = true;
  if (!isLoggingin) {
    throw redirect("/login?message=you must login first");
  }
}
