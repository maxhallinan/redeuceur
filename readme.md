# redeuceur

Create a Redux reducer from an array of action handlers.


## Usage

```javascript
import redeuceur from 'redeuceur';

const initialState = {};

const handlers = [
  [
    ActionTypes.CREATE_FOO,
    action => action.foo,
  ],
  [
    [ ActionTypes.DELETE_FOO, ActionTypes.RESET_FOO, ],
    {},
  ],
  [
    (state, action) => action.type === ActionTypes.UPDATE_FOO && !state.isBar,
    (state, action) => Object.assign({}, state, action.foo),
  ],
];

const foo = redeuceur(initialState, handlers);
```


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
