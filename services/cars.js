import carsRepository from '../repositories/cars.js'

const getById = async (id) => {
	const car = await carsRepository.getById(id)
	if (!car) {
		const error = new Error('El auto no se encontro')
		error.status = 404
		throw error
	}
	return car
}
const update = async (id, body) => {
	const car = await carsRepository.update(id, body)
	if (!car) {
		const error = new Error('El auto no se pudo actualizar')
		error.status = 404
		throw error
	}
	return car
}
const create = async (body) => {
	const car = await carsRepository.create(body)
	if (!car) {
		const error = new Error('El auto no se pudo crear')
		error.status = 404
		throw error
	}
	return car
}
const getAll = async () => {
	const cars = await carsRepository.getAll()
	if (!cars) {
		const error = new Error('No se encontraron autos')
		error.status = 404
		throw error
	}
	return cars
}
const remove = async (id) => {
	const car = await carsRepository.remove(id)
	if (!car) {
		const error = new Error('El auto no se pudo eliminar')
		error.status = 404
		throw error
	}
	return car
}

export default { getById, update, create, getAll, remove }
