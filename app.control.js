import express from "express";
import { OpenAI } from "openai";
import { config } from "dotenv";
export const Routers = express();
config();
const openai = new OpenAI({
  apiKey: process.env.API_KY_OPENAI,
});

Routers.post("/inputs", async (req, res) => {
  try {
    console.log(req.body);
    let userInput = req.body.content;
    let q_number = req.body.number;

    if (userInput.length > 600) {
      return res.send(
        "Your content is exeeded the maximum limit. Can you please shrink this content "
      );
    }
    let response
     await openai.chat.completions.create({
      messages: [{ role: "user", content: userInput }],
      model: "gpt-3.5-turbo",
    }).then((res) => {
      response=res
      console.log('Api connected');
    }).catch((err)=>console.log(err));
    let responseData = response.choices[0].message.content;
    console.log(responseData);
    if (responseData) {
      res.json({ chat: responseData, q_no: q_number });
    }
  } catch (error) {
    console.log(error);
  }
});
