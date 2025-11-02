#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Canadian Tax Calculator
Module 06 - Python Fundamentals

Calculate Canadian federal income tax based on 2021 tax brackets.
"""
# ========== TAX CALCULATOR ========== #

# 
# - 14% on the first $48,535 of taxable income.
#
# - 20.5% on the next $48,534 of taxable income 
# (on the portion of taxable income over 48,535 up to 
#  $97,069).
#
# - 26% on the next $53,404 of taxable income 
# (on the portion of taxable income over $97,069 up to 
#  $150,473).
#
# - 29% on the next $63,895 of taxable income 
# (on the portion of taxable income over 150,473 up to 
#  $214,368).
#
# - 33% of taxable income over $214,368.
# 

class taxFunc():

	def calculate_tax_bracket(self, income, prev_max, curr_max, rate):
		"""
		Calculate tax for a single bracket.
		
		Args:
			income: Total annual income
			prev_max: Lower bound of this bracket
			curr_max: Upper bound of this bracket
			rate: Tax rate for this bracket
		
		Returns:
			Tax amount for this bracket
		"""
		if income <= prev_max:
			return 0
		
		taxable_in_bracket = min(income, curr_max) - prev_max
		return taxable_in_bracket * rate

	def calculate_tax(self, income):
		"""
		Calculate total federal income tax.
		
		Args:
			income: Total annual income
		
		Returns:
			Total tax owed (rounded to 2 decimal places)
		
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
			tax_for_bracket = self.calculate_tax_bracket(income, prev_max, bracket_max, rate)
			total_tax += tax_for_bracket
			prev_max = bracket_max
			
			if income <= bracket_max:
				break
		
		return round(total_tax, 2)
			print(total_tax_income)

		else:
			print("Error!")

def main():
	mytaxFunc = taxFunc()
	mytaxFunc.taxCal()
	
if __name__ == '__main__':
	main()
