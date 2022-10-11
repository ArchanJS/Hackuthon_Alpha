import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = ({ username }) => {
	return (
		<>
			<div
				className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
				style={{
					minHeight: "600px",
					backgroundImage: "url(https://wallpapercave.com/wp/wp1987046.jpg)",
					backgroundSize: "cover",
					backgroundPosition: "center top",
				}}
			>
				<span className="mask bg-gradient-default opacity-8" />
				<Container className="d-flex align-items-center" fluid>
					<Row>
						<Col lg="7" md="10">
							<p className="text-white mt-0 mb-5">
								Upload photos of plants to detect disease and get suggestions.
							</p>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

export default UserHeader;
