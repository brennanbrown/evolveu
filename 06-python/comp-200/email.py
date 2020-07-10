#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Exercise - Simple Functions
# Write a function that will receive two parameters: first name and last name. 
# It will return a well-formatted email. For example:
# Brennan Brown ⇒ brennan.brown@evolveu.ca

class myClass():
	# First example: Have user input their names via terminal:
	def inputName(self):
		c = myClass()
		first_name = input("Hello! Please enter your first name: ")
		last_name = input("Now, please enter your last name: ")
		output = (first_name + last_name + "@evolveu.ca")
		print(output)
		return output
	
	# Second example: Have hard-coded names input via arguments:
	def argsName(self, first_name, last_name):
		c = myClass()
		output = (first_name + last_name + "@evolveu.ca")
		print(output)
		return output

def main():
	c = myClass()
	c.inputName()
	c.argsName("Brennan", "Brown")

if __name__ == '__main__':
	main()