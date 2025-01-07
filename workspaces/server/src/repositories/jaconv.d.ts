// types/jaconv.d.ts

declare module 'jaconv' {
  /**
   * 半角・全角変換時にどの文字種を変換対象とするかを指定します
   */
  interface ConvertOptions {
    /** 数字（0-9, ０-９）を変換対象に含めるかどうか */
    digit?: boolean;
    /** ラテン文字（A-Z, a-z, Ａ-Ｚ, ａ-ｚ）を変換対象に含めるかどうか */
    latin?: boolean;
    /** カタカナ・ひらがなを変換対象に含めるかどうか */
    kana?: boolean;
  }

  /**
   * toWide() / toHan() 用のオプション
   */
  interface ToWideOptions {
    convert?: ConvertOptions;
  }

  interface ToHanOptions {
    convert?: ConvertOptions;
  }

  /**
   * 半角 → 全角への変換
   * @param str 変換対象の文字列
   * @param options 変換オプション
   */
  export function toWide(str: string, options?: ToWideOptions): string;

  /**
   * 全角 → 半角への変換
   * @param str 変換対象の文字列
   * @param options 変換オプション
   */
  export function toHan(str: string, options?: ToHanOptions): string;

  /**
   * ひらがな → カタカナへの変換
   * @param str 変換対象の文字列
   */
  export function toKatakana(str: string): string;

  /**
   * カタカナ → ひらがなへの変換
   * @param str 変換対象の文字列
   */
  export function toHiragana(str: string): string;

  /**
   * 英文等の先頭文字を大文字化する
   * @param str 変換対象の文字列
   */
  export function capitalize(str: string): string;

  /**
   * 英文等の大文字/小文字を反転する
   * @param str 変換対象の文字列
   */
  export function swapCase(str: string): string;

  /**
   * 既存の関数をまとめたデフォルトエクスポート
   */
  const jaconv: {
    toZen: typeof toWide;
    toHan: typeof toHan;
    toKatakana: typeof toKatakana;
    toHiragana: typeof toHiragana;
    capitalize: typeof capitalize;
    swapCase: typeof swapCase;
  };

  export default jaconv;
}
