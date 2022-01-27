import { Controller, TestController } from '@/application/controllers'

describe('TestController', () => {
  let sut: TestController

  beforeEach(() => {
    sut = new TestController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should return 200 if authentication succeeds', async () => {
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        msg: 'Teste Controller'
      }
    })
  })
})
