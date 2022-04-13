import rolesRepository from '../repositories/roles.js'
import usersRepository from '../repositories/users.js'
import bcrypt from 'bcrypt'
import filesModule from '../modules/files.js'
import imagesRepository from '../repositories/images.js'

import { createToken } from '../modules/auth.js'

const register = async (body, imageFile) => {
	const emailExists = await isEmailExists(body.email)
	if (emailExists) {
		await removeFile(imageFile)
		const error = new Error('El email ya se encuentra registrado')
		error.status = 400
		throw error
	}

	// where 1 is ID of role Standard, Admin is 2
	// This is harcoded because only database is possible assign a admin
	const standarRole = await rolesRepository.getById(1)
	const newUser = {
		...body,
		roleId: standarRole._id,
		password: await bcrypt.hashSync(body.password, 11)
	}
	const user = await usersRepository.create(newUser)
	if (!user) {
		const error = new Error('No se puede crear el usuario')
		error.status = 400
		throw error
	}
	user.password = ''
	return user
}
const login = async (body) => {
	const user = await usersRepository.getByEmail(body.email)
	if (!user) {
		const error = new Error('Email o contraseñas incorrectas')
		error.status = 404
		throw error
	}
	const comparePassword = await bcrypt.compareSync(body.password, user.password)
	if (!comparePassword) {
		const error = new Error('Email o contraseñas incorrectas')
		error.status = 400
		throw error
	}
	const payload = {
		email: user.email,
		userId: user._id,
		roleId: user.roleId,
		name: user.name,
		lastname: user.lastname
	}
	const token = createToken(payload)
	return { token, user: payload }
}

const getAll = async () => {
	const users = await usersRepository.getAll()
	if (!users) {
		const error = new Error('No se puede encontrar los usuarios')
		error.status = 404
		throw error
	}
	return users
}

const isEmailExists = async (email) => await usersRepository.getByEmail(email)

const removeFile = async (filePath) =>
	await filesModule.deleteLocalFile(filePath)

export default { register, login, getAll }
