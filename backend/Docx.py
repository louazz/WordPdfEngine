
import docx
from deep_translator import GoogleTranslator
async def translatedDOCX(uid,name,srcLang, tarLang):
    doc = docx.Document("./uploads/"+ str(uid)+"/"+name)

    translator = GoogleTranslator(source=srcLang, target=tarLang)
    for para in doc.paragraphs:        
        translation = translator.translate(para.text)
        para.text = translation

    doc.save("./uploads/"+ str(uid)+"/"+tarLang+"-"+name)    