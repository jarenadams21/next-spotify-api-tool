// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default async function(req, res) {
  console.log("fetching...")
  // Error-Handling
  if(!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured... {custom path}"
      }
    });
    return;
  }

  const position = req.body.position || '';
  if(position.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter even just one character about how you may feel positionally."
      }
    });
    return;
  }

  // Actual API Call
  try {
    console.log("attempting completion...");
    // Model tuning
    const collapseData = await openai.createCompletion({
      model: "text-davinci-003", 
      prompt: generateCollapse(position),
      temperature: 0.5,
      n: 1,
      presence_penalty: 0.5,
      frequency_penalty: 0.5,
      max_tokens: 500,
    });

   // --> Log the completion, this is the response from the model.
    console.log(collapseData.data);
    console.log("data retrieved...");
    res.status(200).json({ result: collapseData.data.choices[0].text});

    
  } catch(error) {
    // Additional customiazable error handling
    if(error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message:  'An error occured during your request.'
        }
      });
    }
  }
}

function generateCollapse(position) {

    return `Given a user defined position in time, recommend them three songs.
    This position can be related to physical, mental, or any other exisitng properties.
    
    Position: Life is beautiful
    Songs: Retreat! Retreat! by 65daysofstatic, tremolo+delay by toe, That's Git by Olde Pine
    Position: I am struggling over this hard task
    Songs: Caramel Emotion by Forth Wanderers, Float On by Modest Mouse, skiptracing lullaby by Luna Li
    Position: Funky
    Songs: Last Time Lover by Spice Girls, Doo Wop (That Thing) by Ms Lauryn Hill, I THINK by Tyler, The Creator
    Position: Hype 
    Songs: F.U.N by Destroy Lonely, MDMA by Ken Carson, J'OUVERT by BROCKHAMPTON
    Position: Experimental and Curious
    Songs: Paws by Forth Wanderers, ARE WE STILL FRIENDS? by Tyler, The Creator, Born by STRFKR
    Position: ${position}
    Songs:`;
    
}
