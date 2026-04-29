from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from random import randint
from typing import Optional
from utils import clean_string
from math import sqrt

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
    unique_max: int = 0,
    unique_exclude: Optional[str] = None,
):
    exclude = []
    if unique_exclude:
        try:
            exclude_test = clean_string(unique_exclude)
            exclude = [int(x) for x in exclude_test]
        except ValueError:
            return JSONResponse(
                status_code=400,
                content={"error": "Use only numbers for unlucky numbers field"}
            )

    #  Form input validation to ensure amount of numbers is less than range
    #  This also covers validation to prevent min range bigger than max
    if (unique_amount > (unique_max - unique_min - len(exclude))):
        return JSONResponse(
            status_code=400,
            content={
                "error": "Amount of numbers exceeds total range.\n"
                "(Tip: Ensure min range is smaller than max)"
            }
        )

    nums = []
    while len(nums) < unique_amount:
        num = randint(unique_min, unique_max)
        if num not in nums and num not in exclude:
            nums.append(num)

    return JSONResponse(content={"result": nums})


@app.get("/prime-numbers")  # Function to generate prime numbers
async def prime_nums(
    prime_min: int = 0,
    prime_max: int = 0,
):
    if (prime_min > prime_max):
        return JSONResponse(
            status_code=400,
            content={
                "error": "Ensure min range is smaller than max",
            }
        )

    # Smallest existing prime number is 2
    if prime_min < 2:
        prime_min = 2

    nums = []

    for num in range(prime_min, prime_max + 1):  # +1 to include max in range
        prime = True
        for i in range(2, int(sqrt(num)) + 1):  # +1 to include sqrt in range
            if num % i == 0:
                prime = False
                break
        if prime:
            nums.append(num)

    return JSONResponse(
        content={
            "result": nums
            })
