from predict_d import predict_d
from predict_c import predict_c
from PIL import Image
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from io import BytesIO
from pydantic import BaseModel

class ImageUrl(BaseModel):
    image_url: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the ShrushrutAI"}

@app.post("/predict")
def classify_image(req: ImageUrl):
    image_url = req.image_url
    try:
        # Fetch image directly from URL
        response = requests.get(image_url)
        response.raise_for_status()
        image = Image.open(BytesIO(response.content)).convert("RGB")

        # Run your deep learning models
        result_c = predict_c(image)
        result_d = predict_d(image)

        # Pick the higher confidence as main prediction
        if result_c["confidence"] > result_d["confidence"]:
            result_pred = result_c
            minor_result = result_d
        elif result_d["confidence"] > result_c["confidence"]:
            result_pred = result_d
            minor_result = result_c
        else:
            result_pred = result_c
            minor_result = result_d

        return {
            "image_url": image_url,
            "predict_c": result_c,
            "predict_d": result_d,
            "final_prediction": result_pred,
            "secondary_prediction": minor_result
        }

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Error fetching image: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run('main:app', host="127.0.0.1", port=6700, reload=True)