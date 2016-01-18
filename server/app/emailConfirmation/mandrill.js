// var mandrill = require('mandrill-api/mandrill');
// var APIkeys = require('../../API_keys.js');
// var mandrill_client = new mandrill.Mandrill(APIkeys.mandrillAPI);

module.exports = {

    sendEmail: function(to_name, to_email, from_name, from_email, subject, message_html) {
        var message = {
            "html": message_html,
            "subject": subject,
            "from_email": from_email,
            "from_name": from_name,
            "to": [{
                "email": to_email,
                "name": to_name
            }],
            "important": false,
            "track_opens": true,
            "auto_html": false,
            "preserve_recipients": true,
            "merge": false,
            "tags": [
                "CatHats_Confirmation_Email"
            ]
        };
        var async = false;
        var ip_pool = "Main Pool";
        mandrill_client.messages.send({
            "message": message,
            "async": async,
            "ip_pool": ip_pool
        }, function(result) {

        }, function(e) {
            // Mandrill returns the error as an object with name and message keys
            console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
            // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
        });
    }

}
