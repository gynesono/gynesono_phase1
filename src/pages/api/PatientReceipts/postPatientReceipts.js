export default function handler(req, res) {
    var AWS = require("aws-sdk");
    AWS.config.update({
        region: 'us-west-1',
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        endpoint: new AWS.Endpoint('http://localhost:8000'),
    });
    var docClient = new AWS.DynamoDB.DocumentClient();
        var table = "patient_receipt";
        var customerID=3;//req.body.customerID
        var receiptID=1;//req.body.receiptID
        var patientID=1;
        var paymentMode="online";//req.body.paymentMode
        var netAmount=1000;//req.body.netAmount
        var discountAmount=200;//req.body.discountAmount
        var returnMessage = "";
        var params = {
            TableName:table,
            Item:{
                "customer_id": customerID,
                "receipt_id": receiptID,
                "patient_id": patientID,
                "payment_mode" : paymentMode,
                "net_amount": netAmount,
                "discount_amount": discountAmount
            }
        };  
        try{
            console.log("Posting...");
            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to Post Billing Data. Error JSON : ", JSON.stringify(err, null, 2));
                } else {
                    console.log("Posting Data : ", JSON.stringify(data, null, 2));
                }
            }); 
            var returnMessage = "data posted : ";
            res.status(200).json({ returnMessage })
            } catch(err){
                console.log("Error: ", err)
            }
}