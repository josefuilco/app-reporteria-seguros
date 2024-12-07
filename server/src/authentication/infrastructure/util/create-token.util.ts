import { sign } from 'jsonwebtoken';

export function createAccessToken(auth: { id: string, office: number, role: number }): string {
  return sign(
    { id: auth.id, office: auth.office, role: auth.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '4h' }
  );
}

export function createRefreshToken(uuid: string): string {
  return sign(
    { id: uuid },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '4h' }
  );
}