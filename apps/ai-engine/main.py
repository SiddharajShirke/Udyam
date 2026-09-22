from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()

from routes.ai import router as ai_router  # noqa: E402 - must load after load_dotenv()

app = FastAPI(title="InnovateProcure AI Engine")
app.include_router(ai_router)


@app.get("/health")
def health():
    return {"status": "ok"}
