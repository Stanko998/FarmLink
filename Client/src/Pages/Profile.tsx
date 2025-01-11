import "../assets/Style/pages/Profile.scss";
import Login from "../components/profile/Login";

export default function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-section">
        <Login />
      </div>
    </div>
  );
}
