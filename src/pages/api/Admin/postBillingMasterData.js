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
    var tableName = "servicemasterdata";
    var customerID = req.body.customerID;
    var serviceCategory = req.body.serviceCategory;
    var serviceName = req.body.serviceName;
    var serviceCost = req.body.serviceCost;
    var returnMessage = ""; 
    var http = require('http');
    var counter=0;
    var params = {
        TableName: tableName,
        KeyConditionExpression: "#cid = :customerid and service_id > :ctr",
        ExpressionAttributeNames: {
            "#cid": "customer_id",
            "#sc": "serviceCategory",
            "#sn": "serviceName"
        },
        ExpressionAttributeValues: {
            ":customerid": customerID,
            ":ctr": counter,
            ":sc": serviceCategory,
            ":sn":serviceName

        },
        FilterExpression: "#sn = :sn AND #sc = :sc"
    };
    try {
        returnMessage = "Fetching the information";
        docClient.query(params, function (err, data) {
            if (err) {
                console.error("Unable to get records from table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Fetched information", JSON.stringify(data, null, 2));
               var count=0;
                var serviceID;
                data.Items.forEach(function(item) {
                    count = count+1;
                    serviceID = parseInt(item.service_id);
                    
                });

                  
                   if (count>0){
                        console.log("Update");
                        var updateParams = {
                            TableName:tableName,
                            Key:{
                                "service_id": serviceID,
                                "customer_id": customerID
                            },
                            UpdateExpression: "set serviceCost = :sc",
                            ExpressionAttributeValues:{
                                ":sc": serviceCost
                                },
                            ReturnValues:"UPDATED_NEW"
                        };
                        returnMessage = "Updated the service cost to "+ serviceCost;
                        docClient.update(updateParams, function(err, data) {
                            if (err) {
                                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                            } else {
                                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                            }
                        });
                        res.status(200).json({ returnMessage })

                   }
                   else
                   {
                        console.log("Add");
                        var data = {
                            counterName: tableName,
                            customerID: customerID
                            };
                            
                            var dataString = JSON.stringify(data);
                            var postheaders = {
                                'Content-Type' : 'application/json',
                                'Content-Length' : dataString.length
                            };
                            var post_requst = {
                                host: "localhost",
                                port: "3000",
                                path: "/api/Utils/getCounterValue",
                                method: "POST",
                                headers: postheaders
                            };
                            console.log("calling the request");
                            
                            var reqPost = http.request(post_requst, function(res) {
                                res.on('data', function(d) {
                                    console.info('POST result:\n');
                                    process.stdout.write(d);
                        
                                    console.log("Body--", JSON.parse(d));
                                    JSON.parse(d).Items.forEach(function(item) {
                                        serviceID = parseInt(item.counter_value); 
                                            
                                        console.log("counter_value:", serviceID+1);
                                        serviceID = serviceID+1;
                                        console.log("Service ID", serviceID);
                                        var params_insert = {
                                            TableName:tableName,
                                            Item:{
                                                "service_id": serviceID,
                                                "customer_id": customerID,
                                                "serviceCategory": serviceCategory,
                                                "serviceName" : serviceName,
                                            "serviceCost" : serviceCost
                                            }
                                        };
                                    
                                        try{
                                            var returnMessage = "Added the service";
                                            console.log("Adding a new ...");
                                            docClient.put(params_insert, function(err, data) {
                                                if (err) {
                                                    console.error("Unable to add . Error JSON:", JSON.stringify(err, null, 2));
                                                } else {
                                                    console.log("Added item:", JSON.stringify(data, null, 2));
                                                    returnMessage = JSON.stringify(data, null, 2);
                                                    
                                                }
                                            }); 
                                           
                                            returnMessage = "Added : ";
                                            
                                            } catch(err){
                                                console.log("Error: ", err)
                                            }
                        
                                    });
                                    console.info('\n\nPOST completed');
                                });
                            });
               
                            console.log("after the request---");
                            reqPost.write(dataString);
                            reqPost.end();
                            reqPost.on('error', function(e) {
                                console.error(e);
                            });
                            res.status(200).json("Added : " + returnMessage);
                     }
             
            }   
        

        });

    } catch (err) {
        console.log("Error: ", err)
    }

        
            
    
        



}

