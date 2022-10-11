
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
	return (
		<footer className="footer">
			<Row className="align-items-center justify-content-xl-between">
				<Col xl="6">
					<div className="copyright text-center text-xl-left text-muted">
						© {new Date().getFullYear()} <span className="font-weight-bold ml-1">Farm-Alpha</span>
					</div>
				</Col>

				<Col xl="6">
					<Nav className="nav-footer justify-content-center justify-content-xl-end">
						<NavItem>
							<NavLink
								rel="noopener noreferrer"
								target="_blank"
							>
								Created by Team Alpha
							</NavLink>
						</NavItem>
					</Nav>
				</Col>
			</Row>
		</footer>
	);
};

export default Footer;
