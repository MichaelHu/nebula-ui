import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const askAiAssistant = async (
  query: string, 
  context: string,
  history: string[] = []
): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // Construct a specific system prompt for the component library context
    const systemPrompt = `
      你是 "Nebula UI" 的专家开发助手，这是一个基于 React + Tailwind CSS 的组件库。
      
      你的目标是根据提供的文档上下文帮助开发人员使用库组件。
      
      上下文 (当前组件文档):
      ${context}
      
      规则:
      1. 回答要简洁实用。
      2. 如果被要求提供代码，请使用 Nebula UI 组件提供 React + TypeScript 代码。
      3. 使用 Tailwind 类进行布局，但对于元素（按钮、卡片、输入框等）请依赖 Nebula UI 组件。
      4. 必须使用中文回答用户的提问。
      5. 如果用户询问与 UI 库无关的内容，请礼貌地将其引导回来。
    `;

    const model = "gemini-2.5-flash";
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `History: ${history.join('\n')}\n\nUser Query: ${query}`,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || "暂时无法生成回复。";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "抱歉，目前连接 Nebula AI 服务时出现问题，请检查您的 API 密钥。";
  }
};