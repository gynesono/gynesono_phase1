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

    var tableName = "Patients";
    var patientID = req.body.patientID;
    var customerID = req.body.customerID;

   



    var returnMessage = "";

    
    console.log("patient ID: ", patientID);


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
    var patientMaritalStatus =req.body.patientMaritalStatus;
    var PatientPortalId = 1; 
                   
    var params = {
        TableName: tableName,
        Key: {
            "customer_id": customerID,
            "Patient_id": patientID

        },
        UpdateExpression: "set Patient_portal_consent = :pcnt, patient_details.patient_age = :pa, patient_details.patient_salutation = :sl, patient_details.patient_first_name=:pfn,patient_details.patient_last_name=:pln, patient_details.patient_gender=:pg, patient_details.patient_contact_no=:pm, patient_details.patient_email=:pe, patient_details.patient_husband_name=:phn, patient_details.patient_address=:pad, patient_details.patient_city=:pc, patient_details.patient_state=:ps, patient_details.lmp=:lmpp, patient_details.patient_marital_status=:pms, patient_details.obs_nonobs=:ono",
        ExpressionAttributeValues: {
            ":pcnt":patientPortalConsent,
            ":sl": Salutation,
            ":pfn": patientFirstName,
            ":pln": patientLastName,
            ":pg": patientGender,
            ":pa": patientAge,
            ":pm": patientMobileNumber,
            ":pe": patientEmail,
            ":phn": patientHusbandName,
            ":pad": patientAddress,
            ":pc": patientCity,
            ":ps": patientState,
            ":lmpp": LMP,
            ":pms": patientMaritalStatus,
            ":ono": ObsNonObs
        },
        ReturnValues: "UPDATED_NEW"
    };


    try {
        
        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to get records from table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Fetched information", JSON.stringify(data, null, 2));
                res.json(JSON.stringify(data, null, 2))
            }

        });

    } catch (err) {
        console.log("Error: ", err)
    }
    // res.status(200);

    res.status(200).json("Patient Updated Succesffully: " + returnMessage);
}