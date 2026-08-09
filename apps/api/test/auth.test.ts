import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/db/prisma';
import * as authUtils from '../src/utils/auth';

describe('Auth Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('should return 400 if validation fails', async () => {
      const response = await request(app).post('/api/auth/login').send({
        phoneNumber: '123' // too short
      });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('details');
    });

    it('should return 401 if user not found', async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);

      const response = await request(app).post('/api/auth/login').send({
        phoneNumber: '9876543210',
        password: 'password123'
      });
      
      expect(response.status).toBe(401);
      expect(response.body.error).toMatch(/invalid credentials/i);
    });

    it('should return token if credentials are valid', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({
        id: '1',
        phoneNumber: '9876543210',
        passwordHash: 'hashedpassword',
        role: 'CITIZEN',
        isActive: true
      });
      
      vi.spyOn(authUtils, 'comparePassword').mockResolvedValue(true);
      vi.spyOn(authUtils, 'generateToken').mockReturnValue('mocked-token');

      const response = await request(app).post('/api/auth/login').send({
        phoneNumber: '9876543210',
        password: 'password123'
      });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token', 'mocked-token');
      expect(response.body.user).toMatchObject({ id: '1', role: 'CITIZEN' });
    });
  });
});
