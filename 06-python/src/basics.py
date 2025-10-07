#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Python Basics Assignment
Module 06 - Python Fundamentals

Implement the following functions to demonstrate Python basics.
"""


def add_numbers(a, b):
    """
    Add two numbers together.
    
    Args:
        a: First number
        b: Second number
    
    Returns:
        Sum of a and b
        
    Examples:
        >>> add_numbers(2, 3)
        5
        >>> add_numbers(-1, 1)
        0
    """
    return a + b


def find_max(numbers):
    """
    Find the maximum number in a list.
    
    Args:
        numbers: List of numbers
    
    Returns:
        Maximum number in the list, or None if empty
        
    Examples:
        >>> find_max([1, 5, 3, 9, 2])
        9
        >>> find_max([-5, -1, -10])
        -1
    """
    if not numbers:
        return None
    return max(numbers)


def reverse_string(text):
    """
    Reverse a string.
    
    Args:
        text: String to reverse
    
    Returns:
        Reversed string
        
    Examples:
        >>> reverse_string("hello")
        'olleh'
        >>> reverse_string("Python")
        'nohtyP'
    """
    return text[::-1]


def count_vowels(text):
    """
    Count the number of vowels (a, e, i, o, u) in a string.
    Case-insensitive.
    
    Args:
        text: String to analyze
    
    Returns:
        Number of vowels
        
    Examples:
        >>> count_vowels("hello")
        2
        >>> count_vowels("AEIOU")
        5
    """
    vowels = "aeiouAEIOU"
    return sum(1 for char in text if char in vowels)


def create_dict(keys, values):
    """
    Create a dictionary from two lists (keys and values).
    
    Args:
        keys: List of keys
        values: List of values
    
    Returns:
        Dictionary created from keys and values.
        If lists have different lengths, use the shorter length.
        
    Examples:
        >>> create_dict(['a', 'b', 'c'], [1, 2, 3])
        {'a': 1, 'b': 2, 'c': 3}
        >>> create_dict(['x', 'y'], [10, 20, 30])
        {'x': 10, 'y': 20}
    """
    return dict(zip(keys, values))


def filter_even(numbers):
    """
    Filter and return only even numbers from a list.
    
    Args:
        numbers: List of integers
    
    Returns:
        List containing only even numbers
        
    Examples:
        >>> filter_even([1, 2, 3, 4, 5, 6])
        [2, 4, 6]
        >>> filter_even([1, 3, 5])
        []
    """
    return [num for num in numbers if num % 2 == 0]


def sum_list(numbers):
    """
    Calculate the sum of all numbers in a list.
    
    Args:
        numbers: List of numbers
    
    Returns:
        Sum of all numbers, or 0 if empty
        
    Examples:
        >>> sum_list([1, 2, 3, 4])
        10
        >>> sum_list([])
        0
    """
    return sum(numbers)


def is_palindrome(text):
    """
    Check if a string is a palindrome (reads the same forwards and backwards).
    Case-insensitive, ignores spaces.
    
    Args:
        text: String to check
    
    Returns:
        True if palindrome, False otherwise
        
    Examples:
        >>> is_palindrome("racecar")
        True
        >>> is_palindrome("hello")
        False
        >>> is_palindrome("A man a plan a canal Panama")
        True
    """
    # Remove spaces and convert to lowercase
    clean = text.replace(" ", "").lower()
    return clean == clean[::-1]


def factorial(n):
    """
    Calculate the factorial of a number.
    
    Args:
        n: Non-negative integer
    
    Returns:
        Factorial of n
        
    Raises:
        ValueError: If n is negative
        
    Examples:
        >>> factorial(5)
        120
        >>> factorial(0)
        1
    """
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)


def find_common_elements(list1, list2):
    """
    Find elements that appear in both lists.
    
    Args:
        list1: First list
        list2: Second list
    
    Returns:
        List of common elements (no duplicates)
        
    Examples:
        >>> find_common_elements([1, 2, 3], [2, 3, 4])
        [2, 3]
        >>> find_common_elements(['a', 'b'], ['c', 'd'])
        []
    """
    return list(set(list1) & set(list2))


if __name__ == "__main__":
    # Test the functions
    print("Testing Python Basics...")
    print(f"add_numbers(2, 3) = {add_numbers(2, 3)}")
    print(f"find_max([1, 5, 3, 9, 2]) = {find_max([1, 5, 3, 9, 2])}")
    print(f"reverse_string('hello') = {reverse_string('hello')}")
    print(f"count_vowels('hello') = {count_vowels('hello')}")
    print(f"filter_even([1, 2, 3, 4, 5]) = {filter_even([1, 2, 3, 4, 5])}")
    print(f"is_palindrome('racecar') = {is_palindrome('racecar')}")
    print(f"factorial(5) = {factorial(5)}")
