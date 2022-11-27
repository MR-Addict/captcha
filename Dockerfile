FROM python:3.9.15-slim
WORKDIR /app
EXPOSE 8000
COPY src .
COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["uvicorn", "index:app"]