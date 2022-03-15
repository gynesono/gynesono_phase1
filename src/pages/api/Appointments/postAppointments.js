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
    var tableName = "Appointments";

    var customerCategory = req.body.customerCategory;
    var customer_id = req.body.customerID;
    var appointmentID = 1;
    var date = req.body.date;
    var time = req.body.time;
    var dateTime = date + time; 
    var patientFirstName = req.body.patientFirstName; 
    var patientLastName = req.body.patientLastName; 
    var patientMobileNumber = req.body.patientMobileNumber; 
    var appointmentRemarks = req.body.appointmentRemarks;
    var appointmentStatus = req.body.appointmentStatus;
    var returnMessage = "";
    var http = require('http');

    var data = {
        counterName: tableName,
        customerID: customer_id
    };

    var dataString = JSON.stringify(data);
    var postheaders = {
        'Content-Type': 'application/json',
        'Content-Length': dataString.length
    };
    var post_requst = {
        host: "localhost",
        port: "3000",
        path: "/api/Utils/getCounterValue",
        method: "POST",
        headers: postheaders
    };
    console.log("calling the request");
    var reqPost = http.request(post_requst, function (res) {
        console.log("statusCode: ", res.statusCode);
        res.on('data', function (d) {
            console.info('POST result:\n');
            process.stdout.write(d);

            console.log("Body--", JSON.parse(d));
            JSON.parse(d).Items.forEach(function (item) {
                //name: 'John Doe'
                appointmentID = parseInt(item.counter_value); 

                console.log("counter_value:", appointmentID + 1);
                appointmentID = appointmentID + 1;
                console.log("Appointment ID", appointmentID);
                var params = {
                    TableName: tableName,
                    Item: {
                        "appointment_id": appointmentID,
                        "customer_id": customer_id,
                        "appointment_date": date,
                        "appointment_time": time,
                        "customer_category": customerCategory,
                        "appointment_status": appointmentStatus,
                        "patient_details": {
                            "patient_first_name": patientFirstName,
                            "patient_last_name": patientLastName,
                            "patient_contact_no": patientMobileNumber,
                            "patient_appointment_remarks": appointmentRemarks
                        }
                    }
                };

                try {
                    console.log("Adding a new appoitnment...");
                    docClient.put(params, function (err, data) {
                        if (err) {
                            console.error("Unable to add appointment. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            console.log("Added item:", JSON.stringify(data, null, 2));
                            returnMessage = JSON.stringify(data, null, 2);
                            
                        }
                    });
                    
                } catch (err) {
                    console.log("Error: ", err)
                }

            });
            console.info('\n\nPOST completed');
        });
    });


    console.log("after the request---");
    reqPost.write(dataString);
    reqPost.end();
   
    reqPost.on('error', function (e) {
        console.error(e);
    });
  
    res.status(200).json("Added Appointment: " + returnMessage);





}