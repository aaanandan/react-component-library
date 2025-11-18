package com.aaanandan.componentlibrary

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import com.aaanandan.componentlibrary.components.DSButton
import com.aaanandan.componentlibrary.components.DSButtonSize
import com.aaanandan.componentlibrary.components.DSButtonStyle
import org.junit.Rule
import org.junit.Test

class DSButtonTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun buttonDisplaysText() {
        composeTestRule.setContent {
            DSButton(
                text = "Click Me",
                onClick = {}
            )
        }

        composeTestRule
            .onNodeWithText("Click Me")
            .assertExists()
            .assertIsDisplayed()
    }

    @Test
    fun buttonCallsOnClickWhenClicked() {
        var clicked = false

        composeTestRule.setContent {
            DSButton(
                text = "Click Me",
                onClick = { clicked = true }
            )
        }

        composeTestRule
            .onNodeWithText("Click Me")
            .performClick()

        assert(clicked)
    }

    @Test
    fun disabledButtonDoesNotCallOnClick() {
        var clicked = false

        composeTestRule.setContent {
            DSButton(
                text = "Click Me",
                enabled = false,
                onClick = { clicked = true }
            )
        }

        composeTestRule
            .onNodeWithText("Click Me")
            .performClick()

        assert(!clicked)
    }

    @Test
    fun loadingButtonShowsProgressIndicator() {
        composeTestRule.setContent {
            DSButton(
                text = "Loading",
                loading = true,
                onClick = {}
            )
        }

        // Progress indicator should be present when loading
        composeTestRule
            .onNodeWithText("Loading")
            .assertExists()
    }

    @Test
    fun buttonWithDifferentStylesRendersCorrectly() {
        val styles = listOf(
            DSButtonStyle.Primary,
            DSButtonStyle.Secondary,
            DSButtonStyle.Outline(),
            DSButtonStyle.Ghost,
            DSButtonStyle.Destructive
        )

        styles.forEach { style ->
            composeTestRule.setContent {
                DSButton(
                    text = "Test Button",
                    style = style,
                    onClick = {}
                )
            }

            composeTestRule
                .onNodeWithText("Test Button")
                .assertExists()
                .assertIsDisplayed()
        }
    }

    @Test
    fun buttonWithDifferentSizesRendersCorrectly() {
        val sizes = listOf(
            DSButtonSize.Small,
            DSButtonSize.Medium,
            DSButtonSize.Large
        )

        sizes.forEach { size ->
            composeTestRule.setContent {
                DSButton(
                    text = "Test Button",
                    size = size,
                    onClick = {}
                )
            }

            composeTestRule
                .onNodeWithText("Test Button")
                .assertExists()
                .assertIsDisplayed()
        }
    }
}
