const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest');
const User = require('../models/User');
const url = 'http://localhost:8080';

describe('Vartotojo sukurimo testavimas', () => {
  it('Tikriname ar yra sukuriamas naujas vartotojas', async () => {
    // console.log(res.body);
    let data = {
      email: 'tankas.tankaitisss@gmail.com',
      password: 'labas',
      passwordCheck: 'labas',
      displayName: 'sajanas',
    };
    const res = await request(url).post('/register').send(data);

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property('_id');
    expect(res.body).to.have.property('email');
    expect(res.body).to.have.property('password');
    expect(res.body).to.have.property('displayName');
  });

  it('Tikriname ar yra sukuriamas naujas vartotojas be vartotojo vardo', async () => {
    // console.log(res.body);
    let data = {
      email: 'testas@gmail.com',
      password: 'labas',
      passwordCheck: 'labas',
    };
    const res = await request(url).post('/register').send(data);

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property('_id');
    expect(res.body).to.have.property('email');
    expect(res.body).to.have.property('password');
    expect(res.body).to.have.property('displayName');
  });

  it('Tikriname ar neivedus el pasto yra nesukuriamas vartotojas ir graziniamas status 400', async () => {
    // console.log(res.body);
    let data = {
      password: 'labas',
      passwordCheck: 'labas',
      displayName: 'sajanas2',
    };
    const res = await request(url).post('/register').send(data);
    expect(res.status).to.equal(400);
  });

  it('Tikriname ar neivedus slaptazodio yra nesukuriamas vartotojas ir graziniamas status 400', async () => {
    // console.log(res.body);
    let data = {
      email: 'testas2@gmail.com',
      passwordCheck: 'labas',
      displayName: 'sajanas2',
    };
    const res = await request(url).post('/register').send(data);
    expect(res.status).to.equal(400);
  });

  it('Tikriname ar neivedus slaptazodzio patvirtinimo yra nesukuriamas vartotojas ir graziniamas status 400', async () => {
    // console.log(res.body);
    let data = {
      email: 'testas3@gmail.com',
      password: 'labas',
      displayName: 'sajanas2',
    };
    const res = await request(url).post('/register').send(data);
    expect(res.status).to.equal(400);
  });

  it('Tikriname ar ivedus ta pati el pasta yra nesukuriamas vartotojas ir graziniamas status 400', async () => {
    // console.log(res.body);
    let data = {
      email: 'tankas.tankaitisss@gmail.com',
      password: 'labas',
      passwordCheck: 'labas',
      displayName: 'sajanas2',
    };
    const res = await request(url).post('/register').send(data);
    expect(res.status).to.equal(400);
  });

  it('Tikriname ar ivedus ta pati vartotojo varda yra nesukuriamas vartotojas ir graziniamas status 400', async () => {
    // console.log(res.body);
    let data = {
      email: 'tankas@gmail.com',
      password: 'labas',
      passwordCheck: 'labas',
      displayName: 'sajanas',
    };

    const res = await request(url).post('/register').send(data);
    expect(res.status).to.equal(400);
  });

  it('Tikriname ar ivedus skirtingus slaptazodzius yra nesukuriamas vartotojas ir graziniamas status 400', async () => {
    // console.log(res.body);
    let data = {
      email: 'tankas@gmail.com',
      password: 'labas',
      passwordCheck: 'labasrytas',
      displayName: 'sajanas',
    };

    const res = await request(url).post('/register').send(data);
    expect(res.status).to.equal(400);
  });

  it('Tikriname ar ivedus mazesni nei 5 simboliu slaptazodi nesukuriamas vartotojas ir graziniamas status 400', async () => {
    // console.log(res.body);
    let data = {
      email: 'tankassdsds@gmail.com',
      password: 'lab',
      passwordCheck: 'lab',
      displayName: 'sajanassdsd',
    };

    const res = await request(url).post('/register').send(data);
    expect(res.status).to.equal(400);
  });
});

