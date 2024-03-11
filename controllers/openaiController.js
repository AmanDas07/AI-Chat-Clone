import dotenv from "dotenv";
dotenv.config();
import OpenAIApi from "openai";
import Configuration from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const summaryController = async (req, res) => {
    try {
        const { text } = req.body;
        const { data } = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: `Summarize this \n${text}`,
            max_tokens: 500,
            temperature: 0.5,
        });
        if (data) {
            if (data.choices[0].text) {
                return res.status(200).json(data.choices[0].text);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
export const paragraphController = async (req, res) => {
    try {
        const { text } = req.body;
        const { data } = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: `write a detail paragraph about \n${text}`,
            max_tokens: 500,
            temperature: 0.5,
        });
        if (data) {
            if (data.choices[0].text) {
                return res.status(200).json(data.choices[0].text);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
export const chatbotController = async (req, res) => {
    try {
        const { text } = req.body;
        const { data } = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: `Answer question similar to how Bond from James Bond would.
      Me: 'what is your name?'
      bond: 'my name is Bond, James Bond'
      Me: ${text}`,
            max_tokens: 300,
            temperature: 0.7,
        });
        if (data) {
            if (data.choices[0].text) {
                return res.status(200).json(data.choices[0].text);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
export const jsconverterController = async (req, res) => {
    try {
        const { text } = req.body;
        const { data } = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: `/* convert these instruction into javascript code \n${text}`,
            max_tokens: 400,
            temperature: 0.25,
        });
        if (data) {
            if (data.choices[0].text) {
                return res.status(200).json(data.choices[0].text);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
export const scifiImageController = async (req, res) => {
    try {
        const { text } = req.body;
        const { data } = await openai.images.generate({
            prompt: `generate a scifi image of ${text}`,
            n: 1,
            size: "512x512",
        });
        if (data) {
            if (data.data[0].url) {
                return res.status(200).json(data.data[0].url);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};