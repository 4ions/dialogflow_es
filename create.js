
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const projectId = 'The Project ID to use, e.g. 'YOUR_GCP_ID';
// const displayName = 'The display name of the intent, e.g. 'MAKE_RESERVATION';
// const trainingPhrasesParts = 'Training phrases, e.g. 'How many people are staying?';
// const messageTexts = 'Message texts for the agent's response when the intent is detected, e.g. 'Your reservation has been confirmed';

// service account import

const { resolve } = require('path');
const { readdir } = require('fs').promises;

const fs = require("fs");
  
let directory_name = "service_account";
  
// Function to get current filenames
// in directory
let filenames = fs.readdirSync(directory_name);
  
const  serviceAccount  = require(`./service_account/${filenames[0]}`);


// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');

const intentsClient = new dialogflow.IntentsClient({ credentials: serviceAccount });

const service = JSON.parse(fs.readFileSync(`./service_account/${filenames[0]}`, 'utf8'));


// ===================================================

async function createFallback(props) {

  const agentPath = intentsClient.projectAgentPath(props.projectId);

  inputContextName = []
  outputContext = []

  props.inputContextNames.forEach(contextName => {
    const context = `projects/${props.projectId}/agent/sessions/-/contexts/${contextName}`
    inputContextName.push(context)
  })

  props.outputContexts.forEach(contextName => {
    const context = {
      name: `projects/${props.projectId}/agent/sessions/-/contexts/${contextName.name}`,
      lifespanCount: contextName.lifespanCount

    }
    outputContext.push(context)
  })

  messages = []

  props.messageTexts.forEach(message => {
    const messageText = {
      text: [message],
    };

    const msg = {
      text: messageText,
    };
    messages.push(msg)
  })
  const intent = {
    displayName: props.displayName,
    action: props.action,
    inputContextNames: inputContextName,
    outputContexts: outputContext,
    messages: messages,
    webhookState: props.webhookState,
    isFallback: true
  };
  const createIntentRequest = {
    parent: agentPath,
    intent: intent,
  };

  // Create the intent
  const [response] = await intentsClient.createIntent(createIntentRequest);
  console.log(`Fallback ${response.name} created`);
}

async function createIntent(props) {

  const projectId = service.project_id
  // Construct request
  // The path to identify the agent that owns the created intent.
  const agentPath = intentsClient.projectAgentPath(projectId);
  const trainingPhrases = [];
  inputContextName = []
  outputContext = []
  
  props.inputContextNames.forEach(contextName => {
    const context = `projects/${props.projectId}/agent/sessions/-/contexts/${contextName}`
    inputContextName.push(context)
  })
  
  props.outputContexts.forEach(contextName => {
    const context = {
      name: `projects/${props.projectId}/agent/sessions/-/contexts/${contextName.name}`,
      lifespanCount: contextName.lifespanCount
      
    }
    outputContext.push(context)
  })
  
  let training = []
  props.trainingPhrasesParts.forEach(trainingPhrasesPart => {
    const part = []

    if (trainingPhrasesPart.includes('{') && trainingPhrasesPart.includes('}')){
      let start = trainingPhrasesPart.indexOf('{')
      let end = trainingPhrasesPart.indexOf('}')

      let entityPhrase = trainingPhrasesPart.split('{')


      entityPhrase.forEach(enty => {
    
        if (enty.includes('}'))
        {
          let temp = enty.split('}')
          training.push(temp[0])
          training.push(temp[1])
        }
        else {
          training.push(enty)
        }
      })


    training.forEach((tra, index) => {

      if (index === 1){
        const littlePart = {
          text: tra,
            "entityType": "@"+props.entity[0],
            "alias": props.entity[1],
            "userDefined": true
        };  
        part.push(littlePart)
      }
      else {
        const littlePart = {
          text: tra,
            "userDefined": false
        };
        part.push(littlePart)

      }
      
      
    })
    }
    else {
      const littlePart = {
        text:trainingPhrasesPart
      }

      part.push(littlePart)
    }
    
    // Here we create a new training phrase for each provided part.
    const trainingPhrase = {
      type: 'EXAMPLE',
      parts: part,
    };
    
    trainingPhrases.push(trainingPhrase);
  });
  messages = []
  
  props.messageTexts.forEach(message => {
    const messageText = {
      text: [message],
    };
    const msg = {
      text: messageText,
    };
    messages.push(msg)
  })
  const intent = {
    displayName: props.displayName,
    trainingPhrases: trainingPhrases,
    action: props.action,
    inputContextNames: inputContextName,
    outputContexts: outputContext,
    messages: messages,
    webhookState: "WEBHOOK_STATE_ENABLED",
  };
  const createIntentRequest = {
    parent: agentPath,
    intent: intent,
  };
  
  if (props.haveFallback) {
    await createFallback({
      projectId: props.projectId,
      displayName: `fallback.${props.displayName}`,
      inputContextNames: props.fallbackContexts,
      outputContexts: [
        {
          "name": props.fallbackContexts[0],
          "lifespanCount": 5
        },
        {
          "name": props.fallbackContexts[1],
          "lifespanCount": 5
        },
      ],
      action: `fallback.${props.action}`,
      messageTexts: props.fallbackMessage,
      webhookState: "WEBHOOK_STATE_ENABLED",
      haveFallback: true,
      fallbackMessage: ['']
    })
  }
  
  // Create the intent
  console.log('-------')
  const [response] = await intentsClient.createIntent(createIntentRequest);
  console.log(`Intent ${response.name} created`);
}


module.exports = {
  createFallback,
  createIntent
}

