install:
	poetry install

lint:
	-poetry run ruff .
	-poetry run black .
	-poetry run mypy --strict --explicit-package-bases .

test:
	poetry run pytest .

backend:
	poetry run uvicorn backend.main:app --reload 

.PHONY: frontend
frontend: 
	cd frontend/ && npm run start
	