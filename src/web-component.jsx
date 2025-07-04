import ReactDom from "react-dom/client"
import Widget from "./components/Layout/Widget"

// Add build and define in vite.config 
// Create html element from webcomponent
// Then run npm run build
// Import css in widget because we only build that widget so css not come
// In index.css change root to widget because we use widget class in our widget
// <style>{tailwindStyles}</style> add this in our widget for style

// For attributes make it uppercase
export const normalizeAttribute = (attribute) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

// Creating Shadow DOM
class WidgetWebComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes()
    const root = ReactDom.createRoot(this.shadowRoot)
    root.render(<Widget {...props} />)
  }

  getPropsFromAttributes() {
    const props = {}
    for (const { name, value } of this.attributes) {
      props[normalizeAttribute(name)] = value
    }
    return props
  }
}

export default WidgetWebComponent
