// themeUtils.js
import * as Blockly from "blockly";

// Streamlitのテーマに基づいてBlocklyのテーマを生成
export const createBlocklyTheme = (streamlitTheme: any) => {
  return Blockly.Theme.defineTheme('streamlitTheme', {
    'name': 'streamlitTheme',
    'base': Blockly.Themes.Classic,
    'blockStyles': {
      'colour_blocks': {
        'colourPrimary': streamlitTheme.primaryColor,
        'colourSecondary': streamlitTheme.secondaryBackgroundColor,
        'colourTertiary': streamlitTheme.backgroundColor,
      },
      'list_blocks': {
        'colourPrimary': streamlitTheme.primaryColor,
        'colourSecondary': streamlitTheme.secondaryBackgroundColor,
        'colourTertiary': streamlitTheme.backgroundColor,
      },
      'logic_blocks': {
        'colourPrimary': streamlitTheme.primaryColor,
        'colourSecondary': streamlitTheme.secondaryBackgroundColor,
        'colourTertiary': streamlitTheme.backgroundColor,
      },
      'loop_blocks': {
        'colourPrimary': streamlitTheme.primaryColor,
        'colourSecondary': streamlitTheme.secondaryBackgroundColor,
        'colourTertiary': streamlitTheme.backgroundColor,
      },
      'math_blocks': {
        'colourPrimary': streamlitTheme.primaryColor,
        'colourSecondary': streamlitTheme.secondaryBackgroundColor,
        'colourTertiary': streamlitTheme.backgroundColor,
      },
      'text_blocks': {
        'colourPrimary': streamlitTheme.primaryColor,
        'colourSecondary': streamlitTheme.secondaryBackgroundColor,
        'colourTertiary': streamlitTheme.backgroundColor,
      },
      'variable_blocks': {
        'colourPrimary': streamlitTheme.primaryColor,
        'colourSecondary': streamlitTheme.secondaryBackgroundColor,
        'colourTertiary': streamlitTheme.backgroundColor,
      },
      'variable_dynamic_blocks': {
        'colourPrimary': streamlitTheme.primaryColor,
        'colourSecondary': streamlitTheme.secondaryBackgroundColor,
        'colourTertiary': streamlitTheme.backgroundColor,
      },
      'hat_blocks': {
        'colourPrimary': streamlitTheme.primaryColor,
        'colourSecondary': streamlitTheme.secondaryBackgroundColor,
        'colourTertiary': streamlitTheme.backgroundColor,
      },
    },
    'categoryStyles': {
      'colour_category': {
        'colour': streamlitTheme.primaryColor,
      },
      'list_category': {
        'colour': streamlitTheme.primaryColor,
      },
      'logic_category': {
        'colour': streamlitTheme.primaryColor,
      },
      'loop_category': {
        'colour': streamlitTheme.primaryColor,
      },
      'math_category': {
        'colour': streamlitTheme.primaryColor,
      },
      'text_category': {
        'colour': streamlitTheme.primaryColor,
      },
      'variable_category': {
        'colour': streamlitTheme.primaryColor,
      },
      'variable_dynamic_category': {
        'colour': streamlitTheme.primaryColor,
      },
    },
    'componentStyles': {
      'workspaceBackgroundColour': streamlitTheme.backgroundColor,
      'toolboxBackgroundColour': streamlitTheme.secondaryBackgroundColor,
      'toolboxForegroundColour': streamlitTheme.textColor,
      'flyoutBackgroundColour': streamlitTheme.secondaryBackgroundColor,
      'flyoutForegroundColour': streamlitTheme.textColor,
      'flyoutOpacity': 1,
      'scrollbarColour': streamlitTheme.primaryColor,
      'insertionMarkerColour': streamlitTheme.primaryColor,
      'insertionMarkerOpacity': 0.3,
      'scrollbarOpacity': 0.6,
      'cursorColour': streamlitTheme.primaryColor,
    },
    'fontStyle': {
      'family': streamlitTheme.font || 'Arial, sans-serif',
      'weight': 'normal',
    }
  });
};
