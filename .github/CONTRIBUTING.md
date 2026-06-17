# Contributing to origr3n

## Reporting Bugs

Open a [GitHub issue](https://github.com/gruenheit/origr3n/issues) with:
- Shaarli version
- Browser and OS
- Steps to reproduce

## Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Test in a local Shaarli instance: `rsync -rlt origr3n/ /path/to/shaarli/tpl/origr3n/`
4. Submit a pull request

## Code Style

- **CSS:** use the existing token system (`var(--color-primary)` etc.), increment `?r=N` in `includes.html` on changes
- **JS:** vanilla ES5, no build tools, no external dependencies
- **Templates:** RainTPL syntax, follow Shaarli template conventions

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](../LICENSE).
