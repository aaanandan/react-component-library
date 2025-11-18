import SwiftUI

/// Main entry point for the Design Tokens module
///
/// This module provides design tokens generated from Figma using Style Dictionary.
/// All tokens are type-safe and support both light and dark color schemes.
///
/// ## Topics
///
/// ### Token Classes
/// - ``ColorTokens``
/// - ``SpacingTokens``
/// - ``TypographyTokens``
/// - ``BorderRadiusTokens``
/// - ``ShadowTokens``

public struct DesignTokens {
    private init() {}

    /// Current version of the design tokens
    public static let version = "0.1.0"
}
