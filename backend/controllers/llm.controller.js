// import express from 'express';
// import { chatWithLLM } from '../utils/llm.js';

// export const chat = async(req,res)=>{
//     try{
//        const { message="hello", history = [] } = req.body;
//        const messages = [
// ...history,
// { role: 'user', content: message }
// ];  
   
//   const reply = await chatWithLLM(messages);

//    res.status(200).json({ 
//     success : true,
//     message : "Got the reply" ,
//     reply});
//     console.log("working");
//     }catch(error){
//      console.error('Chat error:', error);
// res.status(500).json({ error: "llm request failed"});
//     }
// }
