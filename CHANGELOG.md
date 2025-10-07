# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2025.1.0] - 2025-10-06

### 🎉 Major Update - Modernization & Security

This release brings the 2021 bootcamp portfolio up to 2025 standards with the latest stable versions of all dependencies.

### Added
- **Documentation**
  - Comprehensive `SECURITY.md` with vulnerability reporting guidelines
  - Detailed `CONTRIBUTING.md` with contribution guidelines
  - `LICENSE` file (MIT License)
  - This `CHANGELOG.md` file
  - Enhanced `README.md` with badges, detailed setup instructions, and modern structure

- **Configuration Files**
  - `babel.config.js` for all JavaScript modules (00-testing, 01-getting-started, 02-dom, 03-objects)
  - Modern `.gitignore` with comprehensive patterns for Node.js and Python projects

### Changed

#### JavaScript/Jest Modules (00-testing, 01-getting-started, 02-dom, 03-objects)
- **Babel CLI**: 7.0.0 → 7.25.9
- **Babel Core**: Added 7.25.9
- **Babel Preset Env**: 7.0.0 → 7.25.9
- **Jest**: 29.3.1 → 29.7.0
- **Jest Environment JSDOM**: Added 29.7.0
- **node-fetch**: 3.2.10 → 3.3.2
- **whatwg-fetch**: 3.0.0 → 3.6.20
- **live-server**: 1.2.1 → 1.2.2 (01-getting-started only)
- Updated package names for clarity (e.g., `jest-p2` → `evolveu-testing`)
- Changed license from ISC to MIT
- Added author information
- Added test:watch and test:coverage scripts

#### React Projects (04-react/react-00, react-01, react-02, react-03)
- **React**: 16.12.0/16.13.1 → 18.3.1
- **React DOM**: 16.12.0/16.13.1 → 18.3.1
- **React Scripts**: 3.3.1/5.0.1 → 5.0.1 (standardized)
- **@testing-library/jest-dom**: 4.2.4 → 6.6.3
- **@testing-library/react**: 9.3.2/9.5.0 → 16.0.1
- **@testing-library/user-event**: 7.1.2/7.2.1 → 14.5.2

#### React 02 Specific (react-02)
- **Material-UI Migration**:
  - Migrated from `@material-ui/core` 4.10.2 to `@mui/material` 6.1.7
  - Migrated from `@material-ui/icons` 4.9.1 to `@mui/icons-material` 6.1.7
  - Added `@emotion/react` 11.13.5 (required by MUI v6)
  - Added `@emotion/styled` 11.13.5 (required by MUI v6)
  - Removed deprecated `material-ui` 0.20.2
- **Bootstrap**: 4.5.0 → 5.3.3
- **jQuery**: Removed (no longer needed with modern React)
- **ESLint Config Prettier**: 6.11.0 → 9.1.0
- **ESLint Plugin Prettier**: 3.1.4 → 5.2.1
- **ESLint Plugin React**: 7.20.3 → 7.37.2
- **Prettier**: 2.0.5 → 3.3.3
- **npm-install-peers**: Removed (deprecated)
- Updated package name: `reat-02group` → `evolveu-react-02-group`

#### Python/Flask - API Module (05-api/Pipfile)
- **Flask**: Wildcard → 3.1.0
- **Flask-Cors**: Wildcard → 5.0.0
- **gunicorn**: Wildcard → 23.0.0
- **requests**: Wildcard → 2.32.3
- **pytest**: Moved to dev-packages, → 8.3.0
- **pytest-cov**: Moved to dev-packages, → 6.0.0
- **coverage**: Wildcard → 7.6.9
- **black**: Added 24.10.0 (code formatter)
- **flake8**: Added 7.1.1 (linter)
- Added Python version requirement: 3.12

#### Python/Flask - Flask Module (07-flask/requirements.txt)
- **Flask**: 2.3.2 → 3.1.0
- **Flask-Login**: 0.5.0 → 0.6.3
- **Flask-Mail**: 0.9.1 → 0.10.0
- **Flask-WTF**: 0.14.3 → 1.2.2
- **Flask-Cors**: Added 5.0.0
- **flask-mongoengine**: 0.9.5 → 1.0.0
- **mongoengine**: 0.20.0 → 0.29.1
- **pymongo**: 4.6.3 → 4.10.1
- **dnspython**: 2.6.1 → 2.7.0
- **Flask-Security**: Replaced with **Flask-Security-Too** 5.5.2
- **passlib**: 1.7.2 → 1.7.4
- **email-validator**: 1.1.1 → 2.2.0
- **itsdangerous**: 1.1.0 → 2.2.0
- **gunicorn**: 22.0.4 → 23.0.0
- **Jinja2**: 3.1.5 (maintained)
- **Babel**: 2.9.1 → 2.16.0
- **WTForms**: 2.3.1 → 3.2.1
- **python-dotenv**: 0.14.0 → 1.0.1
- **click**: 7.1.2 → 8.1.8
- **blinker**: 1.4 → 1.9.0
- **MarkupSafe**: 1.1.1 → 3.0.2
- **Werkzeug**: 3.0.6 → 3.1.3
- **pytest**: 6.0.0 → 8.3.4
- **pytest-cov**: Added 6.0.0
- **coverage**: Added 7.6.9
- **attrs**: 19.3.0 → 24.3.0
- **idna**: 3.7 → 3.10
- **importlib-metadata**: 1.7.0 → 8.5.0
- **packaging**: 20.4 → 24.2
- **pytz**: 2020.1 → 2024.2
- **six**: 1.15.0 → 1.17.0
- **zipp**: 3.19.1 → 3.21.0
- Removed deprecated packages: `Flask-BabelEx`, `Flask-Principal`, `iniconfig`, `more-itertools`, `pluggy`, `py`, `pyparsing`, `speaklater`, `toml`

### Fixed
- Security vulnerabilities in outdated dependencies
- Compatibility issues with modern Node.js and Python versions
- Missing Babel configuration files causing Jest errors
- Deprecated Material-UI v4 usage in React projects
- Flask-Security deprecated package usage

### Security
- Updated all packages to latest stable versions to address known CVEs
- Added comprehensive security policy document
- Improved `.gitignore` to prevent accidental exposure of sensitive files

### Documentation
- Reorganized README with clear module structure
- Added installation and setup instructions for all modules
- Included troubleshooting guides
- Added badges for key technologies
- Documented the 2025 modernization update

## [2021.0.0] - 2021

### Added
- Initial repository structure from EvolveU bootcamp
- Module 0: Testing fundamentals with Jest
- Module 1: JavaScript basics
- Module 2: DOM manipulation
- Module 3: Object-oriented programming
- Module 4: React.js projects (4 progressive applications)
- Module 5: API development with Flask
- Module 6: Python programming
- Module 7: Flask & MongoDB full-stack application
- Heroku deployment configurations for React and Flask demos

---

## Version Naming Convention

This project uses the following versioning scheme:
- **YYYY.MINOR.PATCH** (e.g., 2025.1.0)
  - **YYYY**: Calendar year of release
  - **MINOR**: Significant updates within the year
  - **PATCH**: Bug fixes and minor updates

## Types of Changes

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

[2025.1.0]: https://github.com/brennanbrown/evolveu/compare/v2021.0.0...v2025.1.0
[2021.0.0]: https://github.com/brennanbrown/evolveu/releases/tag/v2021.0.0
