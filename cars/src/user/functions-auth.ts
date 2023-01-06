import { randomBytes, scrypt } from 'crypto';

export async function hashing(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // generate SALT in random 4 bytes long salt
    const salt = randomBytes(4).toString('hex');

    // convert password and salt
    scrypt(password, salt, 8, (err, derivedKey) => {
      if (err) reject(err);
      // Join hashedPassword and salt
      resolve(derivedKey.toString('hex') + '.' + salt);
    });
  });
}

export async function verifyHash(password, hash) {
  return new Promise((resolve, reject) => {
    const [ key, salt ] = hash.split(".")
    scrypt(password, salt, 8, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString('hex'))
    });
  })
}
