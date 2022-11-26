FROM python:slim-buster
WORKDIR /app
EXPOSE 8000
COPY src .
COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["python", "index.py"]