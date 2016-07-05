
import Observable from '../'


export default function flatMapLatest(mapper, source) {
  return Observable.create(add => {
    let currentUnsub

    const unsubSource = source.subscribe(val => {
      currentUnsub && currentUnsub()
      const mappedObs = mapper(val)
      currentUnsub = mappedObs.subscribe(add)
    })

    return () => {
      currentUnsub && currentUnsub()
      unsubSource()
    }
  })
}