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
    var tableName = "Patient_Visit";

    var customerCategory = "Gynecologist";
    var customer_id=3;
    var visit_id;
    var visit_date="14/2/2022";
    var patient_id=2;
    var serviceCategory="Blood Test";
    var serviceName="CBC";
    var natureOfVisit="Non Obs";
    var weight=70;
    var bp="80/120";
    var familyHistory="";
    var clinicalRemarks="Second Visit for Shilpi";
    var reffered_DC_Blood_Id;
    var reffered_DC_Sono_Id;
    var customer_Refer_Id=3;
    var billing_amount=425;
    var dc_Pending="";
  
    var returnMessage = ""; 
    var http = require('http');
        
            var data = {
                counterName: tableName,
                customerID: customer_id
            };
        
            
            var counter_value;
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
                console.log("statusCode: ", res.statusCode);
                res.on('data', function(d) {
                    console.info('POST result:\n');
                    process.stdout.write(d);
        
                   console.log("Body--", JSON.parse(d));
                   JSON.parse(d).Items.forEach(function(item) {
                    
                    visit_id = parseInt(item.counter_value); //JSON.stringify(data)
                          
                   // console.log("counter_value:", visit_id);
                    visit_id = visit_id+1;
                    console.log("Patient Visit ID", visit_id);
                    var params = {
                        TableName:tableName,
                        Item:{
                            "visit_id": visit_id, 
                            "patient_id": patient_id,
                            "customer_id": customer_id,
                            "visit_date": visit_date,
                            "service_category": serviceCategory,
                            "service_name": serviceName,
                            "nature_Of_Visit":natureOfVisit,
                            "clinical_Remarks":{
                                "weight": weight,
                                "bp": bp,
                                "family_history": familyHistory,
                                "clinical_Remarks": clinicalRemarks,
                            },
                            "blood_test":{},
                            "usg":{},
                            "reffered_dc_blood_Id":reffered_DC_Blood_Id,
                            "reffered_dc_sono-Id":reffered_DC_Sono_Id,
                            "customer_refer_Id":customer_Refer_Id,
                            "billing_amount":billing_amount,
                            "dc_Pending":dc_Pending,
                            "customer_category":customerCategory
                        }
                    };
                
                    try{
                        //var returnMessage = "Adding Appointment";
                        console.log("Adding Patient Visit...");
                        docClient.put(params, function(err, data) {
                            if (err) {
                                console.error("Unable to add Visit. Error JSON:", JSON.stringify(err, null, 2));
                            } else {
                                console.log("Added Visit:", JSON.stringify(data, null, 2));
                                returnMessage = JSON.stringify(data, null, 2);
                                
                            }
                        }); 
                        
                        returnMessage = "Added Visit: ";
                        
                        } catch(err){
                            console.log("Error: ", err)
                        }
        
                });
                   console.info('\n\nPOST completed');
                });
            });
           
        
            // write the json data
            console.log("after the request---");
            reqPost.write(dataString);
            reqPost.end();
            
            reqPost.on('error', function(e) {
                console.error(e);
            });
            patient_Visit_ID = patient_Visit_ID + 1;

       res.status(200).json("Added Patient Visit : " + returnMessage);

}
