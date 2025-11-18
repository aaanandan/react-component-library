package com.aaanandan.designtokens

/**
 * Main entry point for the Design Tokens module
 *
 * This module provides design tokens generated from Figma using Style Dictionary.
 * All tokens are type-safe and support Material Design 3 theming.
 *
 * ## Usage
 *
 * Import the token objects in your Composables:
 *
 * ```kotlin
 * import com.aaanandan.designtokens.generated.ColorTokens
 * import com.aaanandan.designtokens.generated.SpacingTokens
 *
 * @Composable
 * fun MyComponent() {
 *     Box(
 *         modifier = Modifier
 *             .background(ColorTokens.colorPrimary600)
 *             .padding(SpacingTokens.spacing4)
 *     )
 * }
 * ```
 *
 * ## Token Categories
 *
 * - **ColorTokens** - Color palette with semantic naming
 * - **SpacingTokens** - Consistent spacing scale
 * - **TypographyTokens** - Font sizes and text styles
 * - **BorderRadiusTokens** - Corner radius values
 */
object DesignTokens {
    /**
     * Current version of the design tokens
     */
    const val VERSION = "0.1.0"
}
