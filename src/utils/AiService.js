import axios from 'axios';


const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY; // Replace with your Hugging Face API key
const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407'; // URL for Mistral-Nemo-Instruct-2407 model

async function getAiResponse(message) {
  try {
    // Set up the payload with the user input
    const data = {
      inputs: message,
    };

    // Make API request to Hugging Face
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      data,
      {
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract the generated response text
    const aiOutput = response.data[0].generated_text.trim(); // Get the generated text
    return aiOutput;
  } catch (error) {
    // Improved error handling for specific errors
    if (error.response && error.response.status === 401) {
      return "Unauthorized: Please check your Hugging Face API key.";
    } else if (error.response && error.response.status === 429) {
      return "Rate limit exceeded: Please try again later.";
    } else {
      console.error('Error:', error);
      return "I'm sorry, I couldn't process your request at the moment. Please try again later.";
    }
  }
}

export { getAiResponse };

