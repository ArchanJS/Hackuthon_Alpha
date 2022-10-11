import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
import UserHeader from "components/Headers/UserHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSpeechSynthesis } from 'react-speech-kit';

const HealthAssessment = () => {
	const [photo, setPhoto] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
	const [data, setData] = useState();
	const [isPlant, setIsPlant] = useState(true);
	const { speak,SpeechSynthesisVoice } = useSpeechSynthesis();

	const uploadImage = async (e) => {
		try {
			const file = e.target.files[0];
			const base64 = await convertBase64(file);
			if (!base64) return;
			setPhoto(base64.toString());
			// const res=await axios.post('https://plant-disease-detector-pytorch.herokuapp.com/',{image:photo},{
			// 	headers:{
			// 		"Content-Type":"application/json"
			// 	}
			// })
			const apiData = {
				api_key: "<--your API key-->",
				images: [base64],
				modifiers: ["crops_fast", "similar_images"],
				language: "en",
				disease_details: [
					"cause",
					"common_names",
					"classification",
					"description",
					"treatment",
					"url",
				],
			};
			const res = await axios({
				//   url: 'https://plant-disease-detector-pytorch.herokuapp.com/',
				url: "https://api.plant.id/v2/health_assessment",
				method: "POST",
				data: apiData,
				headers: {
					"Content-Type": "application/json",
					"Api-Key": "<--your API key-->",
				},
			})
			console.log(res);
			setData(res.data);
			if (!res.data.is_plant) setIsPlant(false);
			else setIsPlant(true);
		} catch (error) {
			console.log(error);
		}
	}

	const convertBase64 = (file) => {
		if (!file) return;
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			}

			fileReader.onerror = (err) => {
				reject(err);
			}
		})
	}


	const handleSubmit = async (e) => {
		e.preventDefault();


	};

	const arrayToString = (arr) => {
		return arr.join(' ');
	}


	return (
		<>
			<UserHeader username={""} />
			{/* Page content */}
			<Container className="mt--7" fluid>
				<Row>

					<Col className="order-xl-1" xl="12">
						<Card className="bg-secondary shadow">
							<CardHeader className="bg-white border-0">
								<Row className="align-items-center">
									<Col xs="8">
										<h3 className="mb-0">My account</h3>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>

								<h6 className="heading-small text-muted mb-4">Upload Image</h6>
								<div className="d-flex align-items-center justify-content-center pl-lg-4">
									<Form
										className="d-flex flex-column justify-content-center w-50"
										method="POST"
										onSubmit={(e) => {
											handleSubmit(e);
										}}
									>
										<Col lg="12">
											<div className="pl-lg-4">
												<img width='90%' src={photo} alt="jaydip" />
											</div>
										</Col>
										<Col lg="12 mt-5">
											<Input color="info" font="20px" className="btn btn-primary" type="file" onChange={(e) => { uploadImage(e) }}>
												Select Image
											</Input>
										</Col>
									</Form>
								</div>
							</CardBody>
						</Card>
						{
							data
							&&
							<Card className="bg-secondary shadow">
								<CardHeader className="bg-white border-0">
									<Row className="align-items-center">
										<Col xs="8">
											<h3 className="mb-0">Result</h3>
										</Col>
									</Row>
								</CardHeader>
								<CardBody>

									{/* <h6 className="heading-small text-muted mb-4">Data</h6> */}
									<div className="pl-lg-4">

										{(
											!isPlant && !data.health_assessment.diseases[0].disease_details.treatment.biological ?
												<h2>Not a plant</h2>
												:
												<>
													<h2>{data.health_assessment.diseases[0].name}</h2>
													<p>{data.health_assessment.diseases[0].disease_details.treatment.biological && arrayToString(data.health_assessment.diseases[0].disease_details.treatment.biological)}</p>
													<Button color="info" className="btn btn-info"
														onClick={() => {
															window.location.replace(`https://www.google.com/maps/place/?q=nearby farmshop for ${data.health_assessment.diseases[0].name}`)
														}}
													>Nearby shop</Button>
													{/* <Button onClick={() => 
														speak({ text: data.health_assessment.diseases[0].disease_details.treatment.biological ? arrayToString(data.health_assessment.diseases[0].disease_details.treatment.biological):"hello world" })
														// var msg = new SpeechSynthesisUtterance();
														// msg.text = data.health_assessment.diseases[0].disease_details.treatment.biological ? arrayToString(data.health_assessment.diseases[0].disease_details.treatment.biological):"";
														// console.log(window.speechSynthesis)
														// window.speechSynthesis.speak(msg);
													}>Click</Button> */}
												</>
										)}
									</div>
								</CardBody>
							</Card>

						}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default HealthAssessment;
