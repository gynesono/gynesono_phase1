export default function handler(req, res) {
    var AWS = require("aws-sdk");
    
    AWS.config.update({
        region: 'us-west-1',
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        endpoint: new AWS.Endpoint('http://localhost:8000'),
    });
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    var tableName = "Patients";
    var customerID=req.body.customerID;
    var PatientID= req.body.PatientID;
    var params = {
        TableName:tableName,
        Key:{
            "Patient_id": PatientID,
            "customer_id":customerID
        },
        ConditionExpression:"Patient_id = :sid AND customer_id = :cid",
        ExpressionAttributeValues: {
            ":sid":PatientID,
            ":cid":customerID
        }
    };
    
    console.log("Attempting a conditional delete...");
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
    }