import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Inspector } from './Inspector'
import './index.css'

const el = <div><span>Hello</span>, <span>world!</span></div>
// { type: 'div', key: null, ref: null, props: { children: 'Hello, world!' } }

const app = <App color='red'>{el}</App>
// { type: function App, key: null, ref: null, props: { color: 'red', children: el } }

const root = <React.StrictMode>
  <App color='lightsalmon'>{el}</App>
</React.StrictMode>
// { type: Symbol("react.strict_mode"), key: null, ref: null, props: { children: app } }

console.log(root)

ReactDOM.createRoot(document.getElementById('root')).render(
  root
)

ReactDOM.createRoot(document.getElementById('root-inspector')).render(
  <React.StrictMode>
    <Inspector element={root} />
  </React.StrictMode>
)
