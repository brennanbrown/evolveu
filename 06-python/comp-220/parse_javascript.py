# parse_javascript.py

import os

class javascript_parse():
    def fileIO(self, file_name):
        js = javascript_parse()
        file = open(file_name, "r")

        js.line_count(file)
        js.else_count(file, file_name)
        js.char_count(file, file_name)

        file.close()
    
    def line_count(self, file):
        line_var = 0
        for x in file:
            line_var = line_var + 1
        print(f"\nThere are {line_var} lines in the javascript file.")

    def else_count(self, file, file_name):
        else_var = 0
        with open(file_name) as file:
            for x in file:
                if "else" in x:
                    else_var += 1
        print(f"There are {else_var} Else statements in the javascript file.")

    def char_count(self, file, file_name):
        file = open(file_name, "r")
        data = file.read()
        char_var = len(data)
        print(f"There are {char_var} characters in the javascript file.")

def main():
    js = javascript_parse()
    js.fileIO("parse_example.js")

if __name__ == "__main__":
    main()

# TESTS #

def test_canJavaScriptParseBeCalled():
    js = javascript_parse()
    js.fileIO("parse_example_2.js")
    assert True