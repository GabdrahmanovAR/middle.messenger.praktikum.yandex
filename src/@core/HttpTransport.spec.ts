import { describe } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import HTTPTransport, { METHOD } from './HttpTransport';

describe('HttpTransport', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('должен вызывать GET запрос по заданному URL', async () => {
    const http = new HTTPTransport();
    const requestStub = sinon.stub(http, 'request').resolves();
    const path = '/test';

    await http.get(path);

    expect(requestStub.calledWithMatch(path, { method: METHOD.GET })).to.be.true;
  });

  it('должен вызывать POST запрос по заданному URL с параметрами', async () => {
    const http = new HTTPTransport();
    const requestStub = sinon.stub(http, 'request').resolves();
    const path = '/test';
    const requestData = { data: 'test data' };

    await http.post(path, requestData);

    expect(requestStub.calledWithMatch(path, { ...requestData, method: METHOD.POST })).to.be.true;
  });

  it('должен вызывать PUT запрос по заданному URL с параметрами', async () => {
    const http = new HTTPTransport();
    const requestStub = sinon.stub(http, 'request').resolves();
    const path = '/test';
    const requestData = { data: 'test data' };

    await http.put('/test', requestData);

    expect(requestStub.calledWithMatch(path, { ...requestData, method: METHOD.PUT })).to.be.true;
  });

  it('должен вызывать DELETE запрос по заданному URL', async () => {
    const http = new HTTPTransport();
    const requestStub = sinon.stub(http, 'request').resolves();
    const path = '/test';

    await http.delete('/test');

    expect(requestStub.calledWithMatch(path, { method: METHOD.DELETE })).to.be.true;
  });
});
