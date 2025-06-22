# How to Publish

This document outlines the steps to publish new versions of `tailwind-to-style` to npm.

## Automated Publishing via GitHub Actions

This package is configured to automatically publish to npm when a new version tag is pushed to GitHub.

### Publishing Process

1. Make your changes and commit them
2. Run the version bump command:
   ```bash
   # For patch updates (bug fixes)
   npm version patch
   
   # For minor updates (new features)
   npm version minor
   
   # For major updates (breaking changes)
   npm version major
   ```
3. The `postversion` script will automatically push the changes and the new tag to GitHub
4. GitHub Actions will detect the tag and publish the new version to npm

### Manually Publishing

If you need to publish manually:

1. Ensure you're logged in to npm:
   ```bash
   npm login
   ```
   
2. Build the package:
   ```bash
   npm run build
   ```
   
3. Publish:
   ```bash
   npm publish
   ```

## Setting Up GitHub Actions

To set up GitHub Actions for automated publishing:

1. Generate an npm Granular Access Token:
   - Go to npmjs.com and login
   - Go to your profile settings
   - Select "Access Tokens"
   - Click "Generate New Token"
   - Select "Granular Access Token"
   - Set a name like "tailwind-to-style-github-actions" 
   - Choose an appropriate expiration (e.g., 1 year)
   - Under Permissions, select "Read and write" for package publishing
   - Select only the tailwind-to-style package
   - Click "Generate Token" and copy it immediately

2. Add the token to your GitHub repository:
   - Go to your repo on GitHub
   - Go to "Settings" > "Secrets and variables" > "Actions"
   - Create a new secret named `NPM_TOKEN` with your npm token as value

3. The GitHub Action will use this token to publish to npm whenever a version tag is pushed.
