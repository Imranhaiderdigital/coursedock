---
lessonId: "python-ai-lesson-01"
slug: "python-setup-and-basics"
title: "Python Setup, Syntax, and First Script"
moduleName: "Module 1: Python Basics"
duration: "18:12"
videoUrl: "https://drive.google.com/file/d/4A5B6C7D8E9F0G1H2I3J/preview"
downloadUrl: "https://drive.google.com/uc?export=download&id=4A5B6C7D8E9F0G1H2I3J"
isFree: true
---

# Python Setup, Syntax, and First Script

Welcome to Python & AI Bootcamp. In this lesson, we will install Python, configure Visual Studio Code, and write our very first script.

## Installing Python

Ensure you download Python 3.10 or higher.

1. Go to [python.org](https://www.python.org/downloads/).
2. Download the installer for your OS (Windows/Mac/Linux).
3. **IMPORTANT:** On Windows, ensure you check the box that says **"Add Python to PATH"** before clicking install!

---

## Writing Your First Script

Create a new file named `app.py` in VS Code and type the following code:

```python
# First Script
name = "CourseDock"
version = 1.0

print(f"Welcome to {name} version {version}")

# Basic control flow
if version >= 1.0:
    print("Ready to integrate AI agents!")
else:
    print("Under development.")
```

Run the script by typing `python app.py` in your terminal. You should see:
`Welcome to CourseDock version 1.0`
`Ready to integrate AI agents!`
