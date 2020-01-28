// @ts-ignore
import '@testing-library/jest-dom/extend-expect'

// for Blueprint
if (global.document)
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document,
    },
  })