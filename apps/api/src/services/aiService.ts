import { RagService, KnowledgeSource } from './ragService';

export interface AiResponse {
  text: string;
  isSafe: boolean;
  citation?: string;
}

export class AiService {
  /**
   * Main entry point for the AI Assistant.
   * Integrates RAG retrieval and LLM generation with strict boundaries.
   */
  static async getLegalExplanation(query: string, language: string = 'en'): Promise<AiResponse> {
    const q = query.toLowerCase();
    
    // 1. Boundary Check: Refuse case-specific predictions
    if (this.isCaseSpecific(q)) {
      return this.getFallback(language, 'specific_case');
    }

    try {
      // 2. RAG Retrieval
      const sources = await RagService.retrieveRelevantSources(q);
      
      if (sources.length === 0) {
        return this.getFallback(language, 'no_sources');
      }

      // 3. LLM Generation (Provider Abstraction)
      const provider = process.env.AI_PROVIDER || 'stub';
      let responseText = '';

      if (provider === 'gemini' && process.env.AI_API_KEY) {
        // Implement real Gemini SDK call here
        responseText = `[Gemini] Based on ${sources[0].citation}: ${sources[0].content}`;
      } else {
        // Safe development fallback
        responseText = `[Stub] Based on ${sources[0].citation}: ${sources[0].content}`;
      }

      return {
        text: responseText,
        isSafe: true,
        citation: sources.map(s => s.citation).join(', ')
      };

    } catch (error) {
      console.error('[AI Service Error]', error);
      return this.getFallback(language, 'error');
    }
  }

  private static isCaseSpecific(query: string): boolean {
    return query.includes('my brother') || query.includes('will i get bail') || query.includes('my case');
  }

  private static getFallback(language: string, reason: string): AiResponse {
    const fallbacks: Record<string, { en: string, ta: string }> = {
      specific_case: {
        en: 'I cannot provide legal advice or predict outcomes for a specific case. Please consult with your assigned lawyer.',
        ta: 'ஒரு குறிப்பிட்ட வழக்கிற்கான சட்ட ஆலோசனையை என்னால் வழங்க முடியாது. தயவுசெய்து உங்கள் வழக்கறிஞரை அணுகவும்.'
      },
      no_sources: {
        en: 'I could not find a verified answer to that question in the current legal database.',
        ta: 'தற்போதைய சட்ட தரவுத்தளத்தில் இதற்கு சரிபார்க்கப்பட்ட பதிலைக் கண்டுபிடிக்க முடியவில்லை.'
      },
      error: {
        en: 'The AI service is temporarily unavailable. Please try again later.',
        ta: 'AI சேவை தற்காலிகமாக கிடைக்கவில்லை. தயவுசெய்து பின்னர் மீண்டும் முயற்சிக்கவும்.'
      }
    };

    const langKey = (language === 'ta' ? 'ta' : 'en') as 'en' | 'ta';
    const reasonKey = reason as keyof typeof fallbacks;

    return {
      text: fallbacks[reasonKey][langKey],
      isSafe: reason !== 'specific_case' // We mark case-specific queries as unsafe
    };
  }
}
