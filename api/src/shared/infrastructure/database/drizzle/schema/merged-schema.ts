import { authSchema, publicSchema } from '.';

export const mergeDbdSchema = { ...publicSchema, ...authSchema };
