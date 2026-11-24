package com.megamind.chat

import android.app.Activity
import android.graphics.Color
import android.os.Bundle
import android.view.Gravity
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView

class MainActivity : Activity() {
    private lateinit var messages: LinearLayout
    private lateinit var input: EditText
    private val background = Color.rgb(12, 17, 29)
    private val panel = Color.rgb(24, 32, 49)
    private val accent = Color.rgb(91, 157, 255)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = background
        window.navigationBarColor = background
        window.decorView.setBackgroundColor(background)

        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(20, 24, 20, 16)
            setBackgroundColor(background)
        }

        val header = TextView(this).apply {
            text = "CHAT"
            textSize = 28f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER_VERTICAL
        }
        root.addView(header, LinearLayout.LayoutParams(-1, 52))

        val subtitle = TextView(this).apply {
            text = "Your personal AI assistant"
            textSize = 14f
            setTextColor(Color.LTGRAY)
        }
        root.addView(subtitle)

        val scroll = ScrollView(this).apply {
            isFillViewport = true
        }
        messages = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(0, 20, 0, 20)
        }
        scroll.addView(messages)
        root.addView(scroll, LinearLayout.LayoutParams(-1, 0, 1f))

        addMessage("CHAT is ready for its first build. The AI brain and voice features will be connected in the next stages.", false)

        val composer = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
        }
        input = EditText(this).apply {
            hint = "Message CHAT..."
            setHintTextColor(Color.GRAY)
            setTextColor(Color.WHITE)
            textSize = 16f
            setSingleLine(true)
            setPadding(14, 10, 14, 10)
            setBackgroundColor(panel)
        }
        composer.addView(input, LinearLayout.LayoutParams(0, 54, 1f))

        val send = Button(this).apply {
            text = "Send"
            setTextColor(Color.WHITE)
            setBackgroundColor(accent)
            setOnClickListener {
                val message = input.text.toString().trim()
                if (message.isNotEmpty()) {
                    addMessage(message, true)
                    addMessage("I'm not connected to the AI brain yet. Gemini will be added in the next build stage.", false)
                    input.text.clear()
                }
            }
        }
        val buttonParams = LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            54
        ).apply { leftMargin = 8 }
        composer.addView(send, buttonParams)
        root.addView(composer, LinearLayout.LayoutParams(-1, 60))

        setContentView(root)
    }

    private fun addMessage(text: String, fromUser: Boolean) {
        val bubble = TextView(this).apply {
            this.text = text
            textSize = 15f
            setTextColor(Color.WHITE)
            setPadding(14, 12, 14, 12)
            setBackgroundColor(if (fromUser) Color.rgb(39, 83, 145) else panel)
        }
        val params = LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        ).apply {
            bottomMargin = 12
            leftMargin = if (fromUser) 42 else 0
            rightMargin = if (fromUser) 0 else 42
        }
        messages.addView(bubble, params)
    }
}
