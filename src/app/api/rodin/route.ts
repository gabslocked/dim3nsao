import { NextResponse } from "next/server"

const API_KEY = "vibecoding"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const response = await fetch("https://hyperhuman.deemos.com/api/v2/rodin", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `API request failed: ${response.status}`, details: errorText },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in Rodin API route:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
