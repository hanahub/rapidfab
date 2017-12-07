import Constants from 'rapidfab/constants';

/* eslint-disable no-console */

class EventStream {
  constructor(url, onEvent) {
    this.url = url;
    this.createConnection();
    this.onEvent = onEvent;
    this.retry = 0;
    this.retryTimeout = null;
  }

  createConnection() {
    this.index = 0;
    this.xhr = new XMLHttpRequest();
    this.xhr.withCredentials = true;
    this.xhr.addEventListener('load', this.onLoad.bind(this));
    this.xhr.addEventListener('progress', this.onProgress.bind(this));
    this.xhr.addEventListener('error', this.onError.bind(this));
    this.xhr.addEventListener('abort', this.onAbort.bind(this));
    this.xhr.open('GET', this.url);
    this.xhr.send();
  }

  onLoad() {
    this.handleDisconnect();
  }

  onProgress(event) {
    if (event.loaded <= 0) {
      return;
    }
    this.retry = 0;
    this.retryTimeout = null;
    /* eslint-disable no-constant-condition */
    while (true) {
      try {
        const chunkDelimiterIndex = event.target.responseText.indexOf(
          '\n',
          this.index
        );
        if (chunkDelimiterIndex === -1) {
          return;
        }
        const chunk = event.target.responseText.substr(
          this.index,
          chunkDelimiterIndex - this.index
        );
        const data = JSON.parse(chunk);
        this.onEvent(data);
        this.index = this.index + chunk.length + 1;
      } catch (e) {
        this.index = event.target.responseText.length;
      }
    }
    /* eslint-enable no-constant-condition */
  }

  onError(event) {
    console.error('EventStream error', event, this.xhr);
    this.handleDisconnect();
  }

  onAbort(event) {
    console.log('EventStream aborted', event, this.xhr);
  }

  handleDisconnect() {
    if (this.retryTimeout) {
      return;
    }
    this.retry = this.retry + 1;
    const retryTime = Math.min(this.retry * (this.retry / 2.0) * 100, 3000);
    console.log(`Retrying connection to EventStream in ${retryTime}ms`);
    this.retryTimeout = setTimeout(() => {
      this.retryTimeout = null;
      this.createConnection();
    }, retryTime);
  }
}

function createAction(event) {
  return Object.assign({}, event, {
    type: Constants.EVENT_STREAM_MESSAGE,
  });
}

/* eslint-disable import/prefer-default-export */
/* eslint-disable no-new */

export function subscribe(dispatch, host) {
  new EventStream(host, event => dispatch(createAction(event)));
}
