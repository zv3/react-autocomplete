**1. What is the difference between Component and PureComponent? give an
example where it might break my app.**

A `PureComponent` has a `shouldComponentUpdate` to skip re-rendering the component if the prop/state values don't change.

The case where it might break an app is when the `props.children` passed to a Pure Component is a non-primitive value such as a list of React elements. Passing in string or numbers for example should be okay as the equality check between the old and the new values will always turn up to be `true`.

**2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?**

If an intermediate component short-circuits the render in the `shouldComponentUpdate` method, it also stops the propagation of context updates to sub-tree components.

**3. Describe 3 ways to pass *information* from a component to its PARENT.**

1. Passing a callback function from the parent component to the child component (a custom handler or a `useState` setter).
2. Using Redux as state manager to store and read the data from a store.
3. Using an event bus with the help of `document.addEventListener()` `document.dispatchEvent()` similar to *Vue.js* `$on()` and `$off()` bus methods.

**4. Give 2 ways to prevent components from re-rendering.**

1. Using pure components or a `shouldComponentUpdate` in a React component.
2. Using `React.memo` to have the app cache the rendered tree given the same props.

**5. What is a fragment and why do we need it? Give an example where it might
break my app.**

Allows the rendering of multiple root-level JSX elements without adding a wrapping element that causes an extra node to be added to the DOM.

One case where I could think it might break the app is when a container div is replaced with a `Fragment` and the parent div has styling rules that were only meant to be applied to the container div that's being removed with the use of a fragment.

**6. Give 3 examples of the HOC pattern.**

- Function HOC

    ```jsx
    const withKeyLogger = (Component) {
        return (props) => {
           const onKeyDownHandler = (event) => {
              console.log('Key Pressed:', event.key);
           }
           
           <Component {...props} onKeyDown={onKeyDownHandler} />;
        }
    }
    ```

- Class HOC

    ```jsx
    function withOutsideClickDetection(Component) {
        class WrapperComponent extends React.Component {
            constructor(props) {
                super(props);
    
                this.onClickHandler = this.onClickHandler.bind(this);
            }
    
            onClickHandler(event) {
                this.wrappedCompInstance.onOutOutsideClick();
            }
    
            componentDidMount() {
                window.addEventListener('click', this.onClickHandler);
            }
    
            componentWillUnmount() {
                window.removeEventListener('click', this.onClickHandler);
            }
    
            render() {
                return <Component ref={ ... } />
            }
        }
    
        return WrapperComponent;
    }
    
    ```


**7. what's the difference in handling exceptions in promises, callbacks and
async...await.**

- _async…await_

  To catch an error in an async block, the promise should be awaited with the  `await` operator within the `try {}` block

- _Promises_

  The error handler should be set up using the `.catch()` method on the promise.

- _Callbacks_

  An argument in the callback function is to be used to communicate that an error occurred — usually the first argument.


**8. How many arguments does setState take and why is it async.**

Two arguments; the first one is the function returning the new state while the second argument is the callback to be executed once the state has been updated.

**9. List the steps needed to migrate a Class to Function Component.**

1. Replace the `class` keyword with `function`. and add the `(props)`  to before the opening `{` (curly bracket) of the former class name:

    ```jsx
    // Before:
    class Hey extends React.Component { }
    
    // After:
    function Hey(props) { }
    ```

2. Replace every `this.props` occurrence with `props`:

    ```jsx
    // Before:
    class Hey extends React.Component {
      constructor() { ... }
    
      onClick() { ... }
    }
    
    // After:
    function Hey(props) { }
    ```

3. Move the contents of the `render()` function to the outer scope and then remove the now empty `render()` function. Alternatively, remove the `render() { }` function wrapping lines.
4. Remove the `constructor` method.
5. Convert class methods to functions:

    ```jsx
    // Before:
    class Hey extends React.Component {
      onClick() { ... }
    }
    
    // After:
    function Hey(props) {
      const onClickHandler = (e) => { ... }
    
      function onClickHandler(e) { ... } // Alternative
    }
    ```

6. Convert `componentDidMount` and `componentDidUpdate` lifecycle hooks with a call to  the `useEffect` helper function.
7. Remove the `this` keyword from old method references making sure the functions being referenced exist:

    ```jsx
    // Before:
    class Hey extends React.Component {
      onClickHandler() { ... }
    
      render() {
        return <button onClick={this.onClickHandler}>...</button>
      }
    }
    
    // After:
    function Hey(props) {
      const onClickHandler = (e) => { ... }
    
      return <button onClick={onClickHandler}>...</button>
    }
    ```


**10. List a few ways styles can be used with components.**

- Having a `.css` file that's imported in the component file with classes added to the `className` attribute.
- Passing an object reference to the `style` attribute:

    ```jsx
    render() {
      const styles = { color: 'red', border: 'none' }
    
      return <div style={styles}>...</div>
    }
    ```

- Passing an object literal to the `style` attribute:

    ```jsx
    render() {
      return <div style={{ color: 'red', border: 'none' }}>...</div>
    }
    ```

- Having a separate JS file where style objects are exported, and imported in the component file.
- Using CSS modules:

    ```css
    .my-selector {
      color: red;
      border: none;
    }
    ```

    ```jsx
    import css from './stylesheet.css';
    
    render() {
      return <div className={css.MySelector}>...</div>
    }
    ```


**11. How to render an HTML string coming from the server.**

We can use `dangerouslySetInnerHTML` provided that the data coming in is data that wasn't generated by the user using a free-form input. Alternatively, we can sanitize the HTML with libraries such as `DOMPurify` before passing in to the DSIH function.

Another way if the HTML string to render is simple enough; we can get each node we are interested on using `document.querySelectorAll()` , reading each node's `innerHTML` to get its value so that we can then render a React component with the value passed as prop.
