import { Navigate } from "react-router-dom";
import "../assets/Style/pages/Profile.scss";

//TODO dodati da ako je korisnik prijavljen prikazuje mu profil u suprotnom treba da mu pokaze login formu
export default function Profile() {
  const user = null;
  if (!user) return <Navigate to={"/Profile/login"} />;

  return (
    <div className="profile-continer">
      <h2>Welcome, {user.name}</h2>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
