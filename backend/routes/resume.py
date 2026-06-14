from fastapi import APIRouter, UploadFile, File
from pypdf import PdfReader
from services.skill_extractor import extract_skills
import tempfile
import os

router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    # Create temporary file
    temp_file = tempfile.NamedTemporaryFile(delete=False)

    # Read uploaded file
    content = await file.read()

    # Write content to temp file
    temp_file.write(content)
    temp_file.close()

    # Read PDF
    reader = PdfReader(temp_file.name)

    text = ""

    for page in reader.pages:
        extracted_text = page.extract_text()

        if extracted_text:
            text += extracted_text + "\n"

    # Delete temp file
    os.unlink(temp_file.name)
    skills = extract_skills(text)
    return {
    "message": "Resume uploaded successfully",
    "skills": skills,
    "resume_text": text
    }