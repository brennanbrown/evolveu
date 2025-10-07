# Security Policy

## Supported Versions

This repository contains educational material from a 2021 bootcamp that has been updated with modern dependencies in 2025. As this is primarily a learning portfolio, active security support is limited, but we take security seriously.

| Version | Supported          |
| ------- | ------------------ |
| 2025.x  | :white_check_mark: |
| 2021.x  | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in this repository, please help us by reporting it responsibly.

### How to Report

**Please do NOT create a public GitHub issue for security vulnerabilities.**

Instead, please report security issues via one of the following methods:

1. **Email:** Contact [brennanbrown](https://github.com/brennanbrown) directly through GitHub
2. **Private Security Advisory:** Use GitHub's [private vulnerability reporting](https://github.com/brennanbrown/evolveu/security/advisories/new) feature

### What to Include

When reporting a vulnerability, please include:

- **Description:** A clear description of the vulnerability
- **Location:** The file(s) and line(s) of code affected
- **Impact:** What an attacker could potentially do
- **Reproduction Steps:** Step-by-step instructions to reproduce the issue
- **Suggested Fix:** If you have ideas on how to fix it (optional)
- **Your Contact Information:** So we can follow up with questions

### Response Timeline

As this is a personal learning portfolio:

- **Acknowledgment:** Within 7 days
- **Initial Assessment:** Within 14 days
- **Fix Implementation:** Depending on severity, typically within 30 days

### Security Updates

Security updates are published through:
1. GitHub Security Advisories
2. Release notes on new versions
3. Updates to this SECURITY.md file

## Security Best Practices

When using code from this repository:

### JavaScript/React Projects
1. Always run `npm audit` before deployment
2. Keep dependencies updated: `npm update`
3. Use `npm audit fix` for automatic fixes
4. Review `npm audit fix --force` changes carefully

### Python/Flask Projects
1. Always run `pip check` or `pipenv check`
2. Keep Python version updated
3. Use virtual environments
4. Review security advisories for Flask and dependencies

### Environment Variables
Never commit sensitive information:
- API keys
- Database credentials
- Secret keys
- Access tokens

All sensitive data should be stored in `.env` files (which are gitignored) or environment variables.

## Known Security Considerations

### Educational Nature
This repository is for educational purposes. Before using any code in production:

1. **Review all dependencies** for known vulnerabilities
2. **Implement proper authentication** beyond examples shown
3. **Add rate limiting** for API endpoints
4. **Enable HTTPS** for all production deployments
5. **Sanitize user inputs** thoroughly
6. **Use environment-specific configurations**

### React Projects
- The React projects use `react-scripts` which may have security implications
- Always build with `NODE_ENV=production` for deployment
- Review CSP (Content Security Policy) requirements

### Flask Projects
- The Flask examples use development servers - **never use in production**
- Use production WSGI servers (gunicorn is included)
- Enable Flask security headers
- Configure proper CORS policies
- Use Flask-Security-Too (updated from deprecated Flask-Security)

### MongoDB
- The MongoDB examples may not include all security features
- Always use authentication in production
- Restrict network access
- Keep MongoDB updated

## Dependency Maintenance

This repository is periodically updated to maintain security:

- **Quarterly reviews** of all dependencies
- **Immediate updates** for critical security vulnerabilities
- **Major version updates** when stability is confirmed

## Additional Resources

- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [Flask Security](https://flask.palletsprojects.com/en/latest/security/)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [Python Security](https://python.readthedocs.io/en/stable/library/security_warnings.html)

## Acknowledgments

Thank you for helping keep this educational repository secure!

---

*Last updated: 2025*
