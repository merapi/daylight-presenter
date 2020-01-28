import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import defaultStore from 'store'

const Providers = ({ children }: { children: ReactElement }) => (
  <Provider store={defaultStore}>{children}</Provider>
)

const customRender = (ui: ReactElement, options?: any) => {
  const rendered = render(ui, { wrapper: Providers, ...options })
  return {
    ...rendered,
    store: defaultStore
  }
}

export * from '@testing-library/react'
export { customRender as render }
