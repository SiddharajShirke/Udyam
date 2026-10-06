from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()

from routes.ai import router as ai_router  # noqa: E402 - load environment before importing routers
from routers.support import router as support_router  # noqa: E402

app = FastAPI(title="InnovateProcure AI Engine")
app.include_router(ai_router)
app.include_router(support_router)


@app.get("/health")
def health():
    return {"status": "ok"}
