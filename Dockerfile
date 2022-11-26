FROM python:3.10.8-slim-buster
WORKDIR /app
EXPOSE 8000
COPY src .
COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["python", "index.py"]