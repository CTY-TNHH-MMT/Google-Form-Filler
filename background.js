// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "FETCH_GEMINI") {
        (async () => {
            try {
                const systemPrompt = `You are an automated Google Form filling assistant.

Your task is to answer EACH question strictly based on the provided user profile.

CRITICAL RULES (MUST FOLLOW):
1. You MUST answer EVERY question.
2. For multiple-choice or checkbox questions:
   - ONLY choose from the EXACT option text provided.
   - DO NOT rephrase, shorten, or modify option text.
3. For text input questions:
   - Provide a SHORT, relevant answer derived from the profile.
4. Always try to find the BEST matching information in the profile, even if the match is indirect.
5. If NO clear information exists for an option-based question:
   - Choose the MOST reasonable option.
6. NEVER invent personal information.
7. NEVER leave any question unanswered.
8. NEVER return explanations, comments, or markdown.
9. NEVER return placeholders such as MANUAL_REVIEW.
10. Output MUST be a SINGLE valid JSON object.
11. Use the provided question ID EXACTLY as the JSON key.
12. Values MUST be strings.

OUTPUT FORMAT (STRICT):
{"q_0":"answer text","q_1":"Exact Option Text","q_2":"another answer"}
`;

                const userContent = `User Profile Information:
${request.profile}

---

Form to Fill:
${JSON.stringify(request.questions, null, 2)}

Please analyze the profile and provide the best matching answer for each question ID.
Return ONLY the JSON object with answers.`;

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${request.apiKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                role: "user",
                                parts: [
                                    { text: systemPrompt },
                                    { text: userContent }
                                ]
                            }
                        ],
                        generationConfig: {
                            response_mime_type: "application/json"
                        }
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Gemini API HTTP Error:", response.status, response.statusText);
                    console.error("Response body:", errorText);
                    throw new Error(`Gemini API Error ${response.status}: ${response.statusText}. Details: ${errorText}`);
                }

                const data = await response.json();
                
                // Better error handling for response structure
                if (!data.candidates || data.candidates.length === 0) {
                    console.error("Gemini Error: No candidates in response", data);
                    throw new Error("Gemini returned no candidates. Check API key and quota.");
                }
                
                if (!data.candidates[0].content || !data.candidates[0].content.parts) {
                    console.error("Gemini Error: Invalid response structure", data);
                    throw new Error("Gemini returned unexpected response structure.");
                }
                
                const content = data.candidates[0].content.parts[0].text;
                
                console.log("🔍 Raw Gemini response:", content);
                
                // Validate JSON response
                try {
                    // Try to extract JSON if wrapped in markdown
                    let jsonStr = content;
                    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                    if (jsonMatch) {
                        jsonStr = jsonMatch[1];
                    }
                    
                    const parsedData = JSON.parse(jsonStr);
                    console.log("✅ Parsed Gemini answers:", parsedData);
                    sendResponse({ success: true, data: parsedData });
                } catch (jsonError) {
                    console.error("❌ JSON Parse Error:", jsonError, "Content:", content);
                    throw new Error(`Gemini response is not valid JSON: ${content}`);
                }

            } catch (error) {
                console.error("❌ Background Fetch Error:", error.message);
                console.error("Full error:", error);
                sendResponse({ 
                    success: false, 
                    error: error.message || "Unknown error occurred"
                });
            }
        })();
        return true;
    }
});
