module.exports = {
  source: ['design-tokens/tokens/**/*.json'],
  platforms: {
    android: {
      transformGroup: 'android',
      buildPath: 'design-tokens/src/main/java/com/aaanandan/designtokens/generated/',
      files: [
        {
          destination: 'ColorTokens.kt',
          format: 'compose/colors',
          filter: (token) => token.type === 'color'
        },
        {
          destination: 'SpacingTokens.kt',
          format: 'compose/spacing',
          filter: (token) => token.type === 'spacing'
        },
        {
          destination: 'TypographyTokens.kt',
          format: 'compose/typography',
          filter: (token) => token.type === 'fontSize'
        },
        {
          destination: 'BorderRadiusTokens.kt',
          format: 'compose/borderRadius',
          filter: (token) => token.type === 'borderRadius'
        }
      ]
    }
  },
  hooks: {
    formats: {
      'compose/colors': function({ dictionary }) {
        const colors = dictionary.allTokens.filter(token => token.type === 'color');

        let output = `package com.aaanandan.designtokens.generated

import androidx.compose.ui.graphics.Color

/**
 * Design token colors generated from Figma
 * DO NOT EDIT - This file is auto-generated
 */
object ColorTokens {
`;

        colors.forEach(token => {
          const name = token.name
            .split('-')
            .map((word, index) =>
              index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join('');
          const hexValue = token.value.toUpperCase();

          output += `    val ${name} = Color(0xFF${hexValue.replace('#', '')})\n`;
        });

        output += `}\n`;
        return output;
      },
      'compose/spacing': function({ dictionary }) {
        const spacing = dictionary.allTokens.filter(token => token.type === 'spacing');

        let output = `package com.aaanandan.designtokens.generated

import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Design token spacing values generated from Figma
 * DO NOT EDIT - This file is auto-generated
 */
object SpacingTokens {
`;

        spacing.forEach(token => {
          const name = token.name
            .split('-')
            .map((word, index) =>
              index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join('');

          output += `    val ${name}: Dp = ${token.value}.dp\n`;
        });

        output += `}\n`;
        return output;
      },
      'compose/typography': function({ dictionary }) {
        const typography = dictionary.allTokens.filter(token => token.type === 'fontSize');

        let output = `package com.aaanandan.designtokens.generated

import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.sp

/**
 * Design token typography values generated from Figma
 * DO NOT EDIT - This file is auto-generated
 */
object TypographyTokens {
`;

        typography.forEach(token => {
          const name = token.name
            .split('-')
            .map((word, index) =>
              index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join('');

          output += `    val ${name}: TextUnit = ${token.value}.sp\n`;
        });

        output += `}\n`;
        return output;
      },
      'compose/borderRadius': function({ dictionary }) {
        const borderRadius = dictionary.allTokens.filter(token => token.type === 'borderRadius');

        let output = `package com.aaanandan.designtokens.generated

import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Design token border radius values generated from Figma
 * DO NOT EDIT - This file is auto-generated
 */
object BorderRadiusTokens {
`;

        borderRadius.forEach(token => {
          const name = token.name
            .split('-')
            .map((word, index) =>
              index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join('');

          output += `    val ${name}: Dp = ${token.value}.dp\n`;
        });

        output += `}\n`;
        return output;
      }
    }
  }
};
