import { Link } from "react-router";
import { GrLanguage } from "react-icons/gr";
import { useUser } from "../hooks/user";

import { useState } from "react";
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-neutral-800 flex px-10 justify-between items-center bg-orange-500 relative z-10 text-white/90">
      <div className="flex gap-15">
        <div className="flex items-center">
          <Link
            to="/"
            className="font-modak font-semibold cursor-pointer text-2xl"
            style={{ fontFamily: "'Limelight', cursive" }}
          >
            VibeHub
          </Link>
        </div>
          {/* Desktop menu */}
        <div className=" max-w-5xl p-4 flex  items-center gap-6">
          {user && (
            <Link to="/feed" className="hover:underline">
              Feed
            </Link>
          )}
          {user && (
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          )}
        </div>
      </div>

      
     {/* Burger button */}
     <IconButton onClick={() => setOpen(true)} sx={{ color: "white" }}>
        <MenuIcon />
      </IconButton>

      {/* Top drawer (full width) */}
      <Drawer
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            height: "30vh",             
            backgroundColor: "#f97316",   
            color: "white",
          },
        }}
      >
       <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
    <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
      <CloseIcon />
    </IconButton>
  </Box>

  <List sx={{ px: 4 }}>
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to="/"
        onClick={() => setOpen(false)}
        
      >
        <ListItemText primary="Home" primaryTypographyProps={{ fontSize: "1.25rem" }} />
      </ListItemButton>
    </ListItem>

    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to="/feed"
        onClick={() => setOpen(false)}
        
      >
        <ListItemText primary="Feed" primaryTypographyProps={{ fontSize: "1.25rem" }} />
      </ListItemButton>
    </ListItem>

    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to="/profile"
        onClick={() => setOpen(false)}
        
      >
        <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: "1.25rem" }} />
      </ListItemButton>
    </ListItem>
  </List>
</Drawer>
     



      <div className="max-w-5xl p-4 flex items-center gap-6">
        <GrLanguage className="cursor-pointer" />
        {user && (
          <button onClick={logout} className="cursor-pointer hover:underline">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
