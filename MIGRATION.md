# Migration Guide: 2021 → 2025 Update

This guide helps you understand the changes made during the 2025 modernization update and how to migrate your local setup.

## 📋 Overview

All dependencies have been updated to their latest stable versions as of October 2025. This includes:
- React 16 → React 18
- Material-UI v4 → MUI v6
- Flask 2 → Flask 3
- Python 3.8+ → Python 3.12
- All testing libraries to latest versions

## 🔄 Quick Migration Steps

### 1. Clean Install

First, remove old dependencies and lock files:

```bash
# For JavaScript/React projects
rm -rf node_modules package-lock.json
npm install

# For Python projects
rm -rf .venv
pipenv install  # or pip install -r requirements.txt
```

### 2. Update Node.js and Python

Ensure you have the required versions:

```bash
# Check Node.js version (should be 18+)
node --version

# Check Python version (should be 3.12+)
python --version
```

If needed:
- **Node.js**: Install from [nodejs.org](https://nodejs.org/) or use `nvm`
- **Python**: Install from [python.org](https://python.org/) or use `pyenv`

## 📦 Breaking Changes by Module

### React Projects (04-react/*)

#### React 18 Changes

**1. Root API Change**

**Old (React 16):**
```javascript
import ReactDOM from 'react-dom';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

**New (React 18):**
```javascript
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

**2. Automatic Batching**

React 18 automatically batches state updates. This should improve performance but may require testing:

```javascript
// These updates are now automatically batched
setState1(value1);
setState2(value2);
setState3(value3);
// Only one re-render occurs
```

**3. Strict Mode Effects**

In development, `<React.StrictMode>` now double-invokes effects to help detect side effects:

```javascript
useEffect(() => {
  console.log('This will log twice in dev mode');
  // Add cleanup if needed
  return () => {
    console.log('Cleanup');
  };
}, []);
```

#### Testing Library Updates

**Old:**
```javascript
import { render, screen } from '@testing-library/react';

test('example', () => {
  const { getByText } = render(<Component />);
  expect(getByText('Hello')).toBeInTheDocument();
});
```

**New (recommended):**
```javascript
import { render, screen } from '@testing-library/react';

test('example', () => {
  render(<Component />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

### React 02: Material-UI → MUI v6

**Major Changes:**

**1. Import Paths**

**Old:**
```javascript
import { Button, TextField } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
```

**New:**
```javascript
import { Button, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
```

**2. Theme Provider**

**Old:**
```javascript
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});
```

**New:**
```javascript
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});
```

**3. Styling System**

MUI v6 requires `@emotion/react` and `@emotion/styled`:

**New styled components:**
```javascript
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
```

**4. Box Component sx Prop**

The `sx` prop is now the preferred styling method:

```javascript
import { Box } from '@mui/material';

<Box
  sx={{
    width: 300,
    height: 300,
    backgroundColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  }}
/>
```

### React 02: Bootstrap 4 → Bootstrap 5

**Key Changes:**

**1. jQuery Removed**

Bootstrap 5 no longer requires jQuery. Remove all jQuery dependencies.

**2. Class Name Changes**

```html
<!-- Old (Bootstrap 4) -->
<div class="form-group">
  <label>Email</label>
  <input type="email" class="form-control">
</div>

<!-- New (Bootstrap 5) -->
<div class="mb-3">
  <label class="form-label">Email</label>
  <input type="email" class="form-control">
</div>
```

**3. Utility Classes**

```html
<!-- Old -->
<div class="ml-3 mr-3">Content</div>

<!-- New -->
<div class="ms-3 me-3">Content</div>
```

### Python/Flask Projects

#### Flask 3 Changes

**1. Import Changes**

**Old (Flask 2):**
```python
from flask import Flask, request, jsonify
```

**New (Flask 3):** Same imports, but behavior changes internally

**2. Flask-Security → Flask-Security-Too**

**Old:**
```python
from flask_security import Security, SQLAlchemyUserDatastore
```

**New:**
```python
from flask_security import Security, MongoEngineUserDatastore
# Note: Package name is now flask-security-too but import is same
```

**3. Configuration Changes**

Some configuration keys have changed:

```python
# Old
app.config['SECURITY_PASSWORD_HASH'] = 'bcrypt'

# New
app.config['SECURITY_PASSWORD_HASH'] = 'argon2'  # Recommended
# Or use bcrypt with updated syntax
```

#### MongoDB Connection

**Old:**
```python
from flask_mongoengine import MongoEngine

db = MongoEngine()
db.init_app(app)
```

**New (updated syntax):**
```python
from flask_mongoengine import MongoEngine

app.config['MONGODB_SETTINGS'] = {
    'db': 'your_database',
    'host': 'localhost',
    'port': 27017
}

