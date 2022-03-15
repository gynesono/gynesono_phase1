export default function handler(req, res) {
var AWS = require("aws-sdk");

AWS.config.update({
    region: 'us-west-1',
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    endpoint: new AWS.Endpoint('http://localhost:8000'),
});
var docClient = new AWS.DynamoDB.DocumentClient();

var tableName = "servicemasterdata";
var customerID=req.body.customerID;
var serviceID= req.body.serviceID;
var params = {
    TableName:tableName,
    Key:{
        "service_id": serviceID,
        "customer_id":customerID
    },
    ConditionExpression:"service_id = :sid AND customer_id = :cid",
    ExpressionAttributeValues: {
        ":sid":serviceID,
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