import { Router, Request, Response } from 'express';

const router = Router();

// Mock static rights content for Phase 4 foundation
const rightsData = [
  {
    id: 'r1',
    titleEn: 'Rights During Arrest',
    titleTa: 'கைது செய்யும் போது உள்ள உரிமைகள்',
    contentEn: 'Under Section 50 of the Code of Criminal Procedure, every person arrested has the right to be informed of the grounds of arrest and the right to bail (if the offense is bailable).',
    contentTa: 'கைற்றவியல் நடைமுறைச் சட்டத்தின் 50வது பிரிவின் கீழ், கைது செய்யப்பட்ட ஒவ்வொரு நபருக்கும் கைதுக்கான காரணங்களை அறியவும், பிணைக்கான உரிமையைப் பற்றி அறியவும் உரிமை உண்டு.',
    citation: 'CrPC Section 50',
    tags: ['arrest', 'police']
  },
  {
    id: 'r2',
    titleEn: 'Right to Legal Aid',
    titleTa: 'சட்ட உதவிக்கான உரிமை',
    contentEn: 'Article 39A of the Constitution guarantees free legal aid. If you cannot afford a lawyer, the Legal Services Authority will provide one for you.',
    contentTa: 'அரசியலமைப்பின் 39A வது பிரிவு இலவச சட்ட உதவியை உத்தரவாதப்படுத்துகிறது. உங்களால் வழக்கறிஞரை நியமிக்க முடியாவிட்டால், சட்டப் பணிகள் ஆணைக்குழு உங்களுக்காக ஒருவரை வழங்கும்.',
    citation: 'Constitution Article 39A',
    tags: ['legal_aid', 'court']
  }
];

router.get('/', (req: Request, res: Response) => {
  const lang = (req.query.lang as string) || 'en';
  
  const formattedRights = rightsData.map(r => ({
    id: r.id,
    title: lang === 'ta' ? r.titleTa : r.titleEn,
    content: lang === 'ta' ? r.contentTa : r.contentEn,
    citation: r.citation,
    tags: r.tags
  }));

  res.json({ rights: formattedRights });
});

export default router;
