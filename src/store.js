import {createStore, combine, createEvent, sample, createEffect} from 'effector'
import getFetch from './getFetch'

// Определения
// ________________

export const increaseIndex = createEvent('increaseIndex')
export const init = createEvent('init')
const setLoading = createEvent('setLoading')


const index = createStore(0)
const data = createStore(null)
const loading = createStore(true)
const error = createStore(null)
const $store = combine({
  index,
  data,
  loading,
  error,
})

const fetchFx = createEffect('fetchFx')
fetchFx.use(getFetch)

// Логика
// ________________

index.on(increaseIndex, (state) => state + 1)

loading
  .on(fetchFx.pending, () => true)
  .on(setLoading, (_, val) => val)

data.on(fetchFx.done, (_, value) => value.result)

error.on(fetchFx.fail, (_, value) => value.error)

// Связи
// ________________

sample({
  source: init,
  fn: () => {
    return true
  },
  target: [fetchFx, setLoading],
})

sample({
  source: fetchFx.finally,
  fn: () => {
    return false
  },
  target: setLoading,
})

export default $store