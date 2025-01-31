import fitz
import pymupdf
from deep_translator import GoogleTranslator

white = pymupdf.pdfcolor["white"]

textflags= pymupdf.TEXT_DEHYPHENATE

font = fitz.Font("spacembo")

def translatedPDF(uid,name,srcLang, tarLang):
    translator = GoogleTranslator(source=srcLang, target=tarLang)
    doc = pymupdf.open("./uploads/"+ str(uid)+"/"+name)
    
    for page in doc:
        blocks = page.get_text("blocks")
        extracted_fonts = page.get_fonts(full=True)

        print(extracted_fonts)
        for block in blocks:
            bbox = block[:4]
            text = block[4]

            translation = translator.translate(text)
            page.insert_font(fontname="F0", fontbuffer=font.buffer)

            page.draw_rect(bbox, color=None, fill= white)
            page.insert_htmlbox(bbox, translation)

    doc.save("./uploads/"+ str(uid)+"/"+tarLang+"-"+name)    