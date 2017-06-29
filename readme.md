# redeuceur

Create a Redux reducer from an array of action handlers.


## Usage

```javascript
const redeuceur = require('redeuceur');

const initialState = [];

const handlers = [
  { 
    handler: action => action.foo,
    test: ActionTypes.CREATE_FOO,
  },
  {
    handler: (action, state) => Object.assign({}, state, action.foo),
    test: (action, state) => action.type === ActionTypes.UPDATE_FOO && !state.isBar,
  },
];

const foo = redeuceur(initialState, handlers);
```


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
