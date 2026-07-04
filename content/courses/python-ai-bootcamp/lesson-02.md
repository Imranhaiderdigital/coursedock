---
lessonId: "python-ai-lesson-02"
slug: "llm-apis-integration"
title: "Integrating Large Language Model APIs"
moduleName: "Module 2: AI Integrations"
duration: "25:40"
videoUrl: "https://drive.google.com/file/d/5A6B7C8D9E0F1G2H3I4J/preview"
downloadUrl: "https://drive.google.com/uc?export=download&id=5A6B7C8D9E0F1G2H3I4J"
isFree: false
---

# Integrating Large Language Model APIs

Now that you understand Python variables and operations, let's connect to the Google Gemini API to build a simple interactive chat assistant.

## Setting Up Google Gemini SDK

Install the Google generative AI library:

```bash
pip install google-generativeai
```

## Writing the Code

Make sure you set your API key as an environment variable:
`export GEMINI_API_KEY="your-api-key"` (or `set` on Windows).

```python
import os
import google.generativeai as genai

# Load API key from env
api_key = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=api_key)

# Initialize model
model = genai.GenerativeModel('gemini-1.5-flash')

# Prompt model
response = model.generate_content("Give me a 3-word slogan for CourseDock.")
print(response.text)
```
