import { Link } from "react-router";
import { GrLanguage } from "react-icons/gr";
import { useUser } from "../hooks/user";
import i18n from "../i18n";
import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-linear-to-r from-orange-500 via-orange-500 to-orange-600 shadow-md border-b border-neutral-800 flex px-6 md:px-10 justify-between items-center text-white">
      <div className="flex gap-15">
        <div className="flex items-center">
          <Link
            to={user ? "/feed" : "/gettingStarted"}
            className="font-modak font-semibold cursor-pointer text-2xl hover:opacity-80 transition"
            style={{ fontFamily: "'Limelight', cursive" }}
          >
            VibeHub
          </Link>
        </div>
        <div className=" max-w-5xl p-4 hidden md:flex  items-center gap-6">
          {user && (
            <Link to="/feed" className="hover:underline">
              {t("navbar.feed")}
            </Link>
          )}
          {user && (
            <Link to="/profile" className="hover:underline">
              {t("navbar.profile")}
            </Link>
          )}
        </div>
      </div>

      <Drawer
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            height: "auto",
            maxHeight: "45vh",
            backgroundColor: "#f97316",
            color: "white",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
              <ListItemText
                primary="Home"
                primaryTypographyProps={{ fontSize: "1.25rem" }}
              />
            </ListItemButton>
          </ListItem>

          {user && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/feed"
                onClick={() => setOpen(false)}
              >
                <ListItemText
                  primary="Feed"
                  primaryTypographyProps={{ fontSize: "1.25rem" }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {user && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/friends"
                onClick={() => setOpen(false)}
              >
                <ListItemText
                  primary="Friends"
                  primaryTypographyProps={{ fontSize: "1.25rem" }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {user && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/groups"
                onClick={() => setOpen(false)}
              >
                <ListItemText
                  primary="Groups"
                  primaryTypographyProps={{ fontSize: "1.25rem" }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {user && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/profile"
                onClick={() => setOpen(false)}
              >
                <ListItemText
                  primary="Profile"
                  primaryTypographyProps={{ fontSize: "1.25rem" }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {user && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
              >
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontSize: "1.25rem" }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>

      <div className="max-w-5xl p-4 flex items-center gap-4">
        <div className="relative group">
          <GrLanguage className="cursor-pointer text-lg text-white" />
          <div
            className="
      absolute right-0 top-full mt-0
      w-28 bg-neutral-800 border border-neutral-600 rounded-xl shadow-xl
      opacity-0
      group-hover:opacity-100
      transition duration-200 ease-out
      
    "
          >
            <button
              onClick={() => i18n.changeLanguage("en")}
              className="block w-full text-left px-3 py-2 cursor-pointer text-sm text-white hover:bg-neutral-700 rounded-t-xl"
            >
              🇬🇧 EN
            </button>
            <button
              onClick={() => i18n.changeLanguage("bg")}
              className="block w-full text-left px-3 py-2 text-sm cursor-pointer text-white hover:bg-neutral-700 rounded-b-xl"
            >
              🇧🇬 BG
            </button>
          </div>
        </div>

        <div className="md:hidden">
          <IconButton onClick={() => setOpen(true)} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
        </div>

        {user && (
          <button
            onClick={logout}
            className="hidden md:flex cursor-pointer hover:underline"
          >
            {t("navbar.logout")}
          </button>
        )}
      </div>
    </header>
  );
}
