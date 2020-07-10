#!/usr/bin/env python
# -*- coding: utf-8 -*-

# parse_csv.py

import os
import csv

class csv_parse():
    def fileIO(self, file_name):
        my_csv = csv_parse()
        file = open(file_name, "r")
        my_csv.line_count(file_name)
        file.close()
    
    def line_count(self, file_name):
        file = open(file_name, "r")
        # Open a file for writing and create it if it doesn't exist.
        f = open("Census_by_Community_2018_RESULTS.txt", "w+")
        file_csv = csv.reader(f)
        csv_object = {
            "total_Class" : 0,
            "total_Sector" : 0,
        }
        try:
            CLASS = {}
            SECTOR = {}
            line_var = 0

            for x in file:
                line_var = line_var + 1
            
            print(f"\nThere are {line_var} lines in the .CSV file.")
            f.write(f"There are {line_var} lines in the .CSV file.")

        finally:
            file.close()
            f.close()

def main():
    my_csv = csv_parse()
    my_csv.fileIO("Census_by_Community_2018.csv")

if __name__ == "__main__":
    main()