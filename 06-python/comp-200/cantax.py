#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ========== TAX CALCULATOR ========== #

# 
# - 15% on the first $48,535 of taxable income.
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

	def taxCal(gross_income):
		mytaxFunc = taxFunc()
		
		gross_income_input = input("Hello! Please enter the amount of money you made this year (gross): ")
		gross_income = float(gross_income_input)
		# gross_income = parseInt(document.getElementById("gross_income").value);

		# Calculating the percentage of income taken per bracket.
		P = [(100.0 - 15.0), (100.0 - 20.5), (100.0 - 26.0), (100.0 - 29.0), (100.0 - 33.0)];

		# Calculating the tax owed per bracket, if maximum is met.
		TAX = [
			((48535.0*100.0 - 48535.0*P[1])/(100.0)), # BELOW   48K
			((48534.0*100.0 - 48534.0*P[2])/(100.0)), # 48K  -  97K
			((53404.0*100.0 - 53404.0*P[3])/(100.0)), # 97K  - 150K
			((63895.0*100.0 - 63895.0*P[4])/(100.0))  # 150K - 214K
		]

		# Calculating the maximum value per bracket.
		BR = [48535.00, 97069.00, 150473.00, 214368.00];

		if gross_income < BR[0]:
			total_tax_income = ((gross_income*100.0 - gross_income*P[0])/(100.0));
			total_tax_income = (total_tax_income * 100.0) / 100.0;
			# taxWrite(total_tax_income);
			print(total_tax_income)

		elif (BR[0] < gross_income and gross_income < BR[1]):
			# Subtracts the prior bracket to calculate remaining income.
			r_sum = (gross_income - BR[0]);
			# Uses kiss-and-flip method of percentile sum to calculate taxes.
			r_sum = ((r_sum*100.0 - r_sum*P[1])/(100.0));
			# Adds new bracket calculation with prior bracket calculation.
			total_tax_income = r_sum + TAX[1];
			# Uses the Math.round function to round calculation to
			# the second decimal place, for monetary value. 
			total_tax_income = (total_tax_income * 100.0) / 100.0;
			print(total_tax_income)
			

		elif (BR[1] < gross_income and gross_income < BR[2]):
			r_sum = (gross_income - BR[1]);
			r_sum = ((r_sum*100.0 - r_sum*P[2])/(100.0));
			total_tax_income = r_sum + TAX[0] + TAX[1];
			total_tax_income = (total_tax_income * 100.0) / 100.0;
			print( total_tax_income)


		elif (BR[2] < gross_income and gross_income < BR[3]):
			r_sum = (gross_income - BR[2]);
			r_sum = ((r_sum*100.0 - r_sum*P[3])/(100.0));
			total_tax_income = r_sum + TAX[0] + TAX[1] + TAX[2];
			total_tax_income = (total_tax_income * 100.0) / 100.0;
			print( total_tax_income)

		elif (gross_income > BR[3]):
			r_sum = (gross_income - BR[3]);
			r_sum = ((r_sum*100.0 - r_sum*P[4])/(100.0));
			total_tax_income = r_sum + TAX[0] + TAX[1] + TAX[2] + TAX[3];
			total_tax_income = (total_tax_income * 100.0) / 100.0;
			print(total_tax_income)

		else:
			print("Error!");

def main():
	mytaxFunc = taxFunc()
	mytaxFunc.taxCal()
	
if __name__ == '__main__':
	main()
