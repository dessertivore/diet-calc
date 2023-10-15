from backend.calculations import nutr_infant
import pytest


def test_under10kg_nutr_infant() -> None:
    assert nutr_infant(2, 0, 3) == (200, 300)


def test_over10kg_nutr_infant() -> None:
    assert nutr_infant(12, 0, 5) == (1200, 1100)


# test cases that should raise valueerrors - over 1 year, 12 months or over, negative input data
test_data = [(3, 1, 2), (3, 0, 12), (-1, 0, 2), (1, -1, 1), (1, 0, -2)]


# test all the above tuples for valueerrors when inputted
@pytest.mark.parametrize("input_data", test_data)
def test_nutr_infant_value_error(input_data: tuple[float, int, int]) -> None:
    a, b, c = input_data
    with pytest.raises(ValueError):
        nutr_infant(a, b, c)
