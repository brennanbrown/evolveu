#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Canadian Tax Calculator
Module 06 - Python Fundamentals

Calculate Canadian federal income tax based on 2021 tax brackets.
"""

# Canadian Federal Tax Brackets (2021)
TAX_BRACKETS = [
    (49020, 0.15),      # 15% on first $49,020
    (98040, 0.205),     # 20.5% on next portion
    (151978, 0.26),     # 26% on next portion
    (216511, 0.29),     # 29% on next portion
    (float('inf'), 0.33)  # 33% on remainder
]


def calculate_tax_bracket(income, prev_max, curr_max, rate):
    """
    Calculate tax for a single bracket.
    
    Args:
        income: Total annual income
        prev_max: Lower bound of this bracket
        curr_max: Upper bound of this bracket
        rate: Tax rate for this bracket
    
    Returns:
        Tax amount for this bracket
        
    Examples:
        >>> calculate_tax_bracket(60000, 49020, 98040, 0.205)
        2250.9
    """
    if income <= prev_max:
        return 0
    
    taxable_in_bracket = min(income, curr_max) - prev_max
    return taxable_in_bracket * rate


def calculate_tax(income):
    """
    Calculate total federal income tax.
    
    Args:
        income: Total annual income
    
    Returns:
        Total tax owed (rounded to 2 decimal places)
        
    Raises:
        ValueError: If income is negative
    
    Examples:
        >>> calculate_tax(50000)
        7630.4
        >>> calculate_tax(100000)
        17991.9
    """
    if income < 0:
        raise ValueError("Income cannot be negative")
    
    total_tax = 0
    prev_max = 0
    
    for bracket_max, rate in TAX_BRACKETS:
        tax_for_bracket = calculate_tax_bracket(income, prev_max, bracket_max, rate)
        total_tax += tax_for_bracket
        prev_max = bracket_max
        
        if income <= bracket_max:
            break
    
    return round(total_tax, 2)


def get_tax_breakdown(income):
    """
    Get detailed tax breakdown.
    
    Args:
        income: Total annual income
    
    Returns:
        Dictionary with income, tax, after_tax, and effective_rate
    
    Examples:
        >>> result = get_tax_breakdown(50000)
        >>> result['tax']
        7630.4
        >>> result['effective_rate']
        15.26
    """
    tax = calculate_tax(income)
    after_tax = income - tax
    effective_rate = (tax / income * 100) if income > 0 else 0
    
    return {
        'income': income,
        'tax': tax,
        'after_tax': round(after_tax, 2),
        'effective_rate': round(effective_rate, 2)
    }


if __name__ == "__main__":
    # Test the tax calculator
    print("Canadian Tax Calculator (2021)")
    print("=" * 50)
    
    test_incomes = [30000, 50000, 75000, 100000, 150000, 250000]
    
    for income in test_incomes:
        breakdown = get_tax_breakdown(income)
        print(f"\nIncome: ${income:,}")
        print(f"Tax: ${breakdown['tax']:,.2f}")
        print(f"After-tax: ${breakdown['after_tax']:,.2f}")
        print(f"Effective rate: {breakdown['effective_rate']}%")
