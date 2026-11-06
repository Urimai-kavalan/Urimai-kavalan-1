import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/db/prisma';
import * as authUtils from '../src/utils/auth';

const p = prisma as any;

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
      p.user.findUnique.mockResolvedValue(null);

      const response = await request(app).post('/api/auth/login').send({
        phoneNumber: '9876543210',
        password: 'password123'
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toMatch(/invalid credentials/i);
    });

    it('should return 401 when no password is supplied', async () => {
      p.user.findUnique.mockResolvedValue({
        id: '1', phoneNumber: '9876543210', passwordHash: 'hashedpassword', role: 'CITIZEN', isActive: true
      });

      const response = await request(app).post('/api/auth/login').send({ phoneNumber: '9876543210' });

      expect(response.status).toBe(401);
    });

    it('should return token if credentials are valid', async () => {
      p.user.findUnique.mockResolvedValue({
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

  describe('POST /api/auth/register', () => {
    const valid = { phoneNumber: '9123456780', password: 'a-strong-pass' };

    it('rejects an invalid phone number', async () => {
      const res = await request(app).post('/api/auth/register').send({ ...valid, phoneNumber: '5123456780' });
      expect(res.status).toBe(400);
    });

    it('rejects a short password', async () => {
      const res = await request(app).post('/api/auth/register').send({ ...valid, password: 'short' });
      expect(res.status).toBe(400);
    });

    it('returns 409 when the number is already registered', async () => {
      p.user.findUnique.mockResolvedValue({ id: 'existing' });
      const res = await request(app).post('/api/auth/register').send(valid);
      expect(res.status).toBe(409);
      expect(p.user.create).not.toHaveBeenCalled();
    });

    it('returns 409 when two signups race for the same number', async () => {
      p.user.findUnique.mockResolvedValue(null);
      vi.spyOn(authUtils, 'hashPassword').mockResolvedValue('hashed');
      p.user.create.mockRejectedValue({ code: 'P2002' });
      const res = await request(app).post('/api/auth/register').send(valid);
      expect(res.status).toBe(409);
    });

    it('creates a CITIZEN even if the caller asks for another role', async () => {
      p.user.findUnique.mockResolvedValue(null);
      vi.spyOn(authUtils, 'hashPassword').mockResolvedValue('hashed');
      vi.spyOn(authUtils, 'generateToken').mockReturnValue('mocked-token');
      p.user.create.mockResolvedValue({ id: 'new-1', phoneNumber: valid.phoneNumber, role: 'CITIZEN', districtId: null });

      const res = await request(app).post('/api/auth/register').send({ ...valid, role: 'SYS_ADMIN' });

      expect(res.status).toBe(201);
      const data = p.user.create.mock.calls[0][0].data;
      expect(data.role).toBe('CITIZEN');
      expect(data.passwordHash).toBe('hashed');
      expect(data).not.toHaveProperty('password');
      expect(res.body.token).toBe('mocked-token');
      expect(res.body.user).toMatchObject({ id: 'new-1', role: 'CITIZEN' });
    });
  });
});