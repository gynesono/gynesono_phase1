/**
 * Copyright 2022 GyneSono Technologies or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * 
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
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
};

dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to drop table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Dropped table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
