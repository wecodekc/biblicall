/**
 * 
 * If the user enters something it will trigger the handle-user-input Function and otherwise go in a loop.
 */
exports.handler = function (context, event, callback) {
    const callState = event.callState || 'INITIAL';
    const twiml = new Twilio.twiml.VoiceResponse();

    console.log(`CallState: ${callState}`);

    let msg = 'Tell me a verse or verses you would like to hear from psalms or press one for more options.';

    if(callState === 'TIMEOUT' || callState === 'INVALID_INPUT'){
      msg = `I am sorry, I didn't get that. ${msg}`;
    }

    try{

      const gather = twiml.gather({
        numDigits: 1,
        action: 'handle-user-input',
        hints: 'psalms, chapter, $OOV_CLASS_DIGIT_SEQUENCE, $OOV_CLASS_ORDINAL, $OOV_CLASS_TEMPERATURE',
        input: 'speech dtmf',
        speechTimeout: '3',
      });
      
      gather.say(msg);
      twiml.redirect('/app/start?callState=TIMEOUT');
      
      return callback(null, twiml);
  }catch(error){
    return callback(error);
  }

    callback(null, twiml);
  };