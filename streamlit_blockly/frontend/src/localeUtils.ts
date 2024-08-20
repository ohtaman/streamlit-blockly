import * as Blockly from "blockly";

// ロケールのリスト
const locales = [
  "ab", "ace", "af", "am", "ar", "ast", "az", "ba", "bcc", "be", "be-tarask",
  "bg", "bn", "br", "bs", "ca", "cdo", "ce", "cs", "da", "de", "diq", "dtp",
  "dty", "ee", "el", "en", "en-gb", "eo", "es", "et", "eu", "fa", "fi", "fo",
  "fr", "frr", "gl", "gn", "gor", "ha", "hak", "he", "hi", "hr", "hrx", "hsb",
  "hu", "hy", "ia", "id", "ig", "inh", "is", "it", "ja", "ka", "kab", "kbd-cyrl",
  "km", "kn", "ko", "ksh", "ku-latn", "ky", "la", "lb", "lki", "lo", "lrc", "lt",
  "lv", "mg", "mk", "ml", "mnw", "ms", "my", "mzn", "nb", "ne", "nl", "oc",
  "olo", "pa", "pl", "pms", "ps", "pt", "pt-br", "ro", "ru", "sc", "sco", "sd",
  "shn", "si", "sk", "skr-arab", "sl", "smn", "sq", "sr", "sr-latn", "sv", "sw",
  "ta", "tcy", "tdd", "te", "th", "ti", "tl", "tlh", "tr", "ug-arab", "uk", "ur",
  "uz", "vi", "xmf", "yo", "zgh", "zh-hans", "zh-hant"
];

// ロケールと翻訳ファイルのマッピングを動的に作成
export const localeMap: Record<string, any> = {};
locales.forEach(locale => {
  try {
    const translation = require(`blockly/msg/${locale}`);
    if (translation) {
      localeMap[locale] = translation;
    }
  } catch (e) {
    console.warn(`Locale ${locale} not found.`);
  }
});

// ロケールの適用関数
export const applyLocale = (locale: string) => {
  const translation = localeMap[locale] || localeMap["en"]; // デフォルトは英語
  if (translation) {
    Blockly.setLocale(translation);
  } else {
    console.error(`Failed to set locale for ${locale}. Defaulting to English.`);
  }
};
