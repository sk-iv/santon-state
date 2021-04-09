import React from 'react'
import {createComponent} from 'effector-react'

function widthEffector(WrappedComponent, $store) {
  return class extends React.Component {
    render() {
      const EnhancedComponent = createComponent($store, (props, state) => {
        return <WrappedComponent {...state} />
      })

      return <EnhancedComponent />
    }
  }
}

export default widthEffector