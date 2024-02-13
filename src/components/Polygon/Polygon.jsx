import React, { Component } from "react";
import "./Polygon.styles.css";

export default class Polygon extends Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	state = {
		angleAmount: 4,
		length: 100,
		coordinatesArrays: [],
		amountOfSteps: 100,
	};

	formPolygon = (angleAmount) => {
		const canvas = this.canvasRef.current;
		const context = canvas.getContext("2d");
		const { coordinatesArrays, length } = this.state;
		context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width, canvas.height);

		const polygon = new Path2D();
		const polygonDegreesStep = 360 / angleAmount;
		const initialPointX = canvas.width / 2;
		const initialPointY = canvas.height / 2;
		let newX, newY;
		let polygonDegrees;
		for (let i = 0; i < angleAmount; i++) {
			polygonDegrees = i * polygonDegreesStep;
			newX = length * Math.sin((Math.PI / 180) * polygonDegrees) + initialPointX;
			newY = length * -Math.cos((Math.PI / 180) * polygonDegrees) + initialPointY;
			this.setState({ coordinatesArrays: coordinatesArrays.push([newX, newY]) });
			if (i === 0) {
				polygon.moveTo(newX, newY);
			} else {
				polygon.lineTo(newX, newY);
			}
		}
		polygon.closePath();
		context.strokeStyle = "white";
		context.stroke(polygon);
	};

	coordinateCalculating = () => {
		let { coordinatesArrays, amountOfSteps } = this.state;

		const firstX = coordinatesArrays[0][0];
		const secondX = coordinatesArrays[1][0];
		const firstY = coordinatesArrays[0][1];
		const secondY = coordinatesArrays[1][1];

		coordinatesArrays.splice(0, 2);
		let stepX, stepY;
		let xCoefficient = [firstX / (firstX + secondX), secondX / (firstX + secondX)];
		let yCoefficient = [firstY / (firstY + secondY), secondY / (firstY + secondY)];
		let xPointCoordinate = (firstX + secondX) * xCoefficient;
		let yPointCoordinate = (firstY + secondY) * yCoefficient;
		let coordinatesForPoint = [];
		coordinatesForPoint.push([xPointCoordinate, yPointCoordinate]);
		this.setState({ coordinatesArrays: coordinatesArrays });
		for (amountOfSteps; amountOfSteps === 0; amountOfSteps--) {
			stepX = (secondX - firstX)/(secondX + firstX) * amountOfSteps;
			stepY = (secondY - firstY)/(secondY + firstY) * amountOfSteps;
			xCoefficient = xCoefficient + stepX;
			yCoefficient = yCoefficient + stepY;
			xPointCoordinate = (firstX + secondX) * xCoefficient;
			yPointCoordinate = (firstX + secondX) * xCoefficient;
			coordinatesForPoint.push([xPointCoordinate, yPointCoordinate]);
		}
		this.drawPoint(coordinatesForPoint);
	};

	drawPoint = (coordinatesArray) => {
		const canvas = this.canvasRef.current;
		const context = canvas.getContext("2d");
		const point = new Path2D();

		point.arc()
	}

	show = (thing) => {
		console.log(thing);
	}
	componentDidMount() {
		this.formPolygon(this.state.angleAmount);
	}

	componentWillUnmount() {
		this.show(this.state.coordinatesArrays);
	}

	render() {
		return (
			<div>
				<div className="polygon">

					<canvas ref={this.canvasRef} width="800" height="600"></canvas>

				</div>
			</div>

		);
	}
}