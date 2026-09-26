import en from './en';
import pt from './pt';
import type { Locale } from '../types';

export const messages: Record<Locale, typeof pt> = { pt, en };

export type { MessageTree } from './pt';
