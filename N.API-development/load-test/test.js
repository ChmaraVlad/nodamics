// eslint-disable-next-line @typescript-eslint/no-var-requires
const { io } = require('socket.io-client');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DIAGRAM_ELEMENTS } = require('./diagramElements');

// to run this test, you need to be logged in and have a valid token
// also you need to have a valid diagram id
const isProd = true;
const CLIENT_TOKEN =
  'eyJraWQiOiJkLTE2OTQxNjcyMzE0MzMiLCJ0eXAiOiJKV1QiLCJ2ZXJzaW9uIjoiNCIsImFsZyI6IlJTMjU2In0.eyJpYXQiOjE2OTQ2ODYyNTUsImV4cCI6MTY5NDY4OTg1Mywic3ViIjoiYzI3YmQxZjctNDhkNC00MDA5LWI0ZjktYWM0OWRkMjAzMWU3IiwidElkIjoicHVibGljIiwic2Vzc2lvbkhhbmRsZSI6IjVkZTg5MWE4LTBhNDAtNDY1Yy05NzgwLWI4ZTIzNTBkNWNmMiIsInJlZnJlc2hUb2tlbkhhc2gxIjoiOTI5ZWUxYzFkOTg1NTM3OTY5ZDhiYmNiNzEwMWYzZTdjZmUyMjA2N2UxNmMzOTQ0ZDczNzk1ZmU3OGJmY2Q3OSIsInBhcmVudFJlZnJlc2hUb2tlbkhhc2gxIjpudWxsLCJhbnRpQ3NyZlRva2VuIjpudWxsLCJpc3MiOiJodHRwczovL2FwcC5ub2Rhbm9taWNzLmNvbS9hcGkvYXV0aCIsInN0LWV2Ijp7InYiOnRydWUsInQiOjE2OTQ2ODYyNTAxNjd9LCJhcHBVc2VySWQiOiIzZGIwMjIxMy1hN2FjLTRhZjMtYjU4ZC1hMGI4Njc5Yzk5YjUifQ.InX4cijoBKwm3hrB8MIqUfgOhi6rX6sQIvOZyFQ5onjVfqkf3IaATDa1iIFkIiQXcnUf9Fp0ftTc7WeJfsnD-lCKJ4cNQ1sHzJ0oRSSxAXGS64AuurX7EJnze0bjKLF1arKZ8GuJVsvc6mwwd1ExDd4yjl0l-IhOMGdMLlKwWvNNInsd7yLh02j_lnjjovLAPkxCevqsuVrUrDmGmOKfzZgDPPlwxXiZhs4vQYE5Aag-_tX-wExZflLnB4nDYYY6GO3-oxgXQoouojVkp4uHTS9YuytDDEb57c5iUFxKllcle2hy4r8J_LYT_G6ncj2K1S4UI6cBxeUzobEIYtOv0g';
const DIAGRAM_ID = 'c6aeac72-097a-482c-8610-83a052635c06';
const PROD_URL = 'https://app.nodanomics.com';
const LOCAL_URL = 'http://localhost:8081';
const URL = isProd ? PROD_URL : LOCAL_URL;

const EEventDiagramServer = {
  JoinDiagramRoom: 'join_diagram_room',
  UpdateDiagramElements: 'update_diagram_elements',
  RequestDiagram: 'request_diagram',
};

const EEventDiagramWeb = {
  UpdateDiagramElements: 'update_diagram_elements',
};

const MAX_CLIENTS = 1500;

const CLIENT_CREATION_INTERVAL_IN_MS = 200;
const EMIT_INTERVAL_IN_MS = 2000;

let clientCount = 0;
let lastReport = new Date().getTime();
let packetsReceivedSinceLastReport = 0;
let packetsSentSinceLastReport = 0;

function getSocketAsync() {
  const token = CLIENT_TOKEN;
  if (token === undefined) {
    throw new Error('User is not logged in');
  }

  return io(URL, {
    path: '/api/socket',
    withCredentials: true,
    query: { token },
  });
}

const createClient = () => {
  const socket = getSocketAsync();

  // socket.emit(EEventDiagramServer.UpdateDiagramElements, DIAGRAM_ELEMENTS);

  setInterval(() => {
    socket.emit(EEventDiagramServer.JoinDiagramRoom, DIAGRAM_ID);
    packetsSentSinceLastReport++;
  }, EMIT_INTERVAL_IN_MS);

  setInterval(() => {
    socket.emit(EEventDiagramServer.UpdateDiagramElements, DIAGRAM_ELEMENTS);
    packetsSentSinceLastReport++;
  }, EMIT_INTERVAL_IN_MS);

  setInterval(() => {
    socket.emit(EEventDiagramServer.RequestDiagram, DIAGRAM_ID);
    packetsSentSinceLastReport++;
  }, EMIT_INTERVAL_IN_MS);

  socket.on(EEventDiagramWeb.UpdateDiagramElements, (data) => {
    packetsReceivedSinceLastReport++;
  });

  socket.on('disconnect');

  if (++clientCount < MAX_CLIENTS) {
    setTimeout(createClient, CLIENT_CREATION_INTERVAL_IN_MS);
  }
};

createClient();

const printReport = () => {
  const now = new Date().getTime();
  const durationSinceLastReport = (now - lastReport) / 1000;
  const packetsPerSeconds = (
    packetsReceivedSinceLastReport / durationSinceLastReport
  ).toFixed(2);

  const packetsSentPerSeconds = (
    packetsSentSinceLastReport / durationSinceLastReport
  ).toFixed(2);

  console.log(
    `client count: ${clientCount} ; 
    average packets received per second: ${packetsPerSeconds}
    average packets sent per second: ${packetsSentPerSeconds}
    `,
  );

  packetsReceivedSinceLastReport = 0;
  packetsSentSinceLastReport = 0;
  lastReport = now;
};

setInterval(printReport, 5000);
