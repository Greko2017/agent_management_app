
const pdf = require('html-pdf');
const pdfTemplate = require('../documents/beneficiary_installments_invoice');

module.exports = {
    async generateInvoice(req, res) {
        // console.log('generateInvoice body', req.body)
        pdf.create(pdfTemplate(req.body), {}).toFile(`controllers/generated/${req.body.invoice_seq}.pdf`, (err) => {
            if(err) {
                res.send(Promise.reject());
            }
    
            res.send(Promise.resolve());
        });
    },
    async getInvoice(req, res) {
        let invoice_seq = req.params.invoice_seq
        res.sendFile(`${__dirname}/generated/${invoice_seq}.pdf`)
    },
}