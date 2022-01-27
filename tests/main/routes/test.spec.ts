import { PgUser } from '@/infra/repos/postgres/entities'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'

import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

describe('User Routes', () => {
  let backup: IBackup
  let connection: PgConnection
  let pgUserRepo: Repository<PgUser>

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = connection.getRepository(PgUser)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(() => {
    backup.restore()
  })

  describe('POST /test', () => {
    it('should return 403 if authorization header is not present', async () => {
      const { status } = await request(app)
        .post('/api/auth/test')

      expect(status).toBe(403)
    })

    it('should return 200 with authorization header is present', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email', name: 'any name' })
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
        .post('/api/auth/test')
        .set({ authorization })

      expect(status).toBe(200)
      expect(body).toEqual({ msg: 'Teste Controller' })
    })

    it('should return 200 with valid data', async () => {
      const { status, body } = await request(app)
        .post('/api/test')

      expect(status).toBe(200)
      expect(body).toEqual({ msg: 'Teste Controller' })
    })
  })
})
