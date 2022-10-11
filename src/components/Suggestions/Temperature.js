import React from "react";
import { Row, Col, CardHeader, Table, Card } from "reactstrap";
import crops from "./crops.json";
const Temperature = ({ currentTemperature }) => {
	const suggestedCrops = [];
	Object.keys(crops).forEach((crop) => {
		if (crops[crop].min_T <= currentTemperature && currentTemperature <= crops[crop].max_T)
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
					<strong>Current Temp: {currentTemperature}ºC</strong>
				</p>
				<Table className="align-items-center table-flush table-striped" responsive>
					<thead>
						<tr>
							<th scope="col">Crop</th>
							<th scope="col">Min Required Temperature</th>
							<th scope="col">Max Allowed Temperature</th>
						</tr>
					</thead>
					<tbody>
						{suggestedCrops.map((crop, index) => (
							<tr key={index + "crop"}>
								<td>{crop}</td>
								<td>{crops[crop].min_T}ºC</td>
								<td>{crops[crop].max_T}ºC</td>
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

export default Temperature;
