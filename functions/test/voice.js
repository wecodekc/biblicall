exports.handler = function(context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    console.log("test/main context:",context);
    console.log("test/main event:",event);
    const gather = twiml.gather({
        input: 'speech',
        timeout: 5,
        action: '/test/main',
        method: 'POST'  
    });

    gather.say('Please tell us your input after the beep. beep!');

   
    twiml.redirect('/test/voice');

    callback(null, twiml);
};