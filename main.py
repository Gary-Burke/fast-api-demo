from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

# Mount static files (CSS, JS, images)
# This lets FastAPI serve everything in your static folder at the '/static' URL
# That's why your HTML can use: url_for('static', path='css/style.css')
# Jinja2 resolves that to /static/css/style.css
app.mount("/static", StaticFiles(directory="static"), name="static")


# Setup templates
templates = Jinja2Templates(directory="static/templates")


@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )
"""
Render home page / index.html
TemplateResponse API changed — request is now a direct keyword argument
instead of being passed inside the context dict.
"""
