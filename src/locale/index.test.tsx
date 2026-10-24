import { describe, expect, it } from 'vite-plus/test';
import en from './en.json';
import zh from './zh.json';

describe('locale files', () => {
  it('have matching keys in en and zh', () => {
    const enKeys = Object.keys(en).toSorted();
    const zhKeys = Object.keys(zh).toSorted();
    expect(zhKeys).toEqual(enKeys);
  });

  it('include core navigation keys', () => {
    expect(en['nav.about']).toBe('About Me');
    expect(zh['nav.about']).toBeTruthy();
  });
});
