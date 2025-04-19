# README.md - React Essentials

## Core Concepts

### 1. Component-Based Architecture

- **Components**: Reusable, self-contained pieces of UI
- **Types**: Function components (preferred) and class components
- **Composition**: Build complex UIs by combining simpler components

### 2. JSX

- JavaScript XML syntax for describing UI
- Looks like HTML but allows embedding JavaScript expressions using `{}`
- Must return a single parent element (or use fragments `<>...</>`)
- Self-closing tags require forward slash: `<img />`
- Use `className` instead of `class`, `htmlFor` instead of `for`

### 3. Props

- Read-only data passed from parent to child components
- Used like HTML attributes: `<Button color="blue" />`
- Access in function components as parameter: `function Button(props)`
- Destructure for cleaner code: `function Button({ color })`
- Pass children with `props.children`

### 4. State

- Internal component data that can change over time
- Use `useState` hook: `const [count, setCount] = useState(0)`
- Always update using setter function: `setCount(count + 1)`
- State updates trigger re-renders
- State updates may be asynchronous (batch updates)
- Component state is isolated (not shared between components)

### 5. Hooks

- Functions that let you "hook into" React features in function components
- **Rules**:
  - Only call at top level (not in conditionals, loops, or nested functions)
  - Only call from React function components or custom hooks
- **Essential hooks**:
  - `useState`: Manage component state
  - `useEffect`: Handle side effects (data fetching, subscriptions, DOM manipulation)
  - `useContext`: Access context values
  - `useRef`: Persist values without causing re-renders; access DOM elements
  - `useMemo`: Memoize expensive calculations
  - `useCallback`: Memoize functions

### 6. Effects (useEffect)

- Handle side effects after render
- Syntax: `useEffect(() => { /* effect code */ }, [dependencies])`
- Dependency array controls when effect runs:
  - Empty array `[]`: Run once after initial render
  - With dependencies `[value1, value2]`: Run when dependencies change
  - No array: Run after every render
- Clean-up functions return from effect: `useEffect(() => { return () => cleanup() }, [])`

### 7. Events

- Use camelCase: `onClick` instead of `onclick`
- Pass function, not string: `onClick={handleClick}` not `onclick="handleClick()"`
- Access event object as parameter: `function handleClick(e) { e.preventDefault() }`
- Bind event handlers with arrow functions or in constructor

### 8. Conditional Rendering

- Use JavaScript operators: `&&`, ternary operator `? :`
- Control component rendering with variables, state, or props
- Example: `{isLoggedIn && <LogoutButton />}`
- Example: `{isLoggedIn ? <LogoutButton /> : <LoginButton />}`

### 9. Lists and Keys

- Use `map()` to render lists
- Each list item needs a unique `key` prop
- Keys help React identify changes efficiently
- Avoid using index as key unless list is static

### 10. Forms

- Use controlled components: form elements controlled by React state
- Handle input changes: `onChange={handleChange}`
- Prevent default form submission: `onSubmit={e => e.preventDefault()}`

## React Ecosystem

### 1. Routing

- React Router for handling navigation
- Define routes with `<Route>` components
- Navigate with `<Link>` or `useNavigate()` hook

### 2. State Management

- Local state with hooks for simpler applications
- Context API for shared state without prop drilling
- External libraries for complex state: Redux, Zustand, Jotai

### 3. Styling Approaches

- CSS modules: Local scoping with `filename.module.css`
- CSS-in-JS: Styled-components, Emotion (Material UI, Chakra)
- Utility-first CSS: Tailwind CSS, Bootstrap CSS

### 4. Data Fetching

- `useEffect` + `fetch` for simple cases
- Libraries: React Query, SWR, Apollo Client (GraphQL)

### 5. Common Patterns

- **Composition**: Favor composition over inheritance
- **Lifting State Up**: Move shared state to closest common ancestor
- **Container/Presentational**: Separate data logic from UI
- **Render Props**: Share code between components using props that are functions
- **Custom Hooks**: Extract reusable stateful logic (useSomething)

## Performance Optimization

1. **Memoization**: `React.memo()`, `useMemo()`, `useCallback()`
2. **Code Splitting**: `React.lazy()` and `<Suspense>`
3. **Virtualization**: For long lists (react-window, react-virtualized)
4. **Avoid Unnecessary Renders**: Use pure components, stable references
5. **Proper Key Usage**: Unique, stable keys for list items

## Best Practices

1. Keep components small and focused
2. Lift state to appropriate level
3. Use props to pass data down
4. Use appropriate event handlers
5. Validate props with PropTypes or TypeScript
6. Use functional updates for state based on previous state
7. Follow React's "thinking in React" approach: break UI into component hierarchy
8. Prefer function components with hooks
9. Use fragments to avoid unnecessary DOM nodes
10. **Understand rendering lifecycle to prevent unnecessary renders**
