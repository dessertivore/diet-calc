def nutr_infant(weight, years, months):
    fluid_day = 150
   
   #ensure that there are no decimals or letters in the wrong places
    weight = float(weight)
    years = int(years)

#currently only have enough data in for <1, so ensure that child is <1
    if years != 0:
        raise ValueError("This calculator is for children under 1 only.")
    months = int(months)
    if months > 12:
        raise ValueError("This calculator is for children under 1 only.")

#set multiplier for kcal/day or fluid/day based on age
    if years < 1:
        if months <3:
            kcal_day = 115
        elif months >= 3 and months <6:
            kcal_day = 100
        elif months >= 6 and months <12:
            kcal_day = 95
        elif months >=7 and weight <10:
            fluid_day = 120
        else: print("This calculator is only for children up to 12 months.")


#for children >10kg there is a different fluid calculation formula based on weight not age, see below
    if weight <10:
        fluid_req = fluid_day * weight
    elif weight >10 and weight <20:
        fluid_req = 1000 + (weight - 10)*50
    elif weight >=20:
        fluid_req = 1500 + (weight - 20)*20

    fluid_req = int(fluid_req)
    kcal_req = int(weight * kcal_day)
    return kcal_req, fluid_req
