# redeuceur

A utility for creating terse Redux reducers. 


## Usage

```javascript
import redeuceur from 'redeuceur';

const initialState = {};

const handlers = [
  [
    // handle a single action type
    ActionTypes.CREATE_FOO,
    // return the next state
    action => action.foo,
  ],
  [
    // handle one of many action types
    [ ActionTypes.DELETE_FOO, ActionTypes.RESET_FOO, ],
    // return a static value
    {},
  ],
  [
    // handle an arbitrary condition
    (state, action) => action.type === ActionTypes.UPDATE_FOO && !state.isBar,
    // return a computed value
    (state, action) => Object.assign({}, state, action.foo),
  ],
];

const foo = redeuceur(initialState, ...handlers);
```


## API

### redeuceur(initialState, handler[,...])

Takes an initial state value and one or more handlers, and returns a Redux reducer.


#### initialState

Type: `state`

The reducer is initialized to the value of `initialState`.


#### handler

Type: `Array`

Every handler is a `[condition, nextState]` pair. A handler specifies when to change
state (`condition`) and what change to make (`nextState`). 

If no conditions are met, the reducer returns the last state. Thus, the default 
case is handled implicitly.

Handlers are evaluated in the order they are provided to `redeuceur`. The reducer
returns the `nextState` value of the first match.


##### condition

Type: `String`, `Array String`, `(state, action) -> Boolean`

A string condition is met when the string strictly equals the action type.

An array condition is met when one string strictly equals the action type.

A function condition is met when `condition(state, action)` returns a truthy value.


##### nextState

Type: `(state, action) -> state`, `state`

If `nextState` is a function, the result of `nextState(state, action)` is 
returned as the next state. Otherwise, the value of `nextState` is returned.


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)

