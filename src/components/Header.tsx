import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import GavelIcon from '@mui/icons-material/Gavel';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import StreetviewIcon from '@mui/icons-material/Streetview';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import AssessmentIcon from '@mui/icons-material/Assessment';

const pages = [
  { keyName: 'Regulations', iconName: <GavelIcon color='primary'/>, to: '.' },
  { keyName: 'Rules', iconName: <DesignServicesIcon color='primary'/>, to: 'rules' },
  { keyName: 'Features', iconName: <GpsFixedIcon color='primary'/>, to: 'features' },
  { keyName: 'Species', iconName: <WorkspacesIcon color='primary'/>, to: 'species' },
  { keyName: 'Species groups', iconName: <AutoAwesomeMotionIcon color='primary'/>, to: 'species-groups' },
  { keyName: 'Take methods', iconName: <DesignServicesIcon color='primary'/>, to: 'take-methods' },
  { keyName: 'App viewer', iconName: <StreetviewIcon color='primary'/>, to: 'app-viewer' },
  { keyName: 'Reports', iconName: <AssessmentIcon color='primary'/>, to: 'reports' },
];
const settings = ["Profile", "Logout"];

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function Header() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigateHandler = (url: string) => {
    navigate(url);
  };
  return (
    <>
      <AppBar  position="static" color='primary'>
        <Container maxWidth="xl" className='flex justify-between items-center'>
          <img
            src="https://office-of-digital-services.github.io/California-State-Web-Template-react/static/media/Ca-Gov-Logo-Gold.b5163ca0410170f61c6dc3046a6cba29.svg"
            alt="CDFW"
            style={{ height: "40px" }}
          />
          <Box sx={{ flexGrow: 0 }} className='py-2'>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/assets/images/woman.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "35px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Container>
        <Box sx={{backgroundColor: '#fff'}} className='py-2'>
          <Container maxWidth="xl" >
            <Toolbar disableGutters>
              <Link to="/" className="hidden md:block">
                <img
                  src="https://wildlife.ca.gov/Portals/0/header_organization.png?ver=2019-07-25-175107-923"
                  alt="CDFW"
                  style={{ height: "50px" }}
                />
              </Link>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.keyName} onClick={handleCloseNavMenu}>
                      <Box>{page.iconName}</Box>
                      <Link
                        key={page.keyName}
                        to={page.to}
                        className="px-2"
                      >
                        {page.keyName}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Link to="/" className="md:hidden">
                <img
                  src="https://wildlife.ca.gov/Portals/0/header_organization.png?ver=2019-07-25-175107-923"
                  alt="CDFW"
                  style={{ height: "50px" }}
                />
              </Link>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} className='gap-x-3.5'>
                {pages.map((page) => {
                  if (page.keyName === "Reports") {
                    return (
                      <span key={page.keyName} className="flex">
                        <Button
                          variant="text"
                          className="text-white py-0 capitalize font-sans text-base font-normal"
                          id="demo-customized-button"
                          aria-controls={
                            open ? "demo-customized-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          disableElevation
                          sx={{color: '#7e4501 !important'}}
                          onClick={handleClick}
                          endIcon={<KeyboardArrowDownIcon />}
                        >
                          <Typography textAlign="center">Reports</Typography>  
                        </Button>
                        <StyledMenu
                          id="demo-customized-menu"
                          MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >
                          <MenuItem
                            key={"regulations"}
                            onClick={() => {
                              navigateHandler("/reports/regulations");
                              handleClose();
                            }}
                            disableRipple
                          >
                            <Typography textAlign="center">
                              Regulations
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            key={"rules"}
                            onClick={() => {
                              navigateHandler("/reports/rules");
                              handleClose();
                            }}
                            disableRipple
                          >
                            <Typography textAlign="center">Rules</Typography>
                          </MenuItem>
                        </StyledMenu>
                      </span>
                    );
                  } else {
                    return (
                      <Link
                        key={page.keyName}
                        style={{color: '#7e4501'}}
                        to={page.to}
                        className="px-2"
                      >
                        <Box className="flex flex-col justify-center items-center">
                          <Box>{page.iconName}</Box>
                          <Typography textAlign="center" sx={{width: 'max-content'}}>{page.keyName}</Typography>
                        </Box>
                      </Link>
                    );
                  }
                })}
              </Box>
            </Toolbar>
          </Container>
        </Box>

      </AppBar>
    </>
  );
}

export default Header;
