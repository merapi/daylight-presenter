// import Api, { ResponseCode } from 'api'
// import { mockQuestion } from 'tests/fixtures/question.fixture'

// jest.spyOn(Api.questions, 'getToken').mockImplementation(() =>
//   Promise.resolve({
//     token: 'tokenValue',
//     response_code: ResponseCode.Success,
//     response_message: '',
//   }),
// )
// jest.spyOn(Api.questions, 'fetchQuestions').mockImplementation(() =>
//   Promise.resolve({
//     results: Array(10).fill(mockQuestion),
//     response_code: 0,
//   }),
// )

// jest.mock('utils/storage', () => {
//   return {
//     getItem: jest.fn(() => undefined),
//     setItem: jest.fn(),
//   }
// })
