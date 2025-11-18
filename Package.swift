// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "ComponentLibrary",
    platforms: [
        .iOS(.v15),
        .macOS(.v12)
    ],
    products: [
        .library(
            name: "ComponentLibrary",
            targets: ["ComponentLibrary"]),
        .library(
            name: "DesignTokens",
            targets: ["DesignTokens"]),
    ],
    dependencies: [
        // No external dependencies for a clean, native Swift solution
    ],
    targets: [
        .target(
            name: "ComponentLibrary",
            dependencies: ["DesignTokens"],
            path: "Sources/ComponentLibrary",
            resources: [
                .process("Resources")
            ]
        ),
        .target(
            name: "DesignTokens",
            dependencies: [],
            path: "Sources/DesignTokens"
        ),
        .testTarget(
            name: "ComponentLibraryTests",
            dependencies: ["ComponentLibrary"],
            path: "Tests/ComponentLibraryTests"
        ),
    ]
)
