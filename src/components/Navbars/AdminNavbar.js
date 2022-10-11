
import { Link } from "react-router-dom";
import {
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Form,
	FormGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	InputGroup,
	Navbar,
	Nav,
	Container,
	Media,
} from "reactstrap";
import { useState, useEffect } from "react";

const AdminNavbar = (props) => {
	const [username, setUsername] = useState("");

	const handleLogout = () => {
		localStorage.removeItem("token");
		props.refresh();
	};

	return (
		<>
			<Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
				<Container fluid>
					<p className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">{props.brandText}</p>
					<div className='text-center'>
						<div id="google_translate_element" style={{ padding: '3px 3px 0 0' }}></div>
					</div>
					<Nav className="align-items-center d-none d-md-flex" navbar>
						<UncontrolledDropdown nav>
							<DropdownToggle className="pr-0" nav>
								<Media className="align-items-center">
									<Media className="ml-2 d-none d-lg-block">
										<span className="mb-0 text-sm font-weight-bold">{username}</span>
									</Media>
								</Media>
							</DropdownToggle>
							<DropdownMenu className="dropdown-menu-arrow" right>
								<DropdownItem className="noti-title" header tag="div">
									<h6 className="text-overflow m-0">Welcome!</h6>
								</DropdownItem>
								<DropdownItem to="/farmer/user-profile" tag={Link}>
									<i className="ni ni-single-02" />
									<span>My profile</span>
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem href="/logout" onClick={handleLogout}>
									<i className="ni ni-user-run" />
									<span>Logout</span>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default AdminNavbar;
