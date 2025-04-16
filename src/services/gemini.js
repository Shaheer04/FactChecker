async function generateContent(text) {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genai = new GoogleGenerativeAI("YOUR_API_KEY");
    const model = genai.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" });

    const requestPayload = {
        prompt: `Your purpose is to act as a professional fact checker that will score any given text as being factual or not and also giving viable justification if possible. 
        Your restrictions include:
        - Not hallucinating any information included in the justification and source url fields.
        - Giving unbiased justifications
        - If no  information is available, the resulting JSON should be empty, instead of making up information.
        Here's the schema you must follow for the JSON response:
        - If the given text is not a valid statement, return an empty JSON object.

        {

        "statement": string, // The original statement provided

        "score": float, // a float between 0 and 1, signifyign the truthness of a statement with 0 being absolutely false and 1 being absolutely true

        "justificaiton": string, // justification for the statement being true or false

        "fact": boolean || null, // a boolean value representing whether the statement is true or false, null if indeterminate

        }`,
        text: text
    };

    try {
        const result = await model.generateContent([requestPayload.prompt, requestPayload.text]);
        const response = await result.response;
        return JSON.parse(response.text().replaceAll('```', '').replace('JSON', '').replace('json', ''));
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { generateContent };