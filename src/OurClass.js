import React from 'react'
import widthEffector from './widthEffector'

import $store, {increaseIndex, init} from './store'

class OurClass extends React.PureComponent {
  constructor() {
    super();
    init()
  }
  render() {
    const {
      index,
      data,
      loading,
      error,
    } = this.props

    if (loading) return '...Ждемс 2 сек'

    if (error) return error

    if (data) {
      return (
        <div>
          <div>
            <div>{index}</div>
            <button
              type={"button"}
              onClick={increaseIndex}
              style={{minWidth: 200}}
            >
              +
            </button>
          </div>
          <hr />
          {
            Object.entries(data).map(([key, val])=> (
              <section key={key}>
                <h2>{val.title}</h2>
                <div>{val.text}</div>
              </section>
            ))
          }
        </div>
      )
    }
    return ''
  }
}

OurClass.displayName = 'OurClass'

export default widthEffector(OurClass, $store)