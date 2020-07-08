# parse_javascript.py

import os

class javascript_parse():
    def fileIO(self):
        js = javascript_parse()
        file = open("parse_example.js", "r")

        js.line_count(file)
        js.else_count(file)
        js.char_count(file)

        file.close()
    
    def line_count(self, file):
        line_var = 0
        for x in file:
            line_var = line_var + 1
        print(f"There are {line_var} lines in the javascript file.")

    def else_count(self, file):
        else_var = 0
        with open("parse_example.js") as file:
            for x in file:
                if "else" in x:
                    else_var += 1
        print(f"There are {else_var} Else statements in the javascript file.")

    def char_count(self, file):
        file = open("parse_example.js", "r")
        data = file.read()
        char_var = len(data)
        print(f"There are {char_var} characters in the javascript file.")

def main():
    js = javascript_parse()
    js.fileIO()

if __name__ == "__main__":
    main()