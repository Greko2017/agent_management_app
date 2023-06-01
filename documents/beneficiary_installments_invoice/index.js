module.exports = (body) => {
    const today = new Date();
   //  console.log('body', body)
    const { invoice_seq, beneficiary, installments } = body;
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             } 
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="4">
                      <table>
                         <tr>
                            <td class="title"><img  src="http://localhost:3000/images/logo_heal_care_mission.jpg"
                               style="width:100%; max-width:156px;"></td>
                            <td>
                               Date: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="4">
                      <table>
                         <tr>
                            <td>
                               Beneficiary name: ${beneficiary.first_name}, ${beneficiary.last_name}
                            </td>
                            <td>
                               Receipt number: ${invoice_seq}
                            </td>
                         </tr>
                         <tr>
                            <td>
                               Total instalment Amount: ${installments[0]?.paid_instalment_line.parent?.total_amount || 0} Fcfa
                            </td>
                            <td>
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>

                
                <tr class="heading">
                   <td>Instalment History Code</td>
                   <td style='text-align:left;'>Instalment Name</td>
                   <td>Percentage</td>
                   <td>Amount</td>
                </tr>
                  ${
                     installments.map(instalment=> {
                        return `
                        <tr class="item">
                           <td>${instalment.name}</td>
                           <td  style='text-align:left;'>${instalment.paid_instalment_line.name}</td>
                           <td>${instalment.paid_instalment_line.percentage_of_total_amount} %</td>
                           <td>${instalment.amount_paid} Fcfa</td>
                        </tr>
                        `
                     })
                  }
                <tr class="item">
                   <td></td>
                   <td></td>
                   <td></td>
                   <td>${installments.reduce((acc, curr)=>{acc = parseInt(acc) + parseInt(curr.amount_paid); return acc},0)} Fcfa</td>
                </tr>

             </table>
             <br />
             <br />
             <br />
             <br />
             <br />
             <br />
             <br />
             <h1 class="justify-center">Total price: ${installments.reduce((acc, curr)=>{acc = parseInt(acc) + parseInt(curr.amount_paid); return acc},0)}/${installments[0]?.paid_instalment_line?.parent?.total_amount || 0} Fcfa</h1>
          </div>
       </body>
    </html>
    `;
};