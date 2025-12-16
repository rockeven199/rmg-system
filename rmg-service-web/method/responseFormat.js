module.exports = function responseFormat(_state, _msg, _code, _data) {
  if (_data == null) {
    return {
      state: _state,
      msg: _msg,
      code: _code,
      time: new Date().getTime(),
    };
  } else {
    return {
      state: _state,
      msg: _msg,
      code: _code,
      data: _data,
      time: new Date().getTime(),
    };
  }
};