// /**
//  * Copyright 2022 GyneSono Technologies or its affiliates. All Rights Reserved.
//  *
//  * This file is licensed under the Apache License, Version 2.0 (the "License").
//  * You may not use this file except in compliance with the License. A copy of
//  * the License is located at
//  *
//  * 
//  *
//  * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
//  * CONDITIONS OF ANY KIND, either express or implied. See the License for the
//  * specific language governing permissions and limitations under the License.
// */

// export default function handler(req, res) {
//     var AWS = require("aws-sdk");

//     AWS.config.update({
//         region: 'us-west-1',
//         accessKeyId: 'accessKeyId',
//         secretAccessKey: 'secretAccessKey',
//         endpoint: new AWS.Endpoint('http://localhost:8000'),
//     });

//     var docClient = new AWS.DynamoDB.DocumentClient();
//     var tableName = "servicemasterdata";
//     var serviceID ;
//     var customerID = req.body.customerID;
//     var serviceCategory = req.body.serviceCategory;
//     var serviceName = req.body.serviceName;
//     var serviceCost = req.body.serviceCost;
//     var returnMessage = ""; 
//     var http = require('http');
//     var counter=0;
       
//             var data = {
//                 counterName: tableName,
//                 customerID: customerID
//             };
        
            
//             var counter_value;
//             var dataString = JSON.stringify(data);
//             var postheaders = {
//                 'Content-Type' : 'application/json',
//                 'Content-Length' : dataString.length
//             };
//             var post_requst = {
//                 host: "localhost",
//                 port: "3000",
//                 path: "/api/Utils/getCounterValue",
//                 method: "POST",
//                 headers: postheaders
//             };
//             console.log("calling the request");
//             var reqPost = http.request(post_requst, function(res) {
//                 console.log("statusCode: ", res.statusCode);
//                 res.on('data', function(d) {
//                     console.info('POST result:\n');
//                     process.stdout.write(d);
        
//                    console.log("Body--", JSON.parse(d));
//                    JSON.parse(d).Items.forEach(function(item) {
//                     //name: 'John Doe'
//                     serviceID = parseInt(item.counter_value); //JSON.stringify(data)
                          
//                     console.log("counter_value:", serviceID+1);
//                     serviceID = serviceID+1;
//                     console.log("Service ID", serviceID);
//                     var params = {
//                         TableName:tableName,
//                         Item:{
//                             "service_id": serviceID,
//                             "customer_id": customerID,
//                             "serviceCategory": serviceCategory,
//                             "serviceName" : serviceName,
//                            "serviceCost" : serviceCost
//                         }
//                     };
                
//                     try{
//                         var returnMessage = "Adding ";
//                         console.log("Adding a new ...");
//                         docClient.put(params, function(err, data) {
//                             if (err) {
//                                 console.error("Unable to add . Error JSON:", JSON.stringify(err, null, 2));
//                             } else {
//                                 console.log("Added item:", JSON.stringify(data, null, 2));
//                                 returnMessage = JSON.stringify(data, null, 2);
//                                 //res.json(JSON.stringify(data, null, 2));
//                             }
//                         }); 
//                         //const data = await docClient.put(params).promise();
//                         returnMessage = "Added : ";
                        
//                         } catch(err){
//                             console.log("Error: ", err)
//                         }
        
//                 });
//                    console.info('\n\nPOST completed');
//                 });
//             });
           
        
//             // write the json data
//             console.log("after the request---");
//             reqPost.write(dataString);
//             reqPost.end();
//             //console.log("reqPost--", reqPost.stringify);
//             reqPost.on('error', function(e) {
//                 console.error(e);
//             });
//             serviceID = serviceID + 1;
//             // var response = {
//             //     'status': 200,
//             //     'body': JSON.stringify({message: returnMessage})
//             // }
    
//             //return response;
//        res.status(200).json("Added : " + returnMessage);
    
        



// }

