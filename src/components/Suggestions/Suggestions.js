import React from "react";
import classnames from "classnames";
import Temperature from "./Temperature";
import Rainfall from "./Rainfall";
import Location from "./Location";
import { Card, CardBody, NavItem, NavLink, Nav, TabContent, TabPane, CardHeader, Row } from "reactstrap";

class Navs extends React.Component {
	state = {
		navPills: 1,
	};
	toggleNavs = (e, state, index) => {
		e.preventDefault();
		this.setState({
			[state]: index,
		});
	};
	render() {
		return (
			<>
				<CardHeader className="border-0 mt-5">
					<Row className="align-items-center">
						<div className="col">
							<h3 className="mb-0 text-center"> Suggestions</h3>
						</div>
					</Row>
				</CardHeader>
				<Nav className="nav-fill flex-column flex-sm-row" id="tabs-text" pills role="tablist">
					<NavItem>
						<NavLink
							aria-selected={this.state.navPills === 1}
							className={classnames("mb-sm-3 mb-md-0", {
								active: this.state.navPills === 1,
							})}
							onClick={(e) => this.toggleNavs(e, "navPills", 1)}
							role="tab"
							style={{ cursor: "pointer" }}
						>
							Temperature
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							aria-selected={this.state.navPills === 2}
							className={classnames("mb-sm-3 mb-md-0", {
								active: this.state.navPills === 2,
							})}
							onClick={(e) => this.toggleNavs(e, "navPills", 2)}
							role="tab"
							style={{ cursor: "pointer" }}
						>
							Rainfall
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							aria-selected={this.state.navPills === 3}
							className={classnames("mb-sm-3 mb-md-0", {
								active: this.state.navPills === 3,
							})}
							onClick={(e) => this.toggleNavs(e, "navPills", 3)}
							role="tab"
							style={{ cursor: "pointer" }}
						>
							Location
						</NavLink>
					</NavItem>
				</Nav>
				{this.state.navPills === 1 && <Temperature currentTemperature={this.props.data.current.temp_c} />}
				{this.state.navPills === 2 && <Rainfall currentRainfall={this.props.data.current.precip_mm * 0.1} />}
				{this.state.navPills === 3 && <Location />}
			</>
		);
	}
}

export default Navs;
// import Temperature from "./Temperature"
// const Suggestions = () => {
// 	return (
// 		<Temperature />
// 	)
// }

// export default Suggestions
