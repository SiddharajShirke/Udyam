from fastapi import FastAPI

app = FastAPI(title="InnovateProcure AI Engine")


@app.get("/health")
def health():
    return {"status": "ok"}
