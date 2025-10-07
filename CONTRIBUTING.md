# Contributing to EvolveU Bootcamp Portfolio

Thank you for your interest in contributing! While this is primarily a personal learning portfolio from a 2021 bootcamp, contributions that improve the educational value or modernize the codebase are welcome.

## 🎯 Types of Contributions

We welcome the following types of contributions:

### ✅ Encouraged
- **Bug fixes** for broken functionality
- **Security updates** for vulnerable dependencies
- **Documentation improvements** for clarity
- **Test improvements** and additional test cases
- **Performance optimizations**
- **Modernization** of deprecated patterns
- **Accessibility improvements**

### ⚠️ Proceed with Caution
- **Major refactoring** (discuss first via issue)
- **New features** (this is a portfolio of completed work)
- **Style changes** (should follow existing patterns)

### ❌ Not Accepted
- **Formatting-only changes** without functional improvements
- **Changes that deviate** from original learning objectives
- **Dependencies** not related to the bootcamp curriculum

## 🚀 Getting Started

### 1. Fork the Repository
```bash
git clone https://github.com/YOUR-USERNAME/evolveu.git
cd evolveu
git remote add upstream https://github.com/brennanbrown/evolveu.git
```

### 2. Set Up Your Development Environment

**For JavaScript modules:**
```bash
cd 01-getting-started  # or any JS module
npm install
npm test  # ensure tests pass
```

**For React projects:**
```bash
cd 04-react/react-03  # or any react project
npm install
npm start  # start development server
npm test  # run tests
```

**For Python projects:**
```bash
cd 05-api  # or 07-flask
pipenv install
pipenv run pytest  # run tests
```

### 3. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Use descriptive branch names:
- `fix/react-hook-dependency`
- `docs/improve-api-documentation`
- `test/add-dom-manipulation-tests`
- `security/update-flask-dependencies`

## 📝 Development Guidelines

### Code Style

**JavaScript/React:**
- Follow existing ESLint configuration
- Use ES6+ features
- Write descriptive variable names
- Add JSDoc comments for complex functions
```javascript
/**
 * Calculates the total score for a user
 * @param {Object} user - User object with scores
 * @returns {number} Total score
 */
function calculateTotal(user) {
  // implementation
}
```

**Python:**
- Follow PEP 8 style guide
- Use meaningful variable names
- Add docstrings to functions and classes
```python
def process_data(input_data):
    """
    Process input data and return formatted result.
    
    Args:
        input_data (list): Raw data to process
        
    Returns:
        dict: Processed data dictionary
    """
    # implementation
```

### Testing

**All contributions must include appropriate tests:**

**JavaScript:**
```bash
npm test                    # run all tests
npm run test:coverage       # check coverage
npm run test:watch          # watch mode for development
```

**Python:**
```bash
pytest                      # run all tests
pytest --cov                # check coverage
pytest -v                   # verbose output
```

**Test Requirements:**
- New features must include tests
- Bug fixes must include regression tests
- Maintain or improve current coverage
- Tests should be clear and well-documented

### Commit Messages

Follow conventional commit format:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
fix(react-02): resolve Material-UI theme provider error

Updated MUI v6 theme configuration to fix console warnings
when ThemeProvider is used without proper theme object.

Closes #123
```

```
docs(readme): add Python 3.12 installation instructions

Added detailed setup steps for Python 3.12 on macOS and Linux
to help new contributors get started quickly.
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update from upstream:**
```bash
git fetch upstream
git rebase upstream/main
```

2. **Run all tests:**
```bash
# For JS/React
npm test

# For Python
pytest
```

3. **Check for linting errors:**
```bash
# For JS/React (if applicable)
npm run lint

# For Python
flake8 .
```

4. **Update documentation** if needed

### Submitting Your PR

1. **Push your branch:**
```bash
git push origin feature/your-feature-name
```

2. **Create Pull Request** on GitHub

3. **Fill out the PR template** with:
   - Clear description of changes
   - Related issue numbers
   - Testing performed
   - Screenshots (if UI changes)

### PR Requirements

- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow convention
- [ ] No merge conflicts
- [ ] Branch is up-to-date with main

## 🐛 Reporting Bugs

### Before Reporting
1. Check existing issues
2. Try to reproduce on latest version
3. Test with clean install

### Bug Report Template
```markdown
**Description:**
Brief description of the bug

**To Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS: [e.g. macOS 13.1]
- Node.js: [e.g. 18.12.0]
- Python: [e.g. 3.12.0]
- Module: [e.g. 04-react/react-02]

**Screenshots:**
If applicable

**Additional Context:**
Any other information
```

## 💡 Suggesting Enhancements

### Enhancement Template
```markdown
**Problem:**
What problem does this solve?

**Proposed Solution:**
How would you solve it?

**Alternatives Considered:**
Other approaches considered

**Additional Context:**
Related issues, examples, etc.
```

## 📚 Documentation

Documentation improvements are highly valued:

- **README improvements** for clarity
- **Code comments** for complex logic
- **Setup guides** for new contributors
- **Troubleshooting guides** for common issues
- **API documentation** for Flask endpoints

## 🔍 Code Review Process

1. **Automated Checks:** All PRs run automated tests
2. **Maintainer Review:** Brennan Brown reviews all PRs
3. **Feedback:** Address any requested changes
4. **Approval:** Once approved, PR will be merged

**Review Timeline:**
- Initial review: Within 7 days
- Follow-up reviews: Within 3-5 days
- Merge: After approval and passing all checks

## 📜 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on constructive feedback
- Assume positive intent
- Help create a positive learning environment

### Unacceptable Behavior

- Harassment or discriminatory language
- Personal attacks or insults
- Trolling or inflammatory comments
- Publishing private information
- Other unprofessional conduct

## 🏆 Recognition

Contributors will be recognized in:
- Project README acknowledgments
- Release notes for significant contributions
- GitHub contributor graph

## 📞 Getting Help

**Questions?**
- Open a [GitHub Discussion](https://github.com/brennanbrown/evolveu/discussions)
- Check existing documentation
- Review closed issues for similar questions

**Need to Contact Maintainer?**
- GitHub: [@brennanbrown](https://github.com/brennanbrown)
- LinkedIn: [brennanbrown](https://linkedin.com/in/brennanbrown)
- Website: [brennanbrown.ca](https://brennanbrown.ca)

## 🙏 Thank You

Your contributions help make this educational resource better for everyone learning full-stack development. Every contribution, no matter how small, is appreciated!

---

*Last updated: 2025*
