#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Tests for Canadian Tax Calculator
Module 06 - Python Fundamentals
"""

import pytest
from cantax import calculate_tax, calculate_tax_bracket, get_tax_breakdown


class TestCalculateTaxBracket:
    """Tests for calculate_tax_bracket function"""
    
    def test_income_below_bracket(self):
        """Income doesn't reach this bracket"""
        assert calculate_tax_bracket(30000, 49020, 98040, 0.205) == 0
    
    def test_income_in_bracket(self):
        """Income falls within bracket"""
        result = calculate_tax_bracket(60000, 49020, 98040, 0.205)
        assert result == pytest.approx(2250.9, rel=0.01)
    
    def test_income_above_bracket(self):
        """Income exceeds bracket"""
        result = calculate_tax_bracket(100000, 49020, 98040, 0.205)
        assert result == pytest.approx(10040.9, rel=0.01)


class TestCalculateTax:
    """Tests for calculate_tax function"""
    
    def test_first_bracket(self):
        """Income in first bracket only"""
        # $30,000 × 15% = $4,500
        assert calculate_tax(30000) == pytest.approx(4500, rel=0.01)
    
    def test_second_bracket(self):
        """Income reaches second bracket"""
        # First: $49,020 × 15% = $7,353
        # Second: $980 × 20.5% = $200.9
        # Total: $7,553.9
        assert calculate_tax(50000) == pytest.approx(7553.9, rel=0.01)
    
    def test_third_bracket(self):
        """Income reaches third bracket"""
        # $75,000 total
        assert calculate_tax(75000) == pytest.approx(12678.9, rel=0.01)
    
    def test_fourth_bracket(self):
        """Income reaches fourth bracket"""
        # $100,000 total
        assert calculate_tax(100000) == pytest.approx(17991.9, rel=0.01)
    
    def test_fifth_bracket(self):
        """Income in highest bracket"""
        # $250,000 total
        assert calculate_tax(250000) == pytest.approx(61191.92, rel=0.01)
    
    def test_exact_bracket_boundary(self):
        """Income exactly at bracket boundary"""
        # Exactly $49,020
        assert calculate_tax(49020) == pytest.approx(7353, rel=0.01)
    
    def test_zero_income(self):
        """Zero income"""
        assert calculate_tax(0) == 0
    
    def test_negative_income(self):
        """Negative income raises error"""
        with pytest.raises(ValueError, match="Income cannot be negative"):
            calculate_tax(-1000)
    
    def test_large_income(self):
        """Very large income"""
        # $1,000,000
        result = calculate_tax(1000000)
        assert result > 0
        assert isinstance(result, float)


class TestGetTaxBreakdown:
    """Tests for get_tax_breakdown function"""
    
    def test_breakdown_structure(self):
        """Breakdown returns correct structure"""
        result = get_tax_breakdown(50000)
        
        assert 'income' in result
        assert 'tax' in result
        assert 'after_tax' in result
        assert 'effective_rate' in result
    
    def test_breakdown_values(self):
        """Breakdown calculates correctly"""
        result = get_tax_breakdown(50000)
        
        assert result['income'] == 50000
        assert result['tax'] == pytest.approx(7553.9, rel=0.01)
        assert result['after_tax'] == pytest.approx(42446.1, rel=0.01)
        assert result['effective_rate'] == pytest.approx(15.11, rel=0.01)
    
    def test_breakdown_zero_income(self):
        """Breakdown with zero income"""
        result = get_tax_breakdown(0)
        
        assert result['income'] == 0
        assert result['tax'] == 0
        assert result['after_tax'] == 0
        assert result['effective_rate'] == 0
    
    def test_effective_rate_increases(self):
        """Effective rate increases with income (progressive)"""
        result_50k = get_tax_breakdown(50000)
        result_100k = get_tax_breakdown(100000)
        result_200k = get_tax_breakdown(200000)
        
        assert result_50k['effective_rate'] < result_100k['effective_rate']
        assert result_100k['effective_rate'] < result_200k['effective_rate']
    
    def test_after_tax_calculation(self):
        """After-tax income is correct"""
        result = get_tax_breakdown(75000)
        
        assert result['after_tax'] == pytest.approx(
            result['income'] - result['tax'], 
            rel=0.01
        )


class TestTaxCalculatorEdgeCases:
    """Edge case tests"""
    
    def test_very_small_income(self):
        """Very small income (e.g., $1)"""
        result = calculate_tax(1)
        assert result == pytest.approx(0.15, rel=0.01)
    
    def test_float_income(self):
        """Income with decimals"""
        result = calculate_tax(50000.50)
        assert isinstance(result, float)
        assert result > 0
    
    def test_rounding(self):
        """Results are rounded to 2 decimal places"""
        result = calculate_tax(33333.33)
        # Check it has at most 2 decimal places
        assert result == round(result, 2)
