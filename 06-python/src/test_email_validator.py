#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Tests for Email Validator Assignment
Module 06 - Python Fundamentals
"""

import pytest
from email_validator import (
    is_valid_email,
    extract_username,
    extract_domain,
    is_work_email,
    normalize_email,
    batch_validate,
    create_email
)


class TestIsValidEmail:
    """Tests for is_valid_email function"""
    
    def test_valid_simple_email(self):
        assert is_valid_email("user@example.com") == True
    
    def test_valid_email_with_dots(self):
        assert is_valid_email("john.doe@example.com") == True
    
    def test_valid_email_with_numbers(self):
        assert is_valid_email("user123@example.com") == True
    
    def test_valid_email_with_subdomain(self):
        assert is_valid_email("user@mail.example.com") == True
    
    def test_valid_email_with_hyphen(self):
        assert is_valid_email("user@my-domain.com") == True
    
    def test_invalid_no_at(self):
        assert is_valid_email("userexample.com") == False
    
    def test_invalid_no_domain(self):
        assert is_valid_email("user@") == False
    
    def test_invalid_no_username(self):
        assert is_valid_email("@example.com") == False
    
    def test_invalid_no_extension(self):
        assert is_valid_email("user@example") == False
    
    def test_invalid_spaces(self):
        assert is_valid_email("user @example.com") == False
        assert is_valid_email("user@ example.com") == False
    
    def test_empty_string(self):
        assert is_valid_email("") == False
    
    def test_none_input(self):
        assert is_valid_email(None) == False


class TestExtractUsername:
    """Tests for extract_username function"""
    
    def test_simple_username(self):
        assert extract_username("john@example.com") == "john"
    
    def test_username_with_dots(self):
        assert extract_username("john.doe@example.com") == "john.doe"
    
    def test_username_with_numbers(self):
        assert extract_username("user123@example.com") == "user123"
    
    def test_invalid_email(self):
        assert extract_username("invalid") is None
    
    def test_empty_email(self):
        assert extract_username("") is None


class TestExtractDomain:
    """Tests for extract_domain function"""
    
    def test_simple_domain(self):
        assert extract_domain("user@example.com") == "example.com"
    
    def test_subdomain(self):
        assert extract_domain("user@mail.example.com") == "mail.example.com"
    
    def test_country_code(self):
        assert extract_domain("user@example.co.uk") == "example.co.uk"
    
    def test_invalid_email(self):
        assert extract_domain("invalid") is None


class TestIsWorkEmail:
    """Tests for is_work_email function"""
    
    def test_work_email_match(self):
        work_domains = ["company.com", "corp.com"]
        assert is_work_email("user@company.com", work_domains) == True
    
    def test_work_email_no_match(self):
        work_domains = ["company.com", "corp.com"]
        assert is_work_email("user@gmail.com", work_domains) == False
    
    def test_multiple_work_domains(self):
        work_domains = ["company.com", "corp.com", "business.net"]
        assert is_work_email("user@business.net", work_domains) == True
    
    def test_invalid_email(self):
        work_domains = ["company.com"]
        assert is_work_email("invalid", work_domains) == False
    
    def test_empty_domains_list(self):
        assert is_work_email("user@company.com", []) == False


class TestNormalizeEmail:
    """Tests for normalize_email function"""
    
    def test_uppercase_to_lowercase(self):
        assert normalize_email("User@Example.COM") == "user@example.com"
    
    def test_with_whitespace(self):
        assert normalize_email("  user@example.com  ") == "user@example.com"
    
    def test_mixed_case_with_spaces(self):
        assert normalize_email(" User@Example.COM ") == "user@example.com"
    
    def test_already_normalized(self):
        assert normalize_email("user@example.com") == "user@example.com"
    
    def test_invalid_email(self):
        assert normalize_email("invalid") is None
    
    def test_empty_string(self):
        assert normalize_email("") is None
    
    def test_none_input(self):
        assert normalize_email(None) is None


class TestBatchValidate:
    """Tests for batch_validate function"""
    
    def test_all_valid(self):
        emails = ["user1@example.com", "user2@example.com"]
        result = batch_validate(emails)
        assert len(result['valid']) == 2
        assert len(result['invalid']) == 0
    
    def test_all_invalid(self):
        emails = ["invalid1", "invalid2"]
        result = batch_validate(emails)
        assert len(result['valid']) == 0
        assert len(result['invalid']) == 2
    
    def test_mixed_validity(self):
        emails = [
            "good@example.com",
            "bad",
            "also.good@test.com",
            "also bad"
        ]
        result = batch_validate(emails)
        assert len(result['valid']) == 2
        assert len(result['invalid']) == 2
        assert "good@example.com" in result['valid']
        assert "bad" in result['invalid']
    
    def test_empty_list(self):
        result = batch_validate([])
        assert result['valid'] == []
        assert result['invalid'] == []


class TestCreateEmail:
    """Tests for create_email function"""
    
    def test_simple_names(self):
        assert create_email("John", "Doe") == "john.doe@evolveu.ca"
    
    def test_custom_domain(self):
        assert create_email("Jane", "Smith", "company.com") == "jane.smith@company.com"
    
    def test_uppercase_names(self):
        assert create_email("JOHN", "DOE") == "john.doe@evolveu.ca"
    
    def test_names_with_spaces(self):
        assert create_email("  John  ", "  Doe  ") == "john.doe@evolveu.ca"
    
    def test_empty_first_name(self):
        assert create_email("", "Doe") is None
    
    def test_empty_last_name(self):
        assert create_email("John", "") is None
    
    def test_none_inputs(self):
        assert create_email(None, "Doe") is None
        assert create_email("John", None) is None
