
FROM python:3.8-slim-buster

WORKDIR /app

RUN pip3 install flask[async] flask-jwt-extended  flask-bcrypt flask-cors python-docx PyMuPDF deep-translator pymupdf-fonts tinydb

COPY . .
RUN chmod -R 777 /app 

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]