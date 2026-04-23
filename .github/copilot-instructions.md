# Copilot Instructions for Pag_web_2do_TSDS

## Project Overview

This is an educational web project for **Ingeniería II** (2nd year of the Tecnicatura Superior en Desarrollo de Software program at Instituto Superior de Profesorado N°20). The project serves as a personal portfolio/experimentation site for learning web development technologies.

**Purpose**: A learning platform to explore and practice HTML5, CSS3, JavaScript, and Bootstrap.

## Project Structure

```
├── index.html          # Main page with Bootstrap integration
├── style.css           # Custom styles (referenced but not yet created)
├── img/                # Image assets (e.g., img_boca.png)
├── README.md           # Project documentation
└── .vscode/            # VS Code settings
```

## Tech Stack

- **HTML5** - Semantic markup and page structure
- **CSS3** - Custom styling
- **JavaScript** - Client-side interactivity (when added)
- **Bootstrap 5.3.8** - CDN-based responsive design framework
- **Live Server** - Local development server (port 5501)

## Development Setup

### Running the Project

Use the VS Code Live Server extension:

1. Install the "Live Server" extension in VS Code
2. Right-click `index.html` and select "Open with Live Server"
3. The site will open on `http://localhost:5501`

Alternatively, use any local HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if http-server is installed)
npx http-server
```

## Code Conventions

### HTML

- Language attribute: `lang="es"` (Spanish)
- Character encoding: UTF-8 (must be in `<meta charset>`)
- Responsive viewport meta tag should always be included
- Use semantic HTML5 elements where appropriate
- Bootstrap classes for styling and layout

### CSS

- Create or extend `style.css` for custom styles
- Prefer Bootstrap utility classes for common patterns
- Custom CSS should complement, not override, Bootstrap
- Use meaningful class names that describe content, not appearance

### Bootstrap Integration

- Current version: **5.3.8** (from CDN)
- CSS link must precede custom styles
- JavaScript bundle includes all Bootstrap components (buttons, modals, alerts, etc.)
- Use Bootstrap grid system for responsive layouts

### General Guidelines

- Keep HTML clean and focused on structure
- Avoid deprecated HTML elements (e.g., `<marquee>`, `<center>`)
- Write semantic, accessible HTML
- Test responsive design at multiple viewport sizes

## Common Tasks

### Adding a New Page

1. Create a new `.html` file at the root level
2. Copy the structure from `index.html` (includes Bootstrap CDN links)
3. Link to the new page from existing pages using relative paths
4. Add custom styles to `style.css`

### Styling Components

- Use Bootstrap classes first: `class="btn btn-primary"`, `class="card"`, etc.
- Override with custom CSS in `style.css` only when needed
- Test styling with Live Server before committing

### Adding JavaScript

1. Create a `.js` file (e.g., `script.js`)
2. Link it in HTML: `<script src="script.js" defer></script>` (place before closing `</body>`)
3. Write vanilla JavaScript or use Bootstrap's JavaScript API for components

## File/Naming Conventions

- Filenames: lowercase, hyphen-separated for multiple words (e.g., `contact-form.html`)
- Image files: descriptive names in `img/` directory (e.g., `img_boca.png`)
- CSS files: `style.css` for global styles; prefix component styles with component name if split (e.g., `card-styles.css`)

## Notes for Future Development

- The `style.css` file is referenced in `index.html` but does not yet exist
- The page uses some outdated HTML elements (`<marquee>`, `<center>`) that are deprecated; these could be replaced with modern CSS alternatives
- This is an educational project; focus on learning best practices as you expand functionality

## Recomendaciones

- Cada vez que ingrese un nuevo codigo inserta un comentario en español que explique las etiquetas que utilizamos.
- Los ejemplos y el contenido en general necesito que esten es español
