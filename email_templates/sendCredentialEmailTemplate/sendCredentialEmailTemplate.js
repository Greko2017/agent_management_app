const sendCredentialEmailTemplate=(props)=>{
    console.log('-- sendCredentialEmailTemplate', props)
    const { message } = props
    var strVar = '' + 
    '<!DOCTYPE html>' + 
    '<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #f1f1f1; margin: 0 auto; padding: 0; height: 100%; width: 100%;">' + 
    '<head>' + 
    '    <meta charset="utf-8"> <!-- utf-8 works for most cases -->' + 
    '    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn\'t be necessary -->' + 
    '    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->' + 
    '    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->' + 
    '    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->' + 
    '' + 
    '    ' + 
    '' + 
    '    <!-- CSS Reset : BEGIN -->' + 
    '    ' + 
    '' + 
    '    <!-- CSS Reset : END -->' + 
    '' + 
    '    <!-- Progressive Enhancements : BEGIN -->' + 
    '    ' + 
    '' + 
    '' + 
    '</head>' + 
    '' + 
    '<body width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #f1f1f1; font-family: \'arial\', sans-serif; font-weight: 400; font-size: 15px; line-height: 1.8; color: rgba(0,0,0,.4); mso-line-height-rule: exactly; background-color: #f1f1f1; margin: 0 auto; height: 100%; width: 100%; padding: 0;">' + 
    '	<center style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; background-color: #f1f1f1;">' + 
    '    <div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: none; font-size: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: arial;">' + 
    '      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;' + 
    '    </div>' + 
    '    <div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width: 600px; margin: 0 auto;" class="email-container">' + 
    '    	<!-- BEGIN BODY -->' + 
    '      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">' + 
    '      	<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">' + 
    '          <td valign="top" class="bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #ffffff; padding: 1em 2.5em 0 2.5em; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">' + 
    '          	<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">' + 
    '          		<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">' + 
    '          			<td class="logo" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: center; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="center">' + 
    `<img src="https://www.equerre.com/assets/img/logo.png" alt="" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-interpolation-mode: bicubic; width: 300px; max-width: 600px; height: auto; margin: auto; display: block; padding-top:3em" width="300">` + 
    '			          </td>' + 
    '          		</tr>' + 
    '          	</table>' + 
    '          </td>' + 
    '	      </tr><!-- end tr -->' + 
    '	      <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">' + 
    '          <td valign="middle" class="hero bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #ffffff; position: relative; z-index: 0; padding: 3em 0 2em 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">' + 
    '            ' + 
    '          </td>' + 
    '	      </tr><!-- end tr -->' + 
    '				<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">' + 
    '          <td valign="middle" class="hero bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #ffffff; position: relative; z-index: 0; padding: 2em 0 4em 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">' + 
    '            <table style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">' + 
    '            	<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">' + 
    '            		<td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">' + 
    '            			<div class="text" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: rgba(0,0,0,.3); padding: 0 2.5em; text-align: center;">' + 
    '            				<h2 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: \'arial\', sans-serif; margin-top: 0; color: #000; font-size: 40px; margin-bottom: 0; font-weight: 400; line-height: 1.4;">Welcome !</h2>' + 
    '            				<h3 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: \'arial\', sans-serif; color: #000000; margin-top: 0; font-size: 24px; font-weight: 300;">'+message+'</h3>' + 
    '                           '+''+'' + 
    '            				<p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"></p>' + 
    '            			</div>' + 
    '            		</td>' + 
    '            	</tr>' + 
    '            </table>' + 
    '          </td>' + 
    '	      </tr><!-- end tr -->' + 
    '      <!-- 1 Column Text + Button : END -->' + 
    '      </table>' + 
    '      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">' + 
    '      	<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">' + 
    '          <td valign="middle" class="bg_light footer email-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: rgba(214, 7, 7, 0.082); padding: 2.5em; border-top: 1px solid rgba(0,0,0,.05); color: rgba(0,0,0,.5); mso-table-lspace: 0pt; mso-table-rspace: 0pt;">' + 
    '            <table style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">' + 
    '            	<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">' + 
    '                <td valign="top" width="33.333%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">' + 
    '                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">' + 
    '                    <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">' + 
    '                      <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: left; padding-right: 6px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="left">' + 
    '                      	<h3 class="heading" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: \'arial\', sans-serif; margin-top: 0; font-weight: 400; color: #000; font-size: 20px;">About</h3>' + 
    '                      	<p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">Equerre is a software solution published by the American company Overxls. The firm, founded in 2014 in the United States of America.</p>' + 
    '                      </td>' + 
    '                    </tr>' + 
    '                  </table>' + 
    '                </td>' + 
    '                <td valign="top" width="33.333%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">' + 
    '                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">' + 
    '                    <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">' + 
    '                      <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: left; padding-left: 5px; padding-right: 5px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="left">' + 
    '                      	<h3 class="heading" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: \'arial\', sans-serif; margin-top: 0; font-weight: 400; color: #000; font-size: 20px;">Contact Info</h3>' + 
    '                      	<ul style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; margin: 0; padding: 0;">' + 
    '					                <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; margin-bottom: 10px;"><span class="text" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">12 Indian Grass CT, Germantown, <br style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">Maryland, USA</span></li>' + 
    '					                <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; margin-bottom: 10px;"><span class="text" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"></span></li>' + 
    '					              </ul>' + 
    '                      </td>' + 
    '                    </tr>' + 
    '                  </table>' + 
    '                </td>' + 
    '                <td valign="top" width="33.333%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">' + 
    '                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">' + 
    '                    <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">' + 
    '                      <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: left; padding-left: 10px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="left">' + 
    '                      	<h3 class="heading" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: \'arial\', sans-serif; margin-top: 0; font-weight: 400; color: #000; font-size: 20px;">Useful Links</h3>' + 
    '                      	<ul style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; margin: 0; padding: 0;">' + 
    '							<li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; margin-bottom: 10px;"><a href="https://www.equerre.com" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; color: rgba(0,0,0,1);">Home</a></li>' + 
    '							<li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; margin-bottom: 10px;"><a href="https://www.equerre.com/about_us" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; color: rgba(0,0,0,1);">About</a></li>' + 
    '							<li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; margin-bottom: 10px;"><a href="https://www.equerre.com/marketplace" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; color: rgba(0,0,0,1);">MarketPlace</a></li>' + 
    '						</ul>' + 
    '                      </td>' + 
    '                    </tr>' + 
    '                  </table>' + 
    '                </td>' + 
    '              </tr>' + 
    '            </table>' + 
    '          </td>' + 
    '        </tr><!-- end: tr -->' + 
    '        <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">' + 
    '          <td class="bg_light" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: rgba(214, 7, 7, 0.082); text-align: center; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="center">' + 
    '          	<p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">Go to your account profile in case you want to <a href="https://www.equerre.com/mentions_legales" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; color: rgba(0,0,0,.8);">Terms & conditions</a></p>' + 
    '          </td>' + 
    '        </tr>' + 
    '      </table>' + 
    '' + 
    '    </div>' + 
    '  </center>' + 
    '</body>' + 
    '</html>' + 
    '';

    return strVar;
}

module.exports = {
    sendCredentialEmailTemplate
}

