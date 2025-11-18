package com.aaanandan.componentlibrary.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * A customizable button component with multiple styles and sizes
 *
 * DSButton provides a consistent button interface across your app with
 * support for different visual styles, sizes, and states.
 *
 * @param text The text to display on the button
 * @param onClick Callback when the button is clicked
 * @param modifier Modifier to be applied to the button
 * @param style The visual style of the button (default: Primary)
 * @param size The size of the button (default: Medium)
 * @param enabled Whether the button is enabled (default: true)
 * @param loading Whether to show a loading indicator (default: false)
 *
 * Example usage:
 * ```
 * DSButton(
 *     text = "Submit",
 *     style = DSButtonStyle.Primary,
 *     size = DSButtonSize.Medium,
 *     onClick = { /* Handle click */ }
 * )
 * ```
 */
@Composable
fun DSButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    style: DSButtonStyle = DSButtonStyle.Primary,
    size: DSButtonSize = DSButtonSize.Medium,
    enabled: Boolean = true,
    loading: Boolean = false
) {
    val colors = style.getButtonColors()
    val contentPadding = size.getContentPadding()
    val fontSize = size.getFontSize()

    when (style) {
        is DSButtonStyle.Outline -> {
            OutlinedButton(
                onClick = onClick,
                modifier = modifier,
                enabled = enabled && !loading,
                colors = colors,
                contentPadding = contentPadding,
                border = BorderStroke(1.dp, style.borderColor)
            ) {
                ButtonContent(text, fontSize, loading)
            }
        }
        is DSButtonStyle.Ghost -> {
            TextButton(
                onClick = onClick,
                modifier = modifier,
                enabled = enabled && !loading,
                colors = colors,
                contentPadding = contentPadding
            ) {
                ButtonContent(text, fontSize, loading)
            }
        }
        else -> {
            Button(
                onClick = onClick,
                modifier = modifier,
                enabled = enabled && !loading,
                colors = colors,
                contentPadding = contentPadding
            ) {
                ButtonContent(text, fontSize, loading)
            }
        }
    }
}

@Composable
private fun ButtonContent(
    text: String,
    fontSize: androidx.compose.ui.unit.TextUnit,
    loading: Boolean
) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        if (loading) {
            CircularProgressIndicator(
                modifier = Modifier.size(16.dp),
                strokeWidth = 2.dp
            )
        }
        Text(
            text = text,
            fontSize = fontSize
        )
    }
}

/**
 * Visual styles for DSButton
 */
sealed class DSButtonStyle {
    object Primary : DSButtonStyle()
    object Secondary : DSButtonStyle()
    data class Outline(val borderColor: Color = Color(0xFF2563EB)) : DSButtonStyle()
    object Ghost : DSButtonStyle()
    object Destructive : DSButtonStyle()

    @Composable
    fun getButtonColors(): ButtonColors {
        return when (this) {
            is Primary -> ButtonDefaults.buttonColors(
                containerColor = Color(0xFF2563EB), // primary-600
                contentColor = Color.White
            )
            is Secondary -> ButtonDefaults.buttonColors(
                containerColor = Color(0xFFF5F5F5), // neutral-100
                contentColor = Color(0xFF171717) // neutral-900
            )
            is Outline -> ButtonDefaults.outlinedButtonColors(
                containerColor = Color.Transparent,
                contentColor = Color(0xFF2563EB) // primary-600
            )
            is Ghost -> ButtonDefaults.textButtonColors(
                containerColor = Color.Transparent,
                contentColor = Color(0xFF2563EB) // primary-600
            )
            is Destructive -> ButtonDefaults.buttonColors(
                containerColor = Color(0xFFDC2626), // error-600
                contentColor = Color.White
            )
        }
    }
}

/**
 * Size variants for DSButton
 */
enum class DSButtonSize {
    Small,
    Medium,
    Large;

    fun getContentPadding(): PaddingValues {
        return when (this) {
            Small -> PaddingValues(horizontal = 12.dp, vertical = 8.dp)
            Medium -> PaddingValues(horizontal = 16.dp, vertical = 12.dp)
            Large -> PaddingValues(horizontal = 20.dp, vertical = 16.dp)
        }
    }

    fun getFontSize(): androidx.compose.ui.unit.TextUnit {
        return when (this) {
            Small -> 14.sp
            Medium -> 16.sp
            Large -> 18.sp
        }
    }
}

// ===== Previews =====

@Preview(name = "Button Styles", showBackground = true)
@Composable
private fun PreviewButtonStyles() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        DSButton(text = "Primary", style = DSButtonStyle.Primary, onClick = {})
        DSButton(text = "Secondary", style = DSButtonStyle.Secondary, onClick = {})
        DSButton(text = "Outline", style = DSButtonStyle.Outline(), onClick = {})
        DSButton(text = "Ghost", style = DSButtonStyle.Ghost, onClick = {})
        DSButton(text = "Destructive", style = DSButtonStyle.Destructive, onClick = {})
    }
}

@Preview(name = "Button Sizes", showBackground = true)
@Composable
private fun PreviewButtonSizes() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        DSButton(text = "Small", size = DSButtonSize.Small, onClick = {})
        DSButton(text = "Medium", size = DSButtonSize.Medium, onClick = {})
        DSButton(text = "Large", size = DSButtonSize.Large, onClick = {})
    }
}

@Preview(name = "Button States", showBackground = true)
@Composable
private fun PreviewButtonStates() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        DSButton(text = "Normal", onClick = {})
        DSButton(text = "Disabled", enabled = false, onClick = {})
        DSButton(text = "Loading", loading = true, onClick = {})
    }
}
