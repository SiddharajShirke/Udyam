from dotenv import load_dotenv
from fastapi import FastAPI
from routers.support import router as support_router

load_dotenv()

app = FastAPI(title="InnovateProcure AI Engine")
app.include_router(support_router)


@app.get("/health")
def health():
    return {"status": "ok"}
