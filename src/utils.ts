import jwt from 'jsonwebtoken';
export const APP_SECRET: string = 'GraphQL-is-aw3some';

export function getUserId(context): string {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const {userId} = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error('Not authenticated');
}
