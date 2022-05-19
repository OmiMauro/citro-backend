import ejs from 'ejs'
import path from 'path'

export const createTemplate = async (data, nameFile) => {
	const response = await ejs.renderFile(
		path.join(process.cwd(), 'templates', nameFile),
		data
	)
	return response
}
