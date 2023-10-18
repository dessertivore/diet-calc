from fastapi import FastAPI
from backend.calculations import nutr_infant
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Inputs(BaseModel):
    weight: float
    years: int
    months: int


app = FastAPI()

# accept requests from React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# set variables to input and output from api
@app.post("/calc")
async def calc(item: Inputs) -> dict[str, int]:
    # Extract data from the item parameter
    weight = item.weight
    years = item.years
    months = item.months
    # Calculate nutrition requirements
    kcal_req, fluid_req = nutr_infant(weight, years, months)
    return {"kcal req": kcal_req, "fluid req": fluid_req}
