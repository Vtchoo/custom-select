import { useEffect, useState } from "react"
import Select2 from "./Select"
// import "./styles.css";

interface Car {
	id: number
	name: string
}

export default function App() {

	const [cars, setCars] = useState<Car[]>([
		{ id: 1, name: "Ferrari" },
		{ id: 2, name: "Porsche" },
		{ id: 3, name: "Lamborghini" },
		{ id: 4, name: "Ford" },
		{ id: 5, name: "Chevrolet" },
		{ id: 7, name: "Mitsubishi" },
		{ id: 8, name: "Nissan" },
		{ id: 9, name: "Toyota" },
		{ id: 10, name: "Aston Martin" },
		{ id: 11, name: 'Subaru' },
		{ id: 12, name: 'Alfa Romeo' },
		{ id: 13, name: 'Lexus'}
	]);

	const [car, setCar] = useState<Car>()

	return (
		<div style={{  padding: 10 }}>
			<h1>Custom Select</h1>

			<Select2
				value={car}
				items={cars}
				label={car => car.name}
				onChange={car => setCar(car)}
			/>

			<h4>other text</h4>
			<h4>other text</h4>
			<h4>other text</h4>
			<h4>other text</h4>
			<h4>other text</h4>
			<h4>other text</h4>
		</div>
	)
}
