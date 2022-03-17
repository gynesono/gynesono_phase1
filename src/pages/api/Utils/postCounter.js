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


export default function handler(req, res) {
    var AWS = require("aws-sdk");
    AWS.config.update({
        region: 'us-west-1',
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        endpoint: new AWS.Endpoint('http://localhost:8000'),
    });
    var docClient = new AWS.DynamoDB.DocumentClient();

    var table = "counter";
    var returnMessage = "";
    var counterName = "receipt";
    var customerId = 3;
    //Get the current counter value for that counterName and customer ID
    //Add it by 1
    var counterValue = 1; 

    var params = {
        TableName:table,
        Item:{
            "counter_name": counterName,
            "customer_id": customerId,
            "counter_value": counterValue 
            }
        };

    console.log("Adding a new item...");
    returnMessage = "Adding a value...";
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
    res.status(200).json({ returnMessage })
}



