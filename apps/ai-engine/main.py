from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()

app = FastAPI(title="InnovateProcure AI Engine")


@app.get("/health")
def health():
    return {"status": "ok"}
