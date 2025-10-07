#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Tests for File Operations Assignment
Module 06 - Python Fundamentals
"""

import pytest
import os
import tempfile
from file_operations import (
    read_file,
    read_lines,
    write_file,
    append_to_file,
    count_words,
    count_lines,
    search_in_file,
    replace_in_file,
    file_stats,
    copy_file
)


@pytest.fixture
def temp_file():
    """Create a temporary file for testing"""
    fd, path = tempfile.mkstemp(suffix='.txt')
    os.close(fd)
    yield path
    # Cleanup
    if os.path.exists(path):
        os.remove(path)


@pytest.fixture
def sample_content():
    """Sample file content for testing"""
    return "Hello, World!\nPython is awesome!\nFile I/O is easy!"


class TestReadFile:
    """Tests for read_file function"""
    
    def test_read_existing_file(self, temp_file, sample_content):
        write_file(temp_file, sample_content)
        content = read_file(temp_file)
        assert content == sample_content
    
    def test_read_nonexistent_file(self):
        result = read_file("nonexistent_file.txt")
        assert result is None
    
    def test_read_empty_file(self, temp_file):
        write_file(temp_file, "")
        content = read_file(temp_file)
        assert content == ""


class TestReadLines:
    """Tests for read_lines function"""
    
    def test_read_lines(self, temp_file, sample_content):
        write_file(temp_file, sample_content)
        lines = read_lines(temp_file)
        assert len(lines) == 3
        assert lines[0] == "Hello, World!"
        assert lines[1] == "Python is awesome!"
    
    def test_read_lines_empty_file(self, temp_file):
        write_file(temp_file, "")
        lines = read_lines(temp_file)
        assert lines == []  # Empty file returns empty list
    
    def test_read_lines_nonexistent(self):
        result = read_lines("nonexistent.txt")
        assert result is None


class TestWriteFile:
    """Tests for write_file function"""
    
    def test_write_new_file(self, temp_file):
        content = "Test content"
        result = write_file(temp_file, content)
        assert result == True
        assert read_file(temp_file) == content
    
    def test_overwrite_existing_file(self, temp_file):
        write_file(temp_file, "Original")
        write_file(temp_file, "Overwritten")
        assert read_file(temp_file) == "Overwritten"
    
    def test_write_multiline(self, temp_file, sample_content):
        result = write_file(temp_file, sample_content)
        assert result == True
        assert read_file(temp_file) == sample_content


class TestAppendToFile:
    """Tests for append_to_file function"""
    
    def test_append_to_existing(self, temp_file):
        write_file(temp_file, "Line 1\n")
        append_to_file(temp_file, "Line 2\n")
        content = read_file(temp_file)
        assert content == "Line 1\nLine 2\n"
    
    def test_append_to_new_file(self, temp_file):
        # Remove file if it exists
        if os.path.exists(temp_file):
            os.remove(temp_file)
        append_to_file(temp_file, "First line")
        assert read_file(temp_file) == "First line"
    
    def test_multiple_appends(self, temp_file):
        write_file(temp_file, "1")
        append_to_file(temp_file, "2")
        append_to_file(temp_file, "3")
        assert read_file(temp_file) == "123"


class TestCountWords:
    """Tests for count_words function"""
    
    def test_count_words(self, temp_file):
        write_file(temp_file, "Hello world from Python")
        assert count_words(temp_file) == 4
    
    def test_count_words_multiline(self, temp_file):
        write_file(temp_file, "Line one\nLine two\nLine three")
        assert count_words(temp_file) == 6
    
    def test_count_words_empty(self, temp_file):
        write_file(temp_file, "")
        assert count_words(temp_file) == 0
    
    def test_count_words_nonexistent(self):
        assert count_words("nonexistent.txt") == -1


class TestCountLines:
    """Tests for count_lines function"""
    
    def test_count_lines(self, temp_file):
        write_file(temp_file, "Line 1\nLine 2\nLine 3")
        assert count_lines(temp_file) == 3
    
    def test_count_lines_single(self, temp_file):
        write_file(temp_file, "Single line")
        assert count_lines(temp_file) == 1
    
    def test_count_lines_empty(self, temp_file):
        write_file(temp_file, "")
        assert count_lines(temp_file) == 0  # Empty file has 0 lines
    
    def test_count_lines_nonexistent(self):
        assert count_lines("nonexistent.txt") == -1


class TestSearchInFile:
    """Tests for search_in_file function"""
    
    def test_search_found(self, temp_file):
        write_file(temp_file, "ERROR: failed\nINFO: success\nERROR: timeout")
        matches = search_in_file(temp_file, "ERROR")
        assert len(matches) == 2
        assert "ERROR: failed" in matches
        assert "ERROR: timeout" in matches
    
    def test_search_not_found(self, temp_file):
        write_file(temp_file, "No matches here")
        matches = search_in_file(temp_file, "MISSING")
        assert matches == []
    
    def test_search_case_sensitive(self, temp_file):
        write_file(temp_file, "error\nERROR\nError")
        matches = search_in_file(temp_file, "ERROR")
        assert len(matches) == 1
    
    def test_search_nonexistent_file(self):
        result = search_in_file("nonexistent.txt", "test")
        assert result is None


class TestReplaceInFile:
    """Tests for replace_in_file function"""
    
    def test_replace_single(self, temp_file):
        write_file(temp_file, "Hello world")
        count = replace_in_file(temp_file, "world", "Python")
        assert count == 1
        assert read_file(temp_file) == "Hello Python"
    
    def test_replace_multiple(self, temp_file):
        write_file(temp_file, "foo bar foo baz foo")
        count = replace_in_file(temp_file, "foo", "qux")
        assert count == 3
        assert read_file(temp_file) == "qux bar qux baz qux"
    
    def test_replace_none_found(self, temp_file):
        write_file(temp_file, "No matches")
        count = replace_in_file(temp_file, "MISSING", "NEW")
        assert count == 0
        assert read_file(temp_file) == "No matches"
    
    def test_replace_nonexistent_file(self):
        result = replace_in_file("nonexistent.txt", "old", "new")
        assert result == -1


class TestFileStats:
    """Tests for file_stats function"""
    
    def test_file_stats(self, temp_file):
        content = "Hello World\nPython"
        write_file(temp_file, content)
        stats = file_stats(temp_file)
        
        assert stats['lines'] == 2
        assert stats['words'] == 3
        assert stats['chars'] == len(content)
        assert stats['size_bytes'] > 0
    
    def test_file_stats_empty(self, temp_file):
        write_file(temp_file, "")
        stats = file_stats(temp_file)
        
        assert stats['lines'] == 1  # Empty file has 1 line
        assert stats['words'] == 0
        assert stats['chars'] == 0
    
    def test_file_stats_nonexistent(self):
        result = file_stats("nonexistent.txt")
        assert result is None


class TestCopyFile:
    """Tests for copy_file function"""
    
    def test_copy_file(self, temp_file):
        # Create source file
        source_content = "Original content"
        write_file(temp_file, source_content)
        
        # Copy to destination
        dest_file = temp_file + ".copy"
        try:
            result = copy_file(temp_file, dest_file)
            assert result == True
            assert read_file(dest_file) == source_content
        finally:
            if os.path.exists(dest_file):
                os.remove(dest_file)
    
    def test_copy_nonexistent_source(self, temp_file):
        result = copy_file("nonexistent.txt", temp_file)
        assert result == False
