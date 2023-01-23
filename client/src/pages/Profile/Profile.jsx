import React, { useContext, useEffect, useState } from "react";

import { Avatar } from "@mui/material";
import { AuthContext } from "../../Context/auth";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Popup from "../../components/Popup";
import notify from "../../utils/notification.helpers";

function Profile() {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState({});
  const [editProfile, setEditProfile] = useState({
    fullName: "",
    email: "",
  });
  const [popup, setPopup] = useState(false);

//   const userAvatarName = Array.from(profile.fullName)[0];

  useEffect(() => {
    fetch(`http://localhost:5010/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  const handleEditProfile = (e, profile) => {
    e.preventDefault();
    setPopup(true);
    setEditProfile(profile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleEditedProfileSubmit = (e, id) => {
    e.preventDefault();
    fetch(`http://localhost:5010/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editProfile),
    });

    fetch(`http://localhost:5010/user/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setProfile(data));

    setEditProfile({
      fullName: "",
      email: "",
    });

    notify("🦄 Post succesfully updated!");
    setPopup(false);
  };

  return (
    <div className="container">
      <Card sx={{ maxWidth: 800 }}>
        {/* <Avatar>{userAvatarName}</Avatar> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            full name: {profile.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            email: {profile.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            password: {profile.password}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            type="Button"
            size="small"
            onClick={(e) => handleEditProfile(e, profile)}
          >
            Update User
          </Button>
        </CardActions>
      </Card>
      <Popup trigger={popup} setTrigger={setPopup}>
        <form onSubmit={(e) => handleEditedProfileSubmit(e, editProfile._id)}>
          <input
            type="text"
            placeholder="Post Title"
            name={"fullName"}
            value={editProfile.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            name={"email"}
            value={editProfile.email}
            onChange={handleChange}
          />
          <button type="submit">Edit Profile</button>
        </form>
      </Popup>
    </div>
  );
}

export default Profile;
