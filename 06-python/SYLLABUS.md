# Module 06: Python Fundamentals - Syllabus

## Course Overview

This module introduces Python programming fundamentals, focusing on practical skills for data processing, file manipulation, and scripting. Students will transition from JavaScript to Python, understanding key differences and similarities.

## Prerequisites

- Completion of JavaScript modules (00-03)
- Basic understanding of programming concepts
- Familiarity with command line

## Learning Objectives

By the end of this module, students will be able to:

1. **Python Basics**
   - Understand Python syntax and indentation
   - Work with Python data types (lists, dicts, tuples, sets)
   - Write functions with proper documentation
   - Handle errors with try/except

2. **Data Processing**
   - Read and write files
   - Parse CSV data
   - Process large datasets
   - Transform and clean data

3. **Practical Applications**
   - Calculate Canadian income tax (port from JavaScript)
   - Validate email addresses with regex
   - Process census data
   - Generate reports

4. **Testing**
   - Write pytest test cases
   - Use assertions effectively
   - Test edge cases
   - Achieve code coverage

## Module Structure

### Assignment 1: Python Basics (`basics.py`)
- Variables and types
- Lists and dictionaries
- Control flow (if/else, loops)
- Functions with parameters and return values
- **Tests:** `test_basics.py`

### Assignment 2: Tax Calculator (`cantax.py`)
- Canadian tax bracket system
- Mathematical calculations
- Progressive taxation logic
- Function composition
- **Tests:** `test_cantax.py`

### Assignment 3: Email Validator (`email.py`)
- Regular expressions
- String manipulation
- Validation logic
- Domain extraction
- **Tests:** `test_email.py`

### Assignment 4: File Operations (`file_operations.py`)
- Reading files
- Writing files
- File modes (r, w, a)
- Context managers (with statement)
- **Tests:** `test_file_operations.py`

### Assignment 5: CSV Processing (`csv_processor.py`)
- CSV module usage
- Data parsing
- Dictionary operations
- Data aggregation
- **Tests:** `test_csv_processor.py`

## Assignments

### Assignment 1: Python Basics (30 points)
Implement basic Python functions demonstrating core concepts.

**Functions to implement:**
- `add_numbers(a, b)` - Add two numbers
- `find_max(numbers)` - Find maximum in list
- `reverse_string(text)` - Reverse a string
- `count_vowels(text)` - Count vowels in text
- `create_dict(keys, values)` - Create dictionary from two lists
- `filter_even(numbers)` - Filter even numbers from list

**Due:** Week 1

### Assignment 2: Tax Calculator (25 points)
Port the JavaScript tax calculator to Python.

**Functions to implement:**
- `calculate_tax(income)` - Calculate total federal tax
- `calculate_tax_bracket(income, prev_max, curr_max, rate)` - Calculate tax for one bracket
- `get_tax_breakdown(income)` - Return detailed breakdown

**Tax Brackets (2021):**
- $0 - $49,020: 15%
- $49,021 - $98,040: 20.5%
- $98,041 - $151,978: 26%
- $151,979 - $216,511: 29%
- $216,512+: 33%

**Due:** Week 1

### Assignment 3: Email Validator (15 points)
Create an email validation system.

**Functions to implement:**
- `is_valid_email(email)` - Validate email format
- `extract_username(email)` - Get username part
- `extract_domain(email)` - Get domain part
- `is_work_email(email, domains)` - Check if corporate email

**Due:** Week 2

### Assignment 4: File Operations (15 points)
Implement file reading and writing utilities.

**Functions to implement:**
- `read_file(filename)` - Read entire file
- `read_lines(filename)` - Read as list of lines
- `write_file(filename, content)` - Write content to file
- `append_to_file(filename, content)` - Append to file
- `count_words(filename)` - Count words in file

**Due:** Week 2

### Assignment 5: CSV Processing (15 points)
Process Calgary census data from 2018.

**Functions to implement:**
- `load_census_data(filename)` - Load CSV into list of dicts
- `get_total_population(data)` - Calculate total population
- `find_largest_community(data)` - Find most populous
- `find_smallest_community(data)` - Find least populous
- `get_communities_by_sector(data, sector)` - Filter by sector

**Due:** Week 2

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| **Functionality** | 60 | All functions work correctly |
| **Tests Passing** | 20 | All pytest tests pass |
| **Code Style** | 10 | PEP 8 compliance, documentation |
| **Edge Cases** | 10 | Handles errors and edge cases |
| **Total** | 100 | |

## Testing Requirements

All assignments must:
- Pass all provided pytest tests
- Handle edge cases (empty input, None, negative numbers)
- Include docstrings
- Follow PEP 8 style guide

Run tests with:
```bash
pytest test_basics.py -v
pytest test_cantax.py -v
pytest test_email.py -v
pytest test_file_operations.py -v
pytest test_csv_processor.py -v

# All tests
pytest -v

# With coverage
pytest --cov=src --cov-report=html
```

## Python vs JavaScript Key Differences

| Concept | JavaScript | Python |
|---------|-----------|--------|
| Variables | `let x = 5` | `x = 5` |
| Functions | `function add(a, b)` | `def add(a, b):` |
| Arrays/Lists | `[1, 2, 3]` | `[1, 2, 3]` |
| Objects/Dicts | `{key: "value"}` | `{"key": "value"}` |
| Loops | `for (item of arr)` | `for item in arr:` |
| Conditionals | `if (x > 5) {}` | `if x > 5:` |
| String format | `` `${var}` `` | `f"{var}"` |
| Comments | `// comment` | `# comment` |
| Equality | `===` | `==` |
| Null | `null` | `None` |

## Resources

### Documentation
- [Python Official Docs](https://docs.python.org/3/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
- [PEP 8 Style Guide](https://pep8.org/)

### Books
- "Python Crash Course" by Eric Matthes
- "Automate the Boring Stuff with Python" by Al Sweigart

### Online
- [Real Python](https://realpython.com/)
- [Python for Everybody](https://www.py4e.com/)
- [LeetCode Python Track](https://leetcode.com/)

## Tips for Success

1. **Practice Daily** - Python syntax takes time to internalize
2. **Use REPL** - Test code snippets in Python interactive shell
3. **Read Documentation** - Python docs are excellent
4. **Compare to JavaScript** - Leverage what you already know
5. **Test Frequently** - Run pytest often to catch issues early

## Office Hours

- Tuesday/Thursday 3-5 PM
- Slack: #python-help channel

## Academic Integrity

- You may discuss concepts with classmates
- You may reference documentation and tutorials
- **You may NOT copy code from classmates**
- **You may NOT use AI to write complete solutions**
- **You MUST write your own implementations**

Violations will result in a zero for the assignment.

---

**Let's build something awesome with Python! 🐍**
