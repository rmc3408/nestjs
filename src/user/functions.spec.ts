import * as crypto from 'crypto';
import { verifyHash, hashing } from './functions-auth';

describe('HASHING', () => {
  test('should be convert to hashed Password', async () => {

    jest.spyOn(crypto, 'randomBytes').mockImplementation(() => ({
      toString: () => 'salted'
    }));

    const result = await hashing('secret')
    expect(result).toBe('2b51f6c1ec350ff0.salted')
  })
})

describe('VERIFY HASHING', () => {
  test('should be CONFIRM hashedPassword and password matches', async () => {
     
    jest.spyOn(crypto, 'randomBytes').mockImplementation(() => ({
      toString: () => 'salted'
    }));

    const result = await verifyHash('secret', '2b51f6c1ec350ff0.salted')
    expect(result).toBeTruthy()
  })

  test('should be DENY hashedPassword and password matches', async () => {
     
    jest.spyOn(crypto, 'randomBytes').mockImplementation(() => ({
      toString: () => 'salted'
    }));

    const result = await verifyHash('secret', '2b51f6c1ec350ff0+.salted')
    expect(result).toBeFalsy()
  })
})