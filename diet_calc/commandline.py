from backend_stuff import nutr_infant

# sex = input("Input F or M") - will add this line back in at some point
weight = input("Enter child's weight in kg")
years = input("Enter age of child of years")
months = input("Enter age of child in months")

# put the inputs weight, years and months into the function and get back the req values
kcal_req, fluid_req = nutr_infant(weight, years, months)
print(f"This child requires {kcal_req} kcal per day and {fluid_req} ml per day.")
