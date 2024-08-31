import * as React from "react";
import "./todopage.css";
import { styled, alpha } from "@mui/material/styles";
import keepLogo from "../../../src/assets/keep-icon.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DnsIcon from "@mui/icons-material/Dns";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Avatar } from "@mui/material";

// Custom Styled Components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "75ch",
    },
  },
}));

// TodoPage Component
export function TodoPage() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [cookies, setCookie, removeCookie] = useCookies([
    "Fname",
    "Lname",
    "Email",
  ]);
  const [userDetails, setUserDetails] = React.useState<any>(null);
  const navigate = useNavigate();

  // Fetch user data from Firebase
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user: any) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        setUserDetails(docData.data());
        console.log("User", docData.data());
      } else {
        console.error("User not Logged In");
      }
    });
  };
  // Handle logout
  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error: any) {
      console.error(error.message);
    }
  }
  React.useEffect(() => {
    fetchUserData();
  }, []);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  // Handle profile menu
  function handleProfile() {
    console.log("Profile clicked");
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="Refresh" color="inherit">
          <RefreshIcon titleAccess="Refresh" />
        </IconButton>
        <p>Refresh</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="ViewList" color="inherit">
          <DnsIcon titleAccess="ViewList" />
        </IconButton>
        <p>List View</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
        >
          {userDetails ? (
            <h6 className="text-dark m-2 userNametxt animate__fadeInRight">
              {userDetails.firstName}
            </h6>
          ) : (
            <Avatar src="" alt="" />
          )}
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="transparent"
        style={{ backgroundColor: "white" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <img src={keepLogo} alt="Keep" /> Keep
          </Typography>
          <Search className="border border-1">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="Refresh" color="inherit">
              <RefreshIcon titleAccess="Refresh" />
            </IconButton>
            <IconButton size="large" aria-label="ViewList" color="inherit">
              <DnsIcon titleAccess="ViewList" />
            </IconButton>
            <IconButton size="large" aria-label="settings" color="inherit">
              <Settings titleAccess="Settings" />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {userDetails ? (
                <h6 className="text-dark m-2 userNametxt animate__fadeInRight">
                  <Avatar src={userDetails.photoURL} alt="" />
                </h6>
              ) : (
                <Avatar src="" alt="" />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
