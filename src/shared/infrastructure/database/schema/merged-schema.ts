import { authSchema, publicSchema } from '.';

export const mergedSchema = { ...publicSchema, ...authSchema };
