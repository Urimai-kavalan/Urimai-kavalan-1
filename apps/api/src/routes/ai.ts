import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/rbac';
import { AiService } from '../services/aiService';

const router = Router();

router.post('/chat', requireAuth, async (req: Request, res: Response) => {
  try {
    const { message, language } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await AiService.getLegalExplanation(message, language || 'en');
    
    return res.json({ response });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
