
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is available
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using mock data.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const mockFacts = [
  "Recycling one aluminum can saves enough energy to run a TV for three hours.",
  "The world’s oceans contain nearly 200,000 different kinds of viruses.",
  "A single tree can absorb as much as 48 pounds of carbon dioxide per year.",
  "Bamboo is the fastest-growing woody plant in the world; it can grow up to 35 inches in a single day.",
  "Composting your food scraps can reduce household waste by up to 30%."
];

export const getEnvironmentalFact = async (): Promise<string> => {
  if (!API_KEY) {
    return mockFacts[Math.floor(Math.random() * mockFacts.length)];
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Tell me a single, short, interesting, and positive environmental fact of the day suitable for a learning app for students. Make it concise and easy to understand.',
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching environmental fact from Gemini API:", error);
    return mockFacts[Math.floor(Math.random() * mockFacts.length)];
  }
};
