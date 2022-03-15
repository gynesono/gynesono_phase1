var AWS = require("aws-sdk");

AWS.config.update({
    region: 'us-west-1',
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    endpoint: new AWS.Endpoint('http://localhost:8000'),
});

var dynamodb = new AWS.DynamoDB();
//AWS.config.update({accessKeyId: "fakeMyKeyId", secretAccessKey: "fakeSecretAccessKey", region: "REGION"});

var params = {
    TableName : "patient_receipt",
    KeySchema: [       
        { AttributeName: "customer_id", KeyType: "HASH"},  //Partition key
        { AttributeName: "receipt_id", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "customer_id", AttributeType: "N" },
        { AttributeName: "receipt_id", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});


















// var AWS = require("aws-sdk");

// AWS.config.update({
//     region: 'us-west-1',
//     accessKeyId: 'accessKeyId',
//     secretAccessKey: 'secretAccessKey',
//     endpoint: new AWS.Endpoint('http://localhost:8000'),
// });

// var dynamodb = new AWS.DynamoDB();
// //AWS.config.update({accessKeyId: "fakeMyKeyId", secretAccessKey: "fakeSecretAccessKey", region: "REGION"});

// var params = {
//     TableName : "billingmasterdata",
//     KeySchema: [       
//         { AttributeName: "serviceID", KeyType: "HASH"},  //Partition key
//         { AttributeName: "customerID", KeyType: "RANGE" }  //Sort key
//     ],
//     AttributeDefinitions: [       
//         { AttributeName: "serviceID", AttributeType: "N" },
//         { AttributeName: "customerID", AttributeType: "N" }
//     ],
//     ProvisionedThroughput: {       
//         ReadCapacityUnits: 10, 
//         WriteCapacityUnits: 10
//     }
// };
// dynamodb.createTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });


