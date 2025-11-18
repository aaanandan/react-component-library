module.exports = {
  source: ['design-tokens/tokens/**/*.json'],
  platforms: {
    ios: {
      transformGroup: 'ios',
      buildPath: 'Sources/DesignTokens/Generated/',
      files: [
        {
          destination: 'ColorTokens.swift',
          format: 'ios-swift/class.swift',
          className: 'ColorTokens',
          filter: {
            type: 'color'
          },
          options: {
            import: ['SwiftUI'],
            outputReferences: false
          }
        },
        {
          destination: 'SpacingTokens.swift',
          format: 'ios-swift/class.swift',
          className: 'SpacingTokens',
          filter: {
            type: 'spacing'
          },
          options: {
            import: ['SwiftUI'],
            outputReferences: false
          }
        },
        {
          destination: 'TypographyTokens.swift',
          format: 'ios-swift/class.swift',
          className: 'TypographyTokens',
          filter: (token) => {
            return token.type === 'fontFamily' ||
                   token.type === 'fontSize' ||
                   token.type === 'fontWeight' ||
                   token.type === 'lineHeight';
          },
          options: {
            import: ['SwiftUI'],
            outputReferences: false
          }
        },
        {
          destination: 'BorderRadiusTokens.swift',
          format: 'ios-swift/class.swift',
          className: 'BorderRadiusTokens',
          filter: {
            type: 'borderRadius'
          },
          options: {
            import: ['SwiftUI'],
            outputReferences: false
          }
        },
        {
          destination: 'ShadowTokens.swift',
          format: 'ios-swift/class.swift',
          className: 'ShadowTokens',
          filter: {
            type: 'shadow'
          },
          options: {
            import: ['SwiftUI'],
            outputReferences: false
          }
        }
      ]
    }
  }
};
