import rolesRepository from '../repositories/roles.js'
import usersRepository from '../repositories/users.js'
import tokenReponsitory from '../repositories/token.js'
import organizationRepository from '../repositories/organizations.js'
import config from '../config/config.js'
import bcrypt from 'bcrypt'
import { createToken, verifyToken } from '../modules/auth.js'
import { createTemplate } from '../modules/template-email.js'
import { send } from '../modules/email.js'

const register = async (body) => {
	const { email, password, name, lastname, phone } = body
	const emailExists = await isEmailExists(body.email)
	if (emailExists) {
		const error = new Error('El email ya se encuentra registrado')
		error.status = 400
		throw error
	}
	// where 1 is ID of role Standard, Admin is 2
	const standarRole = await rolesRepository.getById(1)
	const newUser = {
		...body,
		roleId: standarRole._id,
		password: await bcrypt.hashSync(body.password, 9)
	}
	const user = await usersRepository.create(newUser)
	if (!user) {
		const error = new Error('No se puede crear el usuario')
		error.status = 400
		throw error
	}
	user.password = null
	const token = await createToken({ email: user.email, _userId: user._id })
	const persistedToken = await tokenReponsitory.create({
		token,
		_userId: user._id
	})
	user.token = persistedToken._id
	await usersRepository.update(user._id, user)
	const organization = await organizationRepository.getById(
		config.organizationId
	)
	const headersEmail = {
		to: user.email,
		subject: 'Bienvenido',
		html: await createTemplate(
			{ organization, user, token, nameApp: config.nameApp.app },
			'welcomeEmailTemplate.ejs'
		)
	}
	const sendingEmail = await send(headersEmail)
	return user
}

const login = async (body) => {
	const { email, password } = body
	const user = await usersRepository.getByEmail(email)
	if (!user) {
		const error = new Error('Email o contraseñas incorrectas')
		error.status = 400
		throw error
	}
	const comparePassword = await bcrypt.compareSync(password, user.password)
	if (!comparePassword) {
		const error = new Error('Email o contraseñas incorrectas')
		error.status = 400
		throw error
	}
	if (!user.isVerified) {
		// Si el email del usuario no fue verificado y el token ya expiro, entonces se envia un nuevo token de confirmacion
		if (!user.token) {
			const token = createToken({ email: user.email, _userId: user._id })
			const tokenSaved = await tokenReponsitory.create({
				_userId: user._id,
				token
			})
			user.token = tokenSaved._id
			await usersRepository.update(user._id, user)
			const organization = await organizationRepository.getById(
				config.organizationId
			)
			const headersEmail = {
				to: user.email,
				subject: 'Confirmar email',
				html: await createTemplate(
					{
						organization,
						user,
						token: token,
						nameApp: config.nameApp.app
					},
					'welcomeEmailTemplate.ejs'
				)
			}
			const sendEmail = await send(headersEmail)
		}
		const error = new Error(
			'Su email aún no fue verificado. Por favor, verifique su casilla de emails.'
		)
		error.status = 403
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
	return { token, user: { name: user.name, roleId: user.roleId } }
}

const getAll = async () => {
	const users = await usersRepository.getAll()
	if (!users) {
		const error = new Error('No se encontraron usuarios')
		error.status = 404
		throw error
	}
	return users
}

const forgotPassword = async (body) => {
	const user = await usersRepository.getByEmail(body.email)
	if (!user) {
		const error = new Error('El email ingresado no se encuentra registrado')
		error.status = 404
		throw error
	}
	const token = createToken({ email: user.email, _userId: user._id })
	const tokenSaved = await tokenReponsitory.create({ _userId: user._id, token })
	user.token = tokenSaved._id
	await usersRepository.update(user._id, user)
	const organization = await organizationRepository.getById(
		config.organizationId
	)
	const headersEmail = {
		to: user.email,
		subject: 'Resetear contraseña',
		html: await createTemplate(
			{
				organization,
				user,
				token: token,
				nameApp: config.nameApp.app
			},
			'forgotPasswordTemplate.ejs'
		)
	}
	const sendEmail = await send(headersEmail)
	return true
}
const isEmailExists = async (email) => await usersRepository.getByEmail(email)

const confirmEmail = async (token) => {
	const decodedToken = await verifyToken(token)
	if (!decodedToken) {
		const error = new Error('El token ingresado no es valido.')
		error.status = 400
		throw error
	}
	const persistedToken = await tokenReponsitory.getToken({
		token,
		_userId: decodedToken._userId
	})
	if (!persistedToken) {
		const error = new Error(
			'El token ingresado no es valido. Por favor, solicite uno nuevo'
		)
		error.status = 404
		throw error
	}

	const user = await usersRepository.getById(decodedToken._userId)
	user.isVerified = true
	await usersRepository.update(user._id, user)
	await tokenReponsitory.remove(persistedToken._id)
	return true
}

const resetPassword = async (token, body) => {
	const { password } = body
	const decodedToken = await verifyToken(token)
	if (!decodedToken) {
		const error = new Error(
			'Solicite un nuevo código para restablecer su contraseña.'
		)
		error.status = 400
		throw error
	}
	const persistedToken = await tokenReponsitory.getToken({
		token,
		_userId: decodedToken._userId
	})
	if (!persistedToken) {
		const error = new Error('El token ingresado ya fue utilizado')
		error.status = 400
		throw error
	}
	const user = await usersRepository.getById(decodedToken._userId)
	if (!user) {
		const error = new Error('El usuario no existe')
		error.status = 400
		throw error
	}
	user.password = await bcrypt.hashSync(password, 9)
	await usersRepository.update(user._id, user)
	await tokenReponsitory.remove(persistedToken._id)
	return true
}

const isValidToken = async (token) => {
	const decodedToken = await verifyToken(token)
	if (!decodedToken) {
		const error = new Error(
			'Solicite un nuevo código para restablecer su contraseña.'
		)
		error.status = 400
		throw error
	}
	const persistedToken = await tokenReponsitory.getToken({ token })
	if (!persistedToken) {
		const error = new Error(
			'El token ingresado no es valido. Por favor, solicite uno nuevo'
		)
		error.status = 400
		throw error
	}
	return true
}
export default {
	register,
	login,
	getAll,
	confirmEmail,
	resetPassword,
	isValidToken,
	forgotPassword
}
