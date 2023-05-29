FROM python:3.9.15-slim
WORKDIR /app
COPY src .
COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["python", "index.py"]