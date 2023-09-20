class Api {
  constructor(options) {
    this._options = options;
  }

  getCallList(dateStart, dateEnd) {
    return fetch(
      `https://api.skilla.ru/mango/getList?date_start=${dateStart}&date_end=${dateEnd}`,
      {
        method: "POST",
        headers: {
          authorization: "Bearer testtoken",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  async getCallRecord(recordId, partnerId) {
    return fetch(
      `${this._options.baseUrl}/getRecord?record=${recordId}&partnership_id=${partnerId}`,
      {
        method: "POST",
        headers: {
          authorization: "Bearer testtoken",
          "Content-type":
            "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
          "Content-Transfer-Encoding": "binary",
          "Content-Disposition": 'filename="record.mp3"',
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.blob();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

export const ApiCall = new Api({
  baseUrl: "https://api.skilla.ru/mango",
  headers: {
    authorization: "Bearer testtoken",
  },
});
