import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth';
import rightsRoutes from './routes/rights';
import casesRoutes from './routes/cases';
import aiRoutes from './routes/ai';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Trust the nginx reverse proxy so express-rate-limit can correctly
// identify client IPs from X-Forwarded-For headers.
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://app.urimaikaavalan.gov.in' : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting
// Note: validate.trustProxy is set to false to suppress express-rate-limit v8's
// strict ERR_ERL_UNEXPECTED_X_FORWARDED_FOR check when behind a Docker/nginx proxy.
// The 'trust proxy' setting on line 15 already handles proxy trust correctly.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false },
});
app.use('/api/', limiter);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rights', rightsRoutes);
app.use('/api/cases', casesRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Centralized error handler
app.use(errorHandler);

export default app;
