#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Email Validator Assignment
Module 06 - Python Fundamentals

Validate and process email addresses using regular expressions.
"""

import re


def is_valid_email(email):
    """
    Check if an email address is valid format.
    
    Args:
        email: Email string to validate
    
    Returns:
        True if valid, False otherwise
        
    Examples:
        >>> is_valid_email("user@example.com")
        True
        >>> is_valid_email("invalid.email")
        False
    """
    if not email or not isinstance(email, str):
        return False
    
    # Basic email regex pattern
    # Matches: username@domain.extension
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    return bool(re.match(pattern, email))


def extract_username(email):
    """
    Extract username part from email address.
    
    Args:
        email: Email address
    
    Returns:
        Username (part before @), or None if invalid
        
    Examples:
        >>> extract_username("john.doe@example.com")
        'john.doe'
        >>> extract_username("invalid")
        None
    """
    if not is_valid_email(email):
        return None
    
    return email.split('@')[0]


def extract_domain(email):
    """
    Extract domain from email address.
    
    Args:
        email: Email address
    
    Returns:
        Domain name, or None if invalid
        
    Examples:
        >>> extract_domain("user@example.com")
        'example.com'
        >>> extract_domain("invalid")
        None
    """
    if not is_valid_email(email):
        return None
    
    return email.split('@')[1]


def is_work_email(email, work_domains):
    """
    Check if email is from a work domain.
    
    Args:
        email: Email address to check
        work_domains: List of work domain names
    
    Returns:
        True if email domain matches any work domain
        
    Examples:
        >>> is_work_email("user@company.com", ["company.com", "corp.com"])
        True
        >>> is_work_email("user@gmail.com", ["company.com"])
        False
    """
    domain = extract_domain(email)
    if not domain:
        return False
    
    return domain in work_domains


def normalize_email(email):
    """
    Normalize email address (lowercase, trim whitespace).
    
    Args:
        email: Email address to normalize
    
    Returns:
        Normalized email, or None if invalid
        
    Examples:
        >>> normalize_email("  User@Example.COM  ")
        'user@example.com'
    """
    if not email:
        return None
    
    # Trim and lowercase
    normalized = email.strip().lower()
    
    # Validate after normalization
    if not is_valid_email(normalized):
        return None
    
    return normalized


def batch_validate(emails):
    """
    Validate a list of email addresses.
    
    Args:
        emails: List of email addresses
    
    Returns:
        Dictionary with 'valid' and 'invalid' lists
        
    Examples:
        >>> batch_validate(["good@example.com", "bad"])
        {'valid': ['good@example.com'], 'invalid': ['bad']}
    """
    result = {
        'valid': [],
        'invalid': []
    }
    
    for email in emails:
        if is_valid_email(email):
            result['valid'].append(email)
        else:
            result['invalid'].append(email)
    
    return result


def create_email(first_name, last_name, domain="evolveu.ca"):
    """
    Create an email address from first and last name.
    
    Args:
        first_name: First name
        last_name: Last name
        domain: Email domain (default: evolveu.ca)
    
    Returns:
        Generated email address
        
    Examples:
        >>> create_email("John", "Doe")
        'john.doe@evolveu.ca'
        >>> create_email("Jane", "Smith", "company.com")
        'jane.smith@company.com'
    """
    if not first_name or not last_name:
        return None
    
    # Clean and lowercase names
    first = first_name.strip().lower()
    last = last_name.strip().lower()
    
    # Create email
    email = f"{first}.{last}@{domain}"
    
    return email


if __name__ == "__main__":
    # Test the email validator
    print("Email Validator")
    print("=" * 50)
    
    test_emails = [
        'john.doe@example.com',
        'invalid.email',
        'user@domain.co.uk',
        '@missing.com',
        'no-at-sign.com',
        'User@Example.COM'
    ]
    
    for email in test_emails:
        valid = is_valid_email(email)
        username = extract_username(email)
        domain = extract_domain(email)
        print(f"\nEmail: {email}")
        print(f"Valid: {valid}")
        print(f"Username: {username}")
        print(f"Domain: {domain}")
    
    print("\n" + "=" * 50)
    print("Creating email:")
    print(create_email("Brennan", "Brown"))
