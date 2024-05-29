
exports.handler = function (context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  console.log("test/main context:",context);
  console.log("test/main event:",event);
  //event.data to retrieve the data passed via url
  if (event.SpeechResult) {
    const speechResult = event.SpeechResult;
    twiml.say(`You said: ${speechResult}`);
   
  } else {
      // Redirect to the gather input function
      twiml.redirect('/test/voice');
  }

  callback(null, twiml);
};