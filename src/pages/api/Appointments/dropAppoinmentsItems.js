export default function handler(req, res) {
    var AWS = require("aws-sdk");

    AWS.config.update({
        region: 'us-west-1',
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        endpoint: new AWS.Endpoint('http://localhost:8000'),
    });
    var docClient = new AWS.DynamoDB.DocumentClient();

    var tableName = "Appointments";
    var customerID = req.body.customerID;


    var appointmentID = req.body.appointmentID;
    var params = {
        TableName: tableName,
        Key: {
            "appointmentID": appointmentID,
            "customerID": customerID
        },
        ConditionExpression: "appointmentID = :aid AND customerID = :cid",
        ExpressionAttributeValues: {
            ":aid": appointmentID,
            ":cid": customerID
        }
    };

    console.log("Attempting a conditional delete...");
    docClient.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}