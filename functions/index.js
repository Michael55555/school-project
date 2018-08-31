'use strict';

const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const admin = require('firebase-admin');
const app = dialogflow();
admin.initializeApp(functions.config().firebase);
const db = admin.database();
const REF = db.ref("users/" + conv.user.id + '/task/');

app.intent('task save', conv => {
  let task = conv.parameters.task;
  REF.push().set({
    task: task,
  });
  conv.close('Your task was saved!');
});

app.intent('task query', conv => {
  return REF.orderByKey().on('child_added', snapshot => {
    snapshot.forEach(data => {
      conv.close("Your task is " + data.val());
    });
  });
});

app.intent('user id', conv => {
  conv.close(conv.user.id);
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);