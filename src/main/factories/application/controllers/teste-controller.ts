import { TestController } from '@/application/controllers'

export const makeTestController = (): TestController => {
  return new TestController()
}
