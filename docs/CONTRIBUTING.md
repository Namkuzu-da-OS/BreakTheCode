# Contributing to Breaking Your Genetic Code

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## 🤝 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## 🎯 How to Contribute

### Types of Contributions

We welcome several types of contributions:

- **Bug Reports**: Help us identify and fix issues
- **Feature Requests**: Suggest new capabilities or improvements
- **Code Contributions**: Submit bug fixes, features, or optimizations
- **Documentation**: Improve or expand project documentation
- **Content**: Enhance the philosophical content or add new chapters
- **Design**: Improve visual elements, animations, or user experience

### Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/[username]/BreakTheCode.git
   cd BreakTheCode
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Your Changes**
   - Follow the existing code style and organization
   - Test your changes across different browsers and devices
   - Update documentation if needed

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: brief description of your change"
   ```

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📋 Development Guidelines

### Code Style

#### HTML
- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Include appropriate ARIA labels for accessibility
- Keep structure clean and readable

#### CSS
- Use CSS custom properties for theming
- Maintain existing naming conventions
- Group related styles together
- Comment complex animations or calculations
- Prefer CSS Grid and Flexbox for layouts
- Use relative units (rem, em, %, vw, vh) when appropriate

#### JavaScript
- Use modern ES6+ syntax
- Maintain existing function organization
- Add error handling for robust operation
- Comment complex logic or algorithms
- Avoid external dependencies unless absolutely necessary

### Project Structure

#### Current Architecture
The project currently uses a single-file architecture (`index.html`) containing:
- Complete HTML structure
- Embedded CSS styles
- Inline JavaScript functionality

#### Future Refactoring Plans
When refactoring (Phase 1 roadmap):
```
BreakTheCode/
├── index.html           # Main HTML structure
├── css/
│   ├── main.css        # Core styles
│   ├── animations.css  # Animation definitions
│   └── responsive.css  # Media queries
├── js/
│   ├── app.js          # Main application logic
│   ├── animations.js   # Animation controls
│   └── navigation.js   # Navigation handling
└── assets/
    ├── fonts/          # Custom fonts (if needed)
    └── images/         # Image assets
```

### Testing Guidelines

#### Browser Compatibility
Test on:
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

#### Device Testing
- **Desktop**: 1920x1080, 1366x768
- **Tablet**: iPad, Android tablets
- **Mobile**: iPhone, Android phones

#### Performance Testing
- Check animation smoothness at 60fps
- Verify load times under 3 seconds
- Test with reduced motion preferences
- Validate accessibility with screen readers

### Content Guidelines

#### Writing Style
- Maintain the philosophical and introspective tone
- Use inclusive, non-dogmatic language
- Keep concepts accessible while preserving depth
- Balance scientific insight with spiritual wisdom

#### Chapter Structure
Each chapter should include:
- Clear heading hierarchy (h2, h3)
- Engaging introductory paragraph
- Supporting quotes or meditation prompts
- Smooth transitions between concepts
- Call-to-action or reflection points

## 🐛 Bug Reports

### Before Submitting

1. **Search existing issues** to avoid duplicates
2. **Test on multiple browsers** to isolate the issue
3. **Try incognito/private mode** to rule out extensions
4. **Check browser console** for error messages

### Bug Report Template

```markdown
## Bug Description
A clear description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- Browser: [e.g., Chrome 91.0]
- OS: [e.g., Windows 10, macOS 11.4]
- Device: [e.g., Desktop, iPhone 12]
- Screen Resolution: [if relevant]

## Additional Context
Screenshots, console errors, or other relevant information.
```

## ✨ Feature Requests

### Before Submitting

1. **Check the roadmap** to see if it's already planned
2. **Search existing requests** to avoid duplicates
3. **Consider the project scope** and philosophy
4. **Think about implementation complexity**

### Feature Request Template

```markdown
## Feature Description
A clear description of the feature you'd like to see.

## Problem Statement
What problem would this feature solve?

## Proposed Solution
How do you envision this working?

## Alternatives Considered
What other solutions have you considered?

## Additional Context
Screenshots, mockups, or examples from other projects.
```

## 🔍 Code Review Process

### For Contributors
- Ensure your code follows the style guidelines
- Write clear commit messages
- Include tests if adding new functionality
- Update documentation for significant changes
- Be responsive to feedback and suggestions

### For Reviewers
- Be respectful and constructive in feedback
- Focus on code quality, not personal preferences
- Test the changes locally when possible
- Consider the impact on performance and accessibility
- Approve when ready or provide specific improvement suggestions

## 📚 Documentation Standards

### README Updates
- Keep installation instructions current
- Update feature lists for new capabilities
- Maintain accurate project structure information
- Include new dependencies or requirements

### Code Documentation
- Comment complex algorithms or calculations
- Document CSS custom properties and their usage
- Explain non-obvious JavaScript functions
- Include examples for reusable components

### API Documentation
- Document any configuration options
- Explain customization possibilities
- Provide examples of common modifications
- List browser compatibility requirements

## 🎉 Recognition

Contributors will be recognized in:
- README acknowledgments section
- Release notes for significant contributions
- Project documentation credits
- Community discussions and updates

## 📞 Getting Help

If you need help or have questions:

1. **Check existing documentation** in the docs/ folder
2. **Search closed issues** for similar problems
3. **Create a discussion** for general questions
4. **Join community channels** if available
5. **Contact maintainers** for urgent issues

## 🔄 Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, backward compatible

### Release Schedule
- **Patch releases**: As needed for bug fixes
- **Minor releases**: Monthly or bi-monthly
- **Major releases**: Quarterly or as needed

Thank you for contributing to Breaking Your Genetic Code! Together, we can create a powerful tool for consciousness expansion and human potential.
