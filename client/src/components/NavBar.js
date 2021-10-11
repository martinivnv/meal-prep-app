import { React, useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	MenuItem,
	Menu,
	Typography,
} from "@mui/material";
import {
	AccountCircle,
	MoreIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@mui/icons-material";

import logo from "../resources/logo.png";

export default function NavBar(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const nextMonth = () => {
		props.changeMonth("next");
	};

	const prevMonth = () => {
		props.changeMonth("prev");
	};

	const getMonth = () => {
		switch (props.month) {
			case 1:
				return "Jan";
			case 2:
				return "Feb";
			case 3:
				return "Mar";
			case 4:
				return "Apr";
			case 5:
				return "May";
			case 6:
				return "Jun";
			case 7:
				return "Jul";
			case 8:
				return "Aug";
			case 9:
				return "Sep";
			case 10:
				return "Oct";
			case 11:
				return "Nov";
			case 12:
				return "Dec";
			default:
				break;
		}
	};

	const menuId = "primary-profile-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>My Account</MenuItem>
			<MenuItem onClick={handleMenuClose}>Logout</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem disabled onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	/**const [drawerState, setDrawerState] = useState(false);

	const generateDrawer = () => <div className={classes.drawer}>Test</div>;**/

	return (
		<div className="grow">
			<AppBar position="static" className="navBar">
				<Toolbar>
					{/**<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
						onClick={() => setDrawerState(true)}
					>
						<MenuIcon />
					</IconButton>
					<Drawer
						anchor={"left"}
						open={drawerState}
						onClose={() => setDrawerState(false)}
					>
						{generateDrawer()}
					</Drawer>**/}
					<img src={logo} alt="logo" className="logo" />
					<div className="grow">
						<IconButton
							color="inherit"
							aria-label="go to previous month"
							onClick={prevMonth}
						>
							<ChevronLeftIcon />
						</IconButton>
						<Typography variant="h6" className="date">
							{getMonth() + " " + props.year}
						</Typography>
						<IconButton
							color="inherit"
							aria-label="go to next month"
							onClick={nextMonth}
						>
							<ChevronRightIcon />
						</IconButton>
					</div>
					<div className="sectionDesktop">
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
							disabled
						>
							<AccountCircle />
						</IconButton>
					</div>
					<div className="sectionMobile">
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}
