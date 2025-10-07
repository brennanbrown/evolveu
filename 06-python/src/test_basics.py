#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Tests for Python Basics Assignment
Module 06 - Python Fundamentals
"""

import pytest
from basics import (
    add_numbers,
    find_max,
    reverse_string,
    count_vowels,
    create_dict,
    filter_even,
    sum_list,
    is_palindrome,
    factorial,
    find_common_elements
)


class TestAddNumbers:
    """Tests for add_numbers function"""
    
    def test_positive_numbers(self):
        assert add_numbers(2, 3) == 5
        assert add_numbers(10, 20) == 30
    
    def test_negative_numbers(self):
        assert add_numbers(-5, -3) == -8
        assert add_numbers(-1, 1) == 0
    
    def test_zero(self):
        assert add_numbers(0, 0) == 0
        assert add_numbers(5, 0) == 5
    
    def test_floats(self):
        assert add_numbers(2.5, 3.7) == pytest.approx(6.2)


class TestFindMax:
    """Tests for find_max function"""
    
    def test_positive_numbers(self):
        assert find_max([1, 5, 3, 9, 2]) == 9
        assert find_max([100]) == 100
    
    def test_negative_numbers(self):
        assert find_max([-5, -1, -10]) == -1
    
    def test_mixed_numbers(self):
        assert find_max([-5, 0, 5, -10, 10]) == 10
    
    def test_empty_list(self):
        assert find_max([]) is None


class TestReverseString:
    """Tests for reverse_string function"""
    
    def test_simple_string(self):
        assert reverse_string("hello") == "olleh"
        assert reverse_string("Python") == "nohtyP"
    
    def test_palindrome(self):
        assert reverse_string("racecar") == "racecar"
    
    def test_empty_string(self):
        assert reverse_string("") == ""
    
    def test_single_char(self):
        assert reverse_string("a") == "a"


class TestCountVowels:
    """Tests for count_vowels function"""
    
    def test_lowercase(self):
        assert count_vowels("hello") == 2
        assert count_vowels("python") == 1
    
    def test_uppercase(self):
        assert count_vowels("HELLO") == 2
        assert count_vowels("AEIOU") == 5
    
    def test_mixed_case(self):
        assert count_vowels("EvolveU") == 4
    
    def test_no_vowels(self):
        assert count_vowels("xyz") == 0
    
    def test_empty_string(self):
        assert count_vowels("") == 0


class TestCreateDict:
    """Tests for create_dict function"""
    
    def test_equal_length(self):
        result = create_dict(['a', 'b', 'c'], [1, 2, 3])
        assert result == {'a': 1, 'b': 2, 'c': 3}
    
    def test_keys_longer(self):
        result = create_dict(['a', 'b', 'c'], [1, 2])
        assert result == {'a': 1, 'b': 2}
    
    def test_values_longer(self):
        result = create_dict(['a', 'b'], [1, 2, 3])
        assert result == {'a': 1, 'b': 2}
    
    def test_empty_lists(self):
        assert create_dict([], []) == {}


class TestFilterEven:
    """Tests for filter_even function"""
    
    def test_mixed_numbers(self):
        assert filter_even([1, 2, 3, 4, 5, 6]) == [2, 4, 6]
    
    def test_all_odd(self):
        assert filter_even([1, 3, 5, 7]) == []
    
    def test_all_even(self):
        assert filter_even([2, 4, 6, 8]) == [2, 4, 6, 8]
    
    def test_negative_numbers(self):
        assert filter_even([-2, -1, 0, 1, 2]) == [-2, 0, 2]
    
    def test_empty_list(self):
        assert filter_even([]) == []


class TestSumList:
    """Tests for sum_list function"""
    
    def test_positive_numbers(self):
        assert sum_list([1, 2, 3, 4]) == 10
    
    def test_negative_numbers(self):
        assert sum_list([-1, -2, -3]) == -6
    
    def test_mixed_numbers(self):
        assert sum_list([-5, 5, -3, 3]) == 0
    
    def test_empty_list(self):
        assert sum_list([]) == 0
    
    def test_single_element(self):
        assert sum_list([42]) == 42


class TestIsPalindrome:
    """Tests for is_palindrome function"""
    
    def test_simple_palindrome(self):
        assert is_palindrome("racecar") == True
        assert is_palindrome("madam") == True
    
    def test_not_palindrome(self):
        assert is_palindrome("hello") == False
        assert is_palindrome("python") == False
    
    def test_case_insensitive(self):
        assert is_palindrome("Racecar") == True
        assert is_palindrome("MadAm") == True
    
    def test_with_spaces(self):
        assert is_palindrome("A man a plan a canal Panama") == True
        assert is_palindrome("race a car") == False
    
    def test_single_char(self):
        assert is_palindrome("a") == True
    
    def test_empty_string(self):
        assert is_palindrome("") == True


class TestFactorial:
    """Tests for factorial function"""
    
    def test_small_numbers(self):
        assert factorial(0) == 1
        assert factorial(1) == 1
        assert factorial(5) == 120
    
    def test_larger_number(self):
        assert factorial(10) == 3628800
    
    def test_negative_number(self):
        with pytest.raises(ValueError):
            factorial(-1)


class TestFindCommonElements:
    """Tests for find_common_elements function"""
    
    def test_with_common_elements(self):
        result = find_common_elements([1, 2, 3, 4], [3, 4, 5, 6])
        assert sorted(result) == [3, 4]
    
    def test_no_common_elements(self):
        assert find_common_elements([1, 2, 3], [4, 5, 6]) == []
    
    def test_all_common(self):
        result = find_common_elements([1, 2, 3], [1, 2, 3])
        assert sorted(result) == [1, 2, 3]
    
    def test_empty_lists(self):
        assert find_common_elements([], []) == []
        assert find_common_elements([1, 2], []) == []
    
    def test_strings(self):
        result = find_common_elements(['a', 'b', 'c'], ['b', 'c', 'd'])
        assert sorted(result) == ['b', 'c']
