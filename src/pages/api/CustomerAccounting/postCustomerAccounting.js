export default function handler(req, res) {
    var AWS = require("aws-sdk");
    AWS.config.update({
        region: 'us-west-1',
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        endpoint: new AWS.Endpoint('http://localhost:8000'),
    });
    var docClient = new AWS.DynamoDB.DocumentClient();
        var table = "patientbilling";
        var customer_id = req.body.customerID;//3
        var bill_id = req.body.bill_id;
        var bill_date = req.body.bill_date;
        // var first_name = req.body.first_name;
        // var last_name = req.body.last_name;
        // var visit_id = req.body.visit_id;
        // var patient_id = req.body.patient_id; 
        // var receipt_id = req.body.receipt_id;
        var service_category = req.body.service_category;
        var service_name = req.body.service_name;
        var gross_amount = req.body.gross_amount;
        var discount = req.body.gross_amount;
        var net_amount = req.body.net_amount;
        var discount_reason = req.body.discount_reason;
        var payment_mode = req.body.payment_mode;
        var payment_info = req.body.payment_info;
        var paid_amount = req.body.paid_amount;
        var balance = req.body.balance;
        var returnMessage = "";

        var params = { 
            TableName:table,
            Item:{
                "customer_id" : customer_id,
                "bill_id" : bill_id,
                // "visit_id" : visit_id,
                // "patient_id" : patient_id,
                // "receipt_id" : receipt_id,
                "bill_date" : bill_date,
                "service_details" : {
                    "service_name" : service_name,
                    "service_category" : service_category
                },
                "bill_details" : {
                    "gross_amount" : gross_amount,
                    "discount" : discount,
                    "net_amount" : net_amount,
                },
                "discount_reason" : discount_reason,
                "payment_mode" : payment_mode,
                "payment_info" : payment_info,
                "paid_amount" : paid_amount,
                "balance" : balance
            }
        };  
        try{
            console.log("Posting...");
            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to Post postCustomerAccounting. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("postCustomerAccounting data inserted : ", JSON.stringify(data, null, 2));
                }
            }); 
            var returnMessage = "post Successfully : ";
            res.status(200).json({ returnMessage })
            } catch(err){
                console.log("Error: ", err)
            }
}

