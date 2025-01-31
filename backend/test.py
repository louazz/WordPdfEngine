import docx 
from deep_translator import GoogleTranslator
import asyncio

async def test():
    translator = GoogleTranslator(source="en", target="fr")
    path = "./uploads/dbf21fc03be34a0db7bb329b79715dc4/en-CM_de_SPORT.docx"
    doc = docx.Document(path)
    paragraphs = [translator.translate(para.text) for para in doc.paragraphs]
    print(paragraphs)

asyncio.run(test())