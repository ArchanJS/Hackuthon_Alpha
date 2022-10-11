import React from "react";
import { Row, Col, CardHeader, Table, Card } from "reactstrap";
import crops from "./crops.json";
const Rainfall = ({ currentRainfall }) => {
	currentRainfall = 250;
	const suggestedCrops = [];
	Object.keys(crops).forEach((crop) => {
		if (crops[crop].min_rain <= currentRainfall && currentRainfall <= crops[crop].max_rain)
			suggestedCrops.push(crop);
	});
	return (
		<Col className="mb-xl-0 p-0" xl="">
			<Card className="shadow p-4">
				<CardHeader className="border-0">
					<Row className="align-items-center">
						<div className="col">
							<h3 className="mb-0 text-center"></h3>
						</div>
					</Row>
				</CardHeader>
				<p>
					<strong>Current Rainfall: {currentRainfall}cm</strong>
				</p>
				<Table className="align-items-center table-flush table-striped" responsive>
					<thead>
						<tr>
							<th scope="col">Crop</th>
							<th scope="col">Min Required Rainfall</th>
							<th scope="col">Max Allowed Rainfall</th>
						</tr>
					</thead>
					<tbody>
						{suggestedCrops.length === 0 && (
							<tr>
								<td>Sorry No Suggestions :(</td>
								<td> </td>
								<td> </td>
							</tr>
						)}
						{suggestedCrops.length > 0 &&
							suggestedCrops.map((crop, index) => (
								<tr key={index + "crop"}>
									<td>{crop}</td>
									<td>{crops[crop].min_rain}cm</td>
									<td>{crops[crop].max_rain}cm</td>
								</tr>
							))}
						{/* <tr>
							<th scope="row">/argon/profile.html</th>
							<td>1,795</td>
							<td>190</td>
							<td>
								<i className="fas fa-arrow-down text-danger mr-3" /> 46,53%
							</td>
						</tr> */}
					</tbody>
				</Table>
			</Card>
		</Col>
	);
};

export default Rainfall;
