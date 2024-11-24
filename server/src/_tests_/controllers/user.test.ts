import { mockRequest, mockResponse } from '../../_mocks_'
import { getUser } from '../../controllers/user.controller'
describe('getUser', () => {
  it('Should return an object of user', () => {
    getUser(mockRequest, mockResponse)
    expect(mockResponse.send).toHaveBeenCalledWith({})
  })
})