describe('Vartotojo prisijungimo testavimas', () => {
  it('Tikriname ar vartotojas prisijungia teisingai', async () => {
    let data = {
      email: 'testas@gmail.com',
      password: 'labas',
    };

    const res = await request(url).post('/login').send(data);
    expect(res.status).to.be.equal(200);
  });

  it('Tikriname ar vartotojas neivesdamas jokio el.pasto neprisijungia ir grazinamas status 400', async () => {
    let data = {
      password: 'labas',
    };

    const res = await request(url).post('/login').send(data);
    expect(res.status).to.be.equal(400);
  });

  it('Tikriname ar vartotojas neivesdamas jokio slaptazodzio neprisijungia ir grazinamas status 400', async () => {
    let data = {
      email: 'testas@gmail.com',
    };

    const res = await request(url).post('/login').send(data);
    expect(res.status).to.be.equal(400);
  });

  it('Tikriname ar vartotojas ivesdamas neegzistuojanti el pasto adresa neprisijungia ir grazinamas status 400', async () => {
    let data = {
      email: 'testas1111@gmail.com',
      password: 'labas',
    };

    const res = await request(url).post('/login').send(data);
    expect(res.status).to.be.equal(400);
  });
  it('Tikriname ar vartotojas ivesdamas neteisinga slaptazodi neprisijungia ir grazinamas status 400', async () => {
    let data = {
      email: 'testas@gmail.com',
      password: 'labasrytas',
    };

    const res = await request(url).post('/login').send(data);
    expect(res.status).to.be.equal(400);
  });
});

describe('Kiti like vartotoju testai', () => {
  it('Tikriname ar mes galime gauti prisijungusi vartotoja', async () => {
    let data = {
      email: 'testas@gmail.com',
      password: 'labas',
    };

    const resLogin = await request(url).post('/login').send(data);
    expect(resLogin.status).to.be.equal(200);

    const res = await request(url)
      .get('/user')
      .set({ 'x-auth-token': resLogin.body.token });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('displayName');
    expect(res.body).to.have.property('id');
  });

  it('Tikriname ar mes galime istrinti vartotoja', async () => {
    let data = {
      email: 'testas@gmail.com',
      password: 'labas',
    };

    const resLogin = await request(url).post('/login').send(data);
    expect(resLogin.status).to.be.equal(200);

    const res = await request(url)
      .delete('/delete')
      .set({ 'x-auth-token': resLogin.body.token });
    expect(res.status).to.be.equal(200);
  });

  it('Tikriname ar bandant istrinti jau istrinta vartotoja gauname status 400', async () => {
    let data = {
      email: 'tankas.tankaitisss@gmail.com',
      password: 'labas',
    };

    const resLogin = await request(url).post('/login').send(data);
    expect(resLogin.status).to.be.equal(200);

    const res = await request(url)
      .delete('/delete')
      .set({ 'x-auth-token': resLogin.body.token });
    expect(res.status).to.be.equal(200);

    const res2 = await request(url).delete('/delete').set({
      'x-auth-token': resLogin.body.token,
    });
    expect(res2.status).to.be.equal(400);
  });

  it('Tikriname ar siunciamas tokenas yra teisingas ir padavus egzistuojanti tokena grazina res body true', async () => {
    let data = {
      email: 'testas.dranseika@gmail.com',
      password: 'testas',
    };
    const resLogin = await request(url).post('/login').send(data);
    expect(resLogin.status).to.be.equal(200);

    const res = await request(url)
      .post('/tokenIsValid')
      .set({ 'x-auth-token': resLogin.body.token });
    expect(res.body).to.be.equal(true);
  });

  it('Tikriname ar siunciamas tokenas yra teisingas ir padavus neegzistuojanti tokena grazina res body false', async () => {
    let data = {
      email: 'testas.dranseika@gmail.com',
      password: 'testas',
    };

    const res = await request(url).post('/tokenIsValid').set({
      'x-auth-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2E3MTcwM2NlYWU5MDMxMTgzZTBjOCIsImlhdCI6MTU5MDMyNTYyNn0.D3fot2dlmqG7b0zXaZw7rjVoA4Z03-cy0X0BZFokc7o',
    });
    expect(res.body).to.be.equal(false);
  });

  it('Tikriname ar nepadavus jokio tokeno gausime false', async () => {
    const res = await request(url).post('/tokenIsValid');
    expect(res.body).to.be.equal(false);
  });
});