db = MongoEngine()
db.init_app(app)
```

### JavaScript/Jest Modules

#### Babel Configuration

All JavaScript modules now require `babel.config.js`:

```javascript
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

This file has been automatically created for all modules.

#### Jest Configuration

If you have custom Jest config, ensure it's compatible with Jest 29:

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom', // for DOM testing
  // or
  testEnvironment: 'node',  // for Node.js testing
};
```

## 🔍 Testing Your Migration

### JavaScript/React Projects

```bash
cd 04-react/react-03  # or any project

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm start

# Build for production
npm run build
```

**Common Issues:**

1. **"Cannot find module 'react-dom/client'"**
   - Solution: Delete `node_modules` and `package-lock.json`, run `npm install`

2. **Material-UI import errors**
   - Solution: Update all `@material-ui/*` imports to `@mui/*`

3. **Jest test failures**
   - Solution: Update test syntax to match new Testing Library API

### Python/Flask Projects

```bash
cd 05-api  # or 07-flask

# Install dependencies
pipenv install  # or pip install -r requirements.txt

# Run tests
pytest

# Check for dependency issues
pipenv check  # or pip check
```

**Common Issues:**

1. **"No module named 'flask_security'"**
   - Solution: Install `flask-security-too` instead of deprecated `flask-security`

2. **MongoDB connection errors**
   - Solution: Ensure MongoDB is running and update connection string

3. **Python version mismatch**
   - Solution: Install Python 3.12 and recreate virtual environment

## 📊 Dependency Version Matrix

### Before vs After

| Package | Old Version | New Version | Notes |
|---------|-------------|-------------|-------|
| React | 16.13.1 | 18.3.1 | Major update |
| Jest | 29.3.1 | 29.7.0 | Minor update |
| Flask | 2.3.2 | 3.1.0 | Major update |
| Material-UI | 4.10.2 | - | Deprecated |
| MUI | - | 6.1.7 | Replacement |
| Bootstrap | 4.5.0 | 5.3.3 | Major update |
| pytest | 6.0.0 | 8.3.4 | Major update |

## 🚨 Known Issues and Workarounds

### Issue 1: React 18 Hydration Warnings

**Problem:** Console warnings about hydration mismatches

**Solution:**
```javascript
// Suppress hydration warnings (if needed for legacy code)
const root = createRoot(container, {
  onRecoverableError: (error) => {
    console.error('Recoverable error:', error);
  },
});
```

### Issue 2: MUI v6 Styling Props

**Problem:** Some v4 style props don't work in v6

**Solution:** Use the `sx` prop or styled components:
```javascript
// Old
<Button color="primary" className={classes.button}>

// New
<Button color="primary" sx={{ /* styles */ }}>
```

### Issue 3: Flask-Security Configuration

**Problem:** Old security configurations throw errors

**Solution:** Review [Flask-Security-Too documentation](https://flask-security-too.readthedocs.io/) for updated config keys

## 📚 Additional Resources

### React 18
- [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- [New React Docs](https://react.dev/)

### MUI v6
- [MUI Migration Guide](https://mui.com/material-ui/migration/migration-v4/)
- [MUI v6 Documentation](https://mui.com/)

### Flask 3
- [Flask 3.0 Changes](https://flask.palletsprojects.com/en/latest/changes/)
- [Flask-Security-Too Docs](https://flask-security-too.readthedocs.io/)

### Bootstrap 5
- [Bootstrap 5 Migration](https://getbootstrap.com/docs/5.3/migration/)

## 🆘 Getting Help

If you encounter issues during migration:

1. Check the [CHANGELOG.md](CHANGELOG.md) for detailed changes
2. Review [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
3. Search existing [GitHub Issues](https://github.com/brennanbrown/evolveu/issues)
4. Open a new issue with:
   - Module name (e.g., `04-react/react-02`)
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node/Python version)

## ✅ Migration Checklist

Use this checklist to verify your migration:

### For React Projects
- [ ] Node.js 18+ installed
- [ ] Old `node_modules` removed
- [ ] `npm install` completed successfully
- [ ] Tests pass (`npm test`)
- [ ] Development server starts (`npm start`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Updated React root API if using custom entry point
- [ ] Updated Material-UI imports to MUI (react-02 only)
- [ ] Removed jQuery references (react-02 only)

### For Python Projects
- [ ] Python 3.12+ installed
- [ ] Virtual environment recreated
- [ ] Dependencies installed successfully
- [ ] Tests pass (`pytest`)
- [ ] Flask app starts without errors
- [ ] MongoDB connection works (if applicable)
- [ ] Environment variables configured

### For All Projects
- [ ] Code commits with descriptive messages
- [ ] Documentation updated (if changed functionality)
- [ ] Security review completed
- [ ] Ready for deployment

---

**Questions or Issues?**

Contact: [@brennanbrown](https://github.com/brennanbrown) or open an issue on GitHub.

*Last updated: October 2025*
