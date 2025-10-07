#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
File Operations Assignment
Module 06 - Python Fundamentals

Read, write, and process text files.
"""

import os


def read_file(filename):
    """
    Read entire file as a single string.
    
    Args:
        filename: Path to file
    
    Returns:
        File contents as string, or None if error
        
    Examples:
        >>> content = read_file("test.txt")
    """
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            return file.read()
    except FileNotFoundError:
        return None
    except Exception as e:
        print(f"Error reading file: {e}")
        return None


def read_lines(filename):
    """
    Read file as list of lines (with newlines stripped).
    
    Args:
        filename: Path to file
    
    Returns:
        List of lines, or None if error
        
    Examples:
        >>> lines = read_lines("test.txt")
        >>> len(lines)
        5
    """
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            return [line.rstrip('\n') for line in file]
    except FileNotFoundError:
        return None
    except Exception as e:
        print(f"Error reading file: {e}")
        return None


def write_file(filename, content):
    """
    Write content to file (overwrites existing file).
    
    Args:
        filename: Path to file
        content: String content to write
    
    Returns:
        True if successful, False otherwise
        
    Examples:
        >>> write_file("output.txt", "Hello, World!")
        True
    """
    try:
        with open(filename, 'w', encoding='utf-8') as file:
            file.write(content)
        return True
    except Exception as e:
        print(f"Error writing file: {e}")
        return False


def append_to_file(filename, content):
    """
    Append content to end of file.
    
    Args:
        filename: Path to file
        content: String content to append
    
    Returns:
        True if successful, False otherwise
        
    Examples:
        >>> append_to_file("output.txt", "\\nNew line")
        True
    """
    try:
        with open(filename, 'a', encoding='utf-8') as file:
            file.write(content)
        return True
    except Exception as e:
        print(f"Error appending to file: {e}")
        return False


def count_words(filename):
    """
    Count total words in a file.
    
    Args:
        filename: Path to file
    
    Returns:
        Number of words, or -1 if error
        
    Examples:
        >>> count_words("document.txt")
        1523
    """
    content = read_file(filename)
    if content is None:
        return -1
    
    words = content.split()
    return len(words)


def count_lines(filename):
    """
    Count number of lines in file.
    
    Args:
        filename: Path to file
    
    Returns:
        Number of lines, or -1 if error
        
    Examples:
        >>> count_lines("document.txt")
        42
    """
    lines = read_lines(filename)
    if lines is None:
        return -1
    
    return len(lines)


def search_in_file(filename, search_term):
    """
    Find all lines containing search term.
    
    Args:
        filename: Path to file
        search_term: String to search for
    
    Returns:
        List of matching lines, or None if error
        
    Examples:
        >>> matches = search_in_file("log.txt", "ERROR")
        >>> len(matches)
        3
    """
    lines = read_lines(filename)
    if lines is None:
        return None
    
    matches = [line for line in lines if search_term in line]
    return matches


def replace_in_file(filename, old_text, new_text):
    """
    Replace all occurrences of old_text with new_text in file.
    
    Args:
        filename: Path to file
        old_text: Text to find
        new_text: Text to replace with
    
    Returns:
        Number of replacements made, or -1 if error
        
    Examples:
        >>> replace_in_file("data.txt", "old", "new")
        5
    """
    content = read_file(filename)
    if content is None:
        return -1
    
    count = content.count(old_text)
    new_content = content.replace(old_text, new_text)
    
    if write_file(filename, new_content):
        return count
    return -1


def file_stats(filename):
    """
    Get statistics about a file.
    
    Args:
        filename: Path to file
    
    Returns:
        Dictionary with lines, words, chars, size
        
    Examples:
        >>> stats = file_stats("document.txt")
        >>> stats['words']
        1523
    """
    content = read_file(filename)
    if content is None:
        return None
    
    lines = content.split('\n')
    words = content.split()
    chars = len(content)
    
    try:
        size = os.path.getsize(filename)
    except:
        size = -1
    
    return {
        'lines': len(lines),
        'words': len(words),
        'chars': chars,
        'size_bytes': size
    }


def copy_file(source, destination):
    """
    Copy file from source to destination.
    
    Args:
        source: Source file path
        destination: Destination file path
    
    Returns:
        True if successful, False otherwise
        
    Examples:
        >>> copy_file("input.txt", "backup.txt")
        True
    """
    content = read_file(source)
    if content is None:
        return False
    
    return write_file(destination, content)


if __name__ == "__main__":
    # Test file operations
    print("File Operations Test")
    print("=" * 50)
    
    # Create test file
    test_file = "test_data.txt"
    write_file(test_file, "Hello, World!\nPython is awesome!\nFile I/O is easy!")
    
    # Read and display
    print(f"\nContent:\n{read_file(test_file)}")
    
    # Get stats
    stats = file_stats(test_file)
    print(f"\nFile Statistics:")
    print(f"Lines: {stats['lines']}")
    print(f"Words: {stats['words']}")
    print(f"Characters: {stats['chars']}")
    
    # Cleanup
    if os.path.exists(test_file):
        os.remove(test_file)
        print(f"\nCleaned up {test_file}")
