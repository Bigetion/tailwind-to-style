/**
 * design-system.js
 *
 * Entry point — imports all style modules in order.
 * Each file contains register() calls for one concern.
 * Imported once in main.jsx before React renders.
 */

// Foundation
import './styles/tokens.js';
import './styles/keyframes.js';
import './styles/layout.js';

// Components
import './styles/button.js';
import './styles/badge.js';
import './styles/forms.js';
import './styles/display.js';
import './styles/feedback.js';
import './styles/navigation.js';
import './styles/overlays.js';
