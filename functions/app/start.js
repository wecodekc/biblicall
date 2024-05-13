const Groq = require('groq-sdk');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
//Make sure to add your TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and GROQ_API to the .env file
exports.handler = async function(context, event, callback) {
  const twiml = new VoiceResponse();
 
  try {
    
    const rolePrompt = "You are a database that only outputs verses from the first book of psalms in the " + 
                       "king james version of the bible. If only one verse is given, you only output that verse. " +
                       "If a range of verses is given you only output that range. If only the book is given, " + 
                       "you only  output the first verse of psalms. You always end your output asking " + 
                       "'PRAISE THE LORD!! Would you like to hear the next verse or a new one?'" + 
                       "Do not output anything other than the verse and the question.";

    const client = new Groq({
      apiKey: process.env.GROQ_API,
    });
    //console.log(event.SpeechResult);
    console.log("Event: ",event);
    console.log("Context:", context);
    const gather = twiml.gather({
        input: 'speech',
        action: '/app/start', 
        speechModel:'phone_call',
        //https://cloud.google.com/speech-to-text/docs/class-tokens
        hints: 'psalms, chapter, $OOV_CLASS_DIGIT_SEQUENCE, $OOV_CLASS_ORDINAL, $OOV_CLASS_TEMPERATURE',
        //enhanced costs extra. turn on when needed.
        //enhanced:true
        speechTimeout: '2'
      });

    if (event.SpeechResult) { // Process gathered text if available
      const result = await client.chat.completions.create({
        messages: [
          {
            role:"assistant",
            content: rolePrompt,
          },
          {
            role: "user",
            content: event.SpeechResult,
          }
        ],
        model: "mixtral-8x7b-32768",
        max_tokens: 500, //250 is max word count for any verse in psalms + prompt ? + user msg ? included?
        temperature: 0.1, 
        top_p: 0.2
      });
      gather.say(result.choices[0].message.content);
    } else { // Gather voice input if no text present
      gather.say('Tell me a verse or verses you would like to hear from psalms.');
    }

    return callback(null, twiml);

  } catch (error) {
    console.error("Error:", error);
    twiml.say("An error occurred while processing the request.");
    return callback(error);
  }
};