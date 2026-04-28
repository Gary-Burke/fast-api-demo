from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from random import randint

app = FastAPI()

# Mount static files (CSS, JS, images)
app.mount("/static", StaticFiles(directory="static"), name="static")


# Setup templates
templates = Jinja2Templates(directory="static/templates")


@app.get("/")  # Render home page
async def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )


@app.get("/unique-numbers")  # Function to generate unique numbers
async def unique_nums(
    unique_amount: int = 0,
    unique_min: int = 0,
    unique_max: int = 0
):
    if (unique_min > unique_max):  # Form input validation to ensure max > min
        return JSONResponse(
            status_code=400,
            content={"error": "Min range must be less than max range"}
        )

    nums = []
    while len(nums) < unique_amount:
        num = randint(unique_min, unique_max)
        if num not in nums:
            nums.append(num)

    return JSONResponse(content={"result": nums})
