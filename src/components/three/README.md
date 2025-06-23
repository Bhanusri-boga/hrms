# 3D Components for HRMS UI

This directory contains enhanced 3D components built with Three.js, React Three Fiber, and Drei for the HRMS UI.

## NavMenu3D Component

The `NavMenu3D` component is an enhanced 3D navigation menu with multiple visual styles, animations, and effects.

### Features

- Multiple visual styles (Cyber, Holographic, Neon, Minimal)
- Customizable colors and animations
- Interactive hover and active states
- Post-processing effects with bloom
- Optimized performance with Suspense
- Responsive design that works in any container
- Icon support for menu items

### Usage

```jsx
import NavMenu3D from '../components/three/NavMenu3D';

// Define your menu items
const menuItems = [
  { text: 'Dashboard', path: '/dashboard', icon: '📊' },
  { text: 'Employees', path: '/employees', icon: '👥' },
  { text: 'Attendance', path: '/attendance', icon: '🕒' },
  // Add more menu items as needed
];

// Use the component in your page or layout
const YourComponent = () => {
  return (
    <div className="h-[500px]">
      <NavMenu3D 
        items={menuItems}
        style="cyber" // Options: 'cyber', 'holographic', 'neon', 'minimal'
        color="#6A0DAD"
        hoverColor="#8214ff"
        activeColor="#9643ff"
        glowColor="#b700ff"
        backgroundColor="#13131c"
        enableEffects={true}
      />
    </div>
  );
};
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | `''` | Additional CSS classes |
| `items` | array | required | Array of menu items with `text`, `path`, and optional `icon` |
| `style` | string | `'cyber'` | Visual style: 'cyber', 'holographic', 'neon', 'minimal' |
| `color` | string | `'#6A0DAD'` | Base color for menu items |
| `hoverColor` | string | `'#8214ff'` | Color for hovered menu items |
| `activeColor` | string | `'#9643ff'` | Color for active menu items |
| `glowColor` | string | `'#b700ff'` | Color for glow effects |
| `backgroundColor` | string | `'#13131c'` | Background color |
| `enableEffects` | boolean | `true` | Enable post-processing effects |

### Required Fonts

The component uses the following fonts which should be placed in the `public/fonts` directory:

- Rajdhani-Medium.ttf
- Rajdhani-Bold.ttf

### CSS Requirements

The component uses some custom CSS classes for effects like scan lines. Make sure to include these in your CSS:

```css
/* Scan lines effect for cyber style */
.bg-scan-lines {
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}

/* Holographic effect */
.bg-holographic {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(106, 13, 173, 0.1) 50%,
    rgba(0, 179, 255, 0.1) 75%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 400% 400%;
  animation: holographicShift 10s ease infinite;
}

@keyframes holographicShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
```

## Demo

You can see a live demo of the NavMenu3D component at `/nav-menu-3d-demo`.