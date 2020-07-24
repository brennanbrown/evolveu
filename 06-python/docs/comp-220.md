# COMP-220: Python File IO

## Exercise - Reading a file

One of Python’s strengths is reading data from a file. We have created several files so far. Let’s read one of those files right now.

1. Before you start, make sure everything is backed up; what we are about to do could cause data loss
2. Write a python program that will read your JavaScript syntax program as input into your program
3. Determine the number of lines in the JavaScript program and display it to the user
4. Determine how many “else” statements are in the JavaScript program
5. How many characters(total) are in the JavaScript Program?


## Exercise - Reading Dictionaries

Write a python program that will:

1. Read all the files and their sizes from a directory
2. Print a nice little report that tells us the number of files and the total size of the directory


## Exercise - Working with data

Do this exercise in teams of at least two. Same as last exercise; use only one computer and close the lid of the computers you are not using. One of Python’s strengths is working with data. We are going to download one of the many public available datasets.

1. Search for “Calgary Public Data”
2. You will find a link `<Open Calgary>;` select that link
3. Have a look at what data is available. Is there any data that may interest you?
4. Search for “Census by Community 2018” on the Calgary open data site
5. Download the data in “csv” format

At this point, the data is downloaded to your computer. Have a look at it in your text editor (Sublime / Atom / code /...). Make sure your editor does not word wrap. This is standard text data, just like your programs.

Let’s have a quick look at the data. It is in `.CSV` (comma-separated values) format. We could load it in excel but let’s not for now.

(For this exercise do not use Pandas or any other numerical library.)

**Write a python program that will:**

1. Only read the csv file once. Do not load the file into memory and then process it. The intent of this exercise is to pretend that the file is so massive it can only be read once and can not fit into memory.
2. Use a dictionary to total “res_cnt” by “CLASS” and “SECTOR”. Do not use lists, or sort the file, or any other library. You do not know from execution to execution what the Class or Sector names will be. Write the code so there is only one loop through the data. 
3. Create a total line for each of the following independently:
	- `CLASS`
	- `SECTOR`
4. Count the number of lines
5. Print a nice little report at the end
6. Optional: As a stretch goal; can you do this with no “if” statement 
7. Write the report to a file called report.txt.

The possibilities are endless. Once you can do this you can do anything.
