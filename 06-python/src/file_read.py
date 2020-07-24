#!/usr/bin/env python
# -*- coding: utf-8 -*-

# file_read.py
# Exercise - Reading Dictionaries

import os
from pathlib import Path

def get_size():
    total_size = 0
    start_path = '.'  # To get size of current directory
    for path, dirs, files in os.walk(start_path):
        for f in files:
            fp = os.path.join(path, f)
            total_size += os.path.getsize(fp)

    total_size = round(total_size / 1000, 2)
    return total_size

def get_files():
    path, dirs, files = next(os.walk("."))
    file_count = len(files)

    return file_count

def get_location():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    return dir_path

print(
    "We are in the folder: ", get_location(), 
    "\nThere are ", get_files(), "files in this folder.", 
    "\nThey total: ", get_size(), "kilobytes."
    )