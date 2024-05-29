  /**
   * Handles the user input gathered in the voice-ivr Function
   */
  // eslint-disable-next-line consistent-return
  exports.handler = function (context, event, callback) {
    let userInput = event.Digits || event.SpeechResult;
    const twiml = new Twilio.twiml.VoiceResponse();
  
    try{

      if (!userInput) {
        twiml.redirect('/test/voice-ivr?callState=INVALID_INPUT');
        return callback(null, twiml);
      }
    
      if (userInput.length > 1) {
        userInput = '2';
      }

      twiml.say(
        'Thank you! One moment please.'
      );

      switch (userInput) {
        case '1':
          twiml.redirect('/goToManualChapterVerseEntryFunction');
          break;
        case '2':
          twiml.redirect(`/app/start?SpeechResult=${userInput}`);
          break;
        default:
          twiml.redirect('/test/voice-ivr?callState=INVALID_INPUT');
      }

      return callback(null, twiml);

  }catch(error){
    return callback(error);
  }
};