import SwiftUI
import DesignTokens

/// A customizable button component with multiple styles and sizes
///
/// `DSButton` provides a consistent button interface across your app with
/// support for different visual styles, sizes, and states.
///
/// ## Example
///
/// ```swift
/// DSButton(
///     title: "Submit",
///     style: .primary,
///     size: .medium
/// ) {
///     print("Button tapped")
/// }
/// ```
public struct DSButton: View {
    // MARK: - Properties

    private let title: String
    private let style: DSButtonStyle
    private let size: DSButtonSize
    private let isDisabled: Bool
    private let isLoading: Bool
    private let action: () -> Void

    // MARK: - Initialization

    /// Creates a new button with the specified configuration
    ///
    /// - Parameters:
    ///   - title: The text to display on the button
    ///   - style: The visual style of the button (default: `.primary`)
    ///   - size: The size of the button (default: `.medium`)
    ///   - isDisabled: Whether the button is disabled (default: `false`)
    ///   - isLoading: Whether to show a loading indicator (default: `false`)
    ///   - action: The action to perform when the button is tapped
    public init(
        title: String,
        style: DSButtonStyle = .primary,
        size: DSButtonSize = .medium,
        isDisabled: Bool = false,
        isLoading: Bool = false,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.style = style
        self.size = size
        self.isDisabled = isDisabled
        self.isLoading = isLoading
        self.action = action
    }

    // MARK: - Body

    public var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: style.foregroundColor))
                }

                Text(title)
                    .font(size.font)
                    .fontWeight(.semibold)
            }
            .foregroundColor(style.foregroundColor)
            .padding(.horizontal, size.horizontalPadding)
            .padding(.vertical, size.verticalPadding)
            .background(style.backgroundColor)
            .cornerRadius(8)
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(style.borderColor, lineWidth: style.borderWidth)
            )
        }
        .disabled(isDisabled || isLoading)
        .opacity(isDisabled ? 0.5 : 1.0)
    }
}

// MARK: - Button Style

/// Visual styles for DSButton
public enum DSButtonStyle {
    case primary
    case secondary
    case outline
    case ghost
    case destructive

    var backgroundColor: Color {
        switch self {
        case .primary:
            return Color(hex: "#2563eb") // primary-600
        case .secondary:
            return Color(hex: "#f5f5f5") // neutral-100
        case .outline, .ghost:
            return .clear
        case .destructive:
            return Color(hex: "#dc2626") // error-600
        }
    }

    var foregroundColor: Color {
        switch self {
        case .primary, .destructive:
            return .white
        case .secondary:
            return Color(hex: "#171717") // neutral-900
        case .outline, .ghost:
            return Color(hex: "#2563eb") // primary-600
        }
    }

    var borderColor: Color {
        switch self {
        case .outline:
            return Color(hex: "#2563eb") // primary-600
        case .primary, .secondary, .ghost, .destructive:
            return .clear
        }
    }

    var borderWidth: CGFloat {
        switch self {
        case .outline:
            return 1
        case .primary, .secondary, .ghost, .destructive:
            return 0
        }
    }
}

// MARK: - Button Size

/// Size variants for DSButton
public enum DSButtonSize {
    case small
    case medium
    case large

    var font: Font {
        switch self {
        case .small:
            return .system(size: 14)
        case .medium:
            return .system(size: 16)
        case .large:
            return .system(size: 18)
        }
    }

    var horizontalPadding: CGFloat {
        switch self {
        case .small:
            return 12
        case .medium:
            return 16
        case .large:
            return 20
        }
    }

    var verticalPadding: CGFloat {
        switch self {
        case .small:
            return 8
        case .medium:
            return 12
        case .large:
            return 16
        }
    }
}

// MARK: - Color Extension

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Previews

#Preview("Button Styles") {
    VStack(spacing: 16) {
        DSButton(title: "Primary", style: .primary) {}
        DSButton(title: "Secondary", style: .secondary) {}
        DSButton(title: "Outline", style: .outline) {}
        DSButton(title: "Ghost", style: .ghost) {}
        DSButton(title: "Destructive", style: .destructive) {}
    }
    .padding()
}

#Preview("Button Sizes") {
    VStack(spacing: 16) {
        DSButton(title: "Small", size: .small) {}
        DSButton(title: "Medium", size: .medium) {}
        DSButton(title: "Large", size: .large) {}
    }
    .padding()
}

#Preview("Button States") {
    VStack(spacing: 16) {
        DSButton(title: "Normal") {}
        DSButton(title: "Disabled", isDisabled: true) {}
        DSButton(title: "Loading", isLoading: true) {}
    }
    .padding()
}
