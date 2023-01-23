import React, { useEffect, useState } from "react";

import notify from "../../utils/notification.helpers";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function Settings() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5010/user/list`)
      .then((res) => res.json())
      .then((data) => setUsersList(data));
    }, []);
    console.log(usersList);
    
    
    const removeUser = (e, id) => {
      e.preventDefault();
      
      fetch(`http://localhost:5010/user/${id}`, {
        method: "DELETE",
      })
      
      notify('Post succesfully deleted!');
      
      fetch("http://localhost:5010/user/list")
        .then((res) => res.json())
        .then((data) => setUsersList(data));
	}
  console.log(usersList);

  return (
    <div className="container">
      <List sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper" }}>
        {usersList.map((user) => (
          <ListItem alignItems="center" key={user._id}>
              <ListItemAvatar>
                <Avatar alt={user.fullName} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={<React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {user.fullName}
                  </Typography>
                  {`- ${user.email}`}
                </React.Fragment>} />
                <Button variant="outlined" startIcon={<DeleteIcon />}  onClick={(e) => removeUser(e, user._id)}>
                  Delete user
                </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Settings;
