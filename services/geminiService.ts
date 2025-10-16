
import { GoogleGenAI } from "@google/genai";
import type { PurchaseOrder, Supplier, Item } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateProcurementAnalysis = async (
  prompt: string,
  purchaseOrders: PurchaseOrder[],
  suppliers: Supplier[],
  items: Item[]
): Promise<string> => {
  if (!API_KEY) {
    return "AI service is not available. Please configure the API_KEY environment variable.";
  }

  const model = 'gemini-2.5-pro';

  const context = `
    You are an expert AI Procurement Analyst integrated into an ERP system.
    Your task is to provide insightful analysis based on the company's purchasing data.
    Be concise, professional, and data-driven in your responses.
    
    Here is the current data:
    - Total Purchase Orders: ${purchaseOrders.length}
    - Total Suppliers: ${suppliers.length}
    - Total Items: ${items.length}
    
    Full Data (JSON format):
    Purchase Orders: ${JSON.stringify(purchaseOrders.slice(0, 10), null, 2)}
    Suppliers: ${JSON.stringify(suppliers.slice(0, 10), null, 2)}
    Items: ${JSON.stringify(items.slice(0, 10), null, 2)}
    (Note: Data is truncated for brevity)
  `;

  const fullPrompt = `
    ${context}

    ---
    User Request: "${prompt}"
    ---
    
    Please provide your analysis based on the data provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while communicating with the AI. Please check the console for details.";
  }
};
