import nodemailer from 'nodemailer-'

import config from '../config/config.js'
const transporter = nodemailer.createTransport({
	host: config.nodemailer.host,
	port: config.nodemailer.port,
	secure: true,
	auth: {
		user: config.nodemailer.user,
		pass: config.nodemailer.pass
	}
})

const send = async ({ to, subject, html, text }) => {
	if (!transporter) {
		return
	}
	const mailToSend = {
		from: config.nodemailer.host,
		to,
		subject,
		html: html,
		text: html ? undefined : text
	}
	try {
		await transporter.sendMail(mailToSend)
	} catch (error) {
		error.message = nodemailerErrorToString(error)
		throw error
	}
}

function nodemailerErrorToString(error) {
	let errorMsg = error.message
	if (error.response) {
		let errorsAsString = ''
		error.response.body.errors.forEach((error) => {
			errorsAsString += `{ message: ${error.message}, field: ${error.field} }, `
		})

		errorMsg = `message: ${error.message}; code: ${error.code}; body: ${errorsAsString}`
	}
	return errorMsg
}

export { transporter, send }
