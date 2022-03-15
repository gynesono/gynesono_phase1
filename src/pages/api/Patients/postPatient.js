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

import { captureRejectionSymbol } from "events";

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

    var customerCategory = req.body.customerCategory;
    var customer_id = req.body.customerID;
    var PatientID;

    var Salutation = req.body.Salutation;
    var patientFirstName = req.body.patientFirstName; 
    var patientLastName = req.body.patientLastName;
    var patientGender = req.body.patientGender;
    var patientAge = req.body.patientAge;
    var patientMobileNumber = req.body.patientMobileNumber; 
    var patientEmail = req.body.patientEmail;
    var patientHusbandName = req.body.patientHusbandName;
    var patientAddress = req.body.patientAddress;
    var patientCity = req.body.patientCity;
    var patientState = req.body.patientState;
    var patientPortalConsent = req.body.patientPortalConsent;
    var LMP = req.body.LMP;
    var ObsNonObs = req.body.ObsNonObs;
    var patientMaritalStatus = req.body.patientMaritalStatus;
    var PatientPortalId = 1; 
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
              
                PatientID = parseInt(item.counter_value);

                console.log("counter_value:", PatientID + 1);
                PatientID = PatientID + 1;
                console.log("Patient ID", PatientID);
                var params = {
                    TableName: tableName,
                    Item: {
                        "Patient_id": PatientID,
                        "customer_id": customer_id,
                        "Patient_portal_consent": patientPortalConsent,
                        "Patient_portal_id": PatientPortalId,
                        "cutomer_category": customerCategory,
                        "patient_details": {
                            "patient_salutation": Salutation,
                            "patient_first_name": patientFirstName,
                            "patient_last_name": patientLastName,
                            "patient_gender": patientGender,
                            "patient_age": patientAge,
                            "patient_contact_no": patientMobileNumber,
                            "patient_email": patientEmail,
                            "patient_husband_name": patientHusbandName,
                            "patient_address": patientAddress,
                            "patient_city": patientCity,
                            "patient_state": patientState,
                            "lmp": LMP,
                            "patient_marital_status": patientMaritalStatus,
                            "obs_nonobs": ObsNonObs

                        }

                    }
                };

                try {
                    var returnMessage = "Adding Patients";
                    console.log("Adding a new Patients...");
                    docClient.put(params, function (err, data) {
                        if (err) {
                            console.error("Unable to add Patients. Error JSON:", JSON.stringify(err, null, 2));
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
    res.status(200).json("Added Patients: " + returnMessage);



}