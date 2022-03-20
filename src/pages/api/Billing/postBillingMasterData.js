export default function handler(req, res) {
    var AWS = require("aws-sdk");
    AWS.config.update({
        region: 'us-west-1',
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        endpoint: new AWS.Endpoint('http://localhost:8000'),
    });
    var docClient = new AWS.DynamoDB.DocumentClient();
        var table = "billingmasterdata";
        var serviceID = 1;
        var customerID = 3;
        var customer_category="Gynecologist";
        var serviceCategory = "Bloodtest";
        var serviceName = "CBC";
        var serviceCost = 1000;
        var returnMessage = "";
        var params = {
            TableName:table,
            Item:{
                "service_id": serviceID,
                "customer_id": customerID,
                "service_category": serviceCategory,
                "service_name" : serviceName,
                "service_cost" : serviceCost,
                "customer_category": customer_category
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