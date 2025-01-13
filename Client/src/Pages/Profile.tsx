import { Navigate } from "react-router-dom";
import "../assets/Style/pages/Profile.scss";

//TODO dodati da ako je korisnik prijavljen prikazuje mu profil u suprotnom treba da mu pokaze login formu
export default function Profile() {
  const user = null;
  return <>{user || <Navigate to={"/Profile/login"} />}</>;
}
