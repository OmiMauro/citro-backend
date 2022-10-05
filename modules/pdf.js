import PDFDocument from 'pdfkit-table'

export const createDocument = async (table) => {
  let document = new PDFDocument({ margin: 30, size: 'A4', bufferPages: true })

  await document.table(table, {
    prepareHeader: () => document.font('Helvetica', 'Arial').fontSize(10),
    prepareRow: (row, indexColumn, indexRow, rectRow) =>
      document.font('Helvetica').fontSize(10),
  })
  return document
}
