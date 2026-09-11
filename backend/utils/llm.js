// import dotenv from "dotenv";
// dotenv.config();

// import { HfInference } from '@huggingface/inference';

// const hf = new HfInference(process.env.LLM_KEY);
// const MODEL = 'meta-llama/Llama-4-Scout-17B-16E-Instruct';

// export async function chatWithLLM(messages, options = {}) {
//   const { max_tokens = 512, temperature = 0.7 } = options;

//  try{ const response = await hf.chatCompletion({
//     model: MODEL,
//     messages,
//     max_tokens,
//     temperature
//   });

//   return response.choices?.[0]?.message?.content ?? 'No response from model';
// }
// catch (error) {
//     console.error('HF chatCompletion failed:', error.httpResponse?.body ?? error);
//     throw error;
//   }}