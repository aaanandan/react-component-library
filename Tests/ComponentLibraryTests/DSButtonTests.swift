import XCTest
import SwiftUI
@testable import ComponentLibrary

final class DSButtonTests: XCTestCase {
    func testButtonInitialization() {
        let button = DSButton(title: "Test Button") {}

        XCTAssertNotNil(button)
    }

    func testButtonStyles() {
        let styles: [DSButtonStyle] = [.primary, .secondary, .outline, .ghost, .destructive]

        for style in styles {
            let button = DSButton(title: "Test", style: style) {}
            XCTAssertNotNil(button)
        }
    }

    func testButtonSizes() {
        let sizes: [DSButtonSize] = [.small, .medium, .large]

        for size in sizes {
            let button = DSButton(title: "Test", size: size) {}
            XCTAssertNotNil(button)
        }
    }

    func testButtonAction() {
        var actionCalled = false
        let button = DSButton(title: "Test") {
            actionCalled = true
        }

        XCTAssertNotNil(button)
        // Note: Testing button tap requires UI testing or ViewInspector
    }

    func testButtonDisabledState() {
        let button = DSButton(title: "Test", isDisabled: true) {}

        XCTAssertNotNil(button)
    }

    func testButtonLoadingState() {
        let button = DSButton(title: "Test", isLoading: true) {}

        XCTAssertNotNil(button)
    }
}
