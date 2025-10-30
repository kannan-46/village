// import { GoogleGenAI, Type } from "@google/genai";
// import { Column } from '../types';

// // A soft check for the API key to avoid crashing the app, with a console warning.
// if (!process.env.API_KEY) {
//   console.warn("API_KEY environment variable not set. AI features will not work.");
// }

// // Initialize with a bang (!) assuming the check above is sufficient warning,
// // or that it will be provided before the function is called.
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// // This function dynamically builds a response schema for Gemini based on village columns
// const buildResponseSchema = (columns: Column[]) => {
//   const properties: { [key: string]: { type: Type; description: string } } = {};
  
//   columns.forEach(col => {
//     properties[col.id] = {
//       type: col.type === 'number' ? Type.NUMBER : Type.STRING,
//       description: `The value for the column: ${col.name}`,
//     };
//   });

//   return {
//     type: Type.OBJECT,
//     properties,
//   };
// };

// export const parseRecordWithAI = async (promptText: string, columns: Column[]): Promise<Record<string, string | number> | null> => {
//   if (!process.env.API_KEY) {
//     throw new Error("Gemini API key is not configured. Please set the API_KEY environment variable.");
//   }
  
//   const dynamicSchema = buildResponseSchema(columns);
  
//   const instruction = `From the following text, extract the information for each field and return it as a JSON object that strictly conforms to the provided schema. Do not include any explanations, markdown formatting, or extra text. Only the JSON object is allowed. Text: "${promptText}"`;

//   try {
//     const response = await ai.models.generateContent({
//       model: 'gemini-2.5-flash',
//       contents: instruction,
//       config: {
//         responseMimeType: 'application/json',
//         responseSchema: dynamicSchema,
//       },
//     });

//     let jsonText = response.text.trim();
    
//     // Make JSON parsing more robust by stripping potential markdown code blocks
//     if (jsonText.startsWith('```json')) {
//       jsonText = jsonText.substring(7, jsonText.length - 3).trim();
//     } else if (jsonText.startsWith('```')) {
//       jsonText = jsonText.substring(3, jsonText.length - 3).trim();
//     }
    
//     const parsedJson = JSON.parse(jsonText);
    
//     // Coerce types to match schema, as Gemini might return numbers as strings
//     const result: Record<string, string | number> = {};
//     for (const col of columns) {
//       if (parsedJson[col.id] !== undefined && parsedJson[col.id] !== null) {
//         if (col.type === 'number') {
//           const num = Number(parsedJson[col.id]);
//           result[col.id] = isNaN(num) ? 0 : num; // Default to 0 if parsing fails
//         } else {
//           result[col.id] = String(parsedJson[col.id]);
//         }
//       } else {
//         // Ensure all keys exist in the final object, even if AI didn't find them
//         result[col.id] = col.type === 'number' ? 0 : '';
//       }
//     }
    
//     return result;

//   } catch (error) {
//     console.error("Error calling Gemini API or parsing response:", error);
//     if (error instanceof SyntaxError) {
//         // This suggests the response was not valid JSON
//         throw new Error("The AI returned an invalid format. Please try rephrasing your request.");
//     }
//     throw new Error("Failed to parse record with AI. The service may be temporarily unavailable.");
//   }
// };