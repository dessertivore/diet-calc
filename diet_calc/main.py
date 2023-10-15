from fastapi import FastAPI
from diet_calc.backend_stuff import nutr_infant
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#accept stuff from React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

#set variables to input and output from api 
@app.get("/")

async def root(
    weight: float, 
    years: int=0, 
    months: int=1,
):
    
    kcal_req, fluid_req = nutr_infant(weight, years, months)
    return {'kcal req' : kcal_req, 'fluid req' : fluid_req}

