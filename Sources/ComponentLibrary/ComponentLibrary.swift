import SwiftUI

/// Main entry point for the Component Library module
///
/// This module provides a comprehensive set of SwiftUI components built on top
/// of the DesignTokens module. All components follow iOS design guidelines and
/// support dynamic type, dark mode, and accessibility features.
///
/// ## Topics
///
/// ### Components
/// - ``DSButton``
/// - ``DSTextField``
/// - ``DSCard``
/// - ``DSBadge``
/// - ``DSAvatar``
///
/// ### View Modifiers
/// - ``DSCardModifier``

public struct ComponentLibrary {
    private init() {}

    /// Current version of the component library
    public static let version = "0.1.0"
}
