const createMergers = (state) => {
  const newState = JSON.parse(JSON.stringify(state));
  const { hold, mergers } = newState;
  while (hold[1]) {
    const newMerger = {
      leftArray: hold.pop(),
      rightArray: hold.pop(),
      mergedArray: [],
      leftBottom: 0,
      rightBottom: 0,
    };
    newMerger.leftTop = newMerger.leftArray.length - 1;
    newMerger.rightTop = newMerger.rightArray.length - 1;
    for (let i = 0; i < newMerger.leftTop + newMerger.rightTop + 2; i++) {
      newMerger.mergedArray.push(null);
    }
    mergers.push(newMerger);
  }
  return newState;
}

const initializeData = (items) => {
  const randomizedItems = items.slice();
  randomizedItems.sort(() => Math.random() > 0.5 ? 1 : -1);
  let data = '';
  for (const item of randomizedItems) {
    if (data) data += '|';
    data += item;
  }
  return data;
}

const processData = (data) => {
  const state = {
    hold: [],
    mergers: [],
  };
  let direction = 'bottom';
  let target = 0;
  let mergeCount = 0;
  let item = '';
  let parseState = 'hold';
  let array = [];
  let mergeChars = '';
  let merger = {
    leftArray: [],
    rightArray: [],
    mergedArray: [],
    leftBottom: 0,
    leftTop: -1,
    rightBottom: 0,
    rightTop: -1,
  };
  for (const char of data) {
    switch (parseState) {
      case 'hold':
        if (char === '~' || char === '|' || char === '`') {
          array.push(item);
          item = '';
          if (char === '~' || char === '|') {
            state.hold.push(array);
            array = [];
            if (char === '~') {
              parseState = 'left';
            }
          }
          continue;
        }
        item += char;
        break;
      case 'left':
        if (char === '~' || char === '`') {
          merger.leftArray.push(item);
          item = '';
          merger.leftTop += 1;
          if (char === '~') {
            parseState = 'right';
          }
          continue;
        }
        item += char;
        break;
      case 'right':
        if (char === '~' || char === '`') {
          merger.rightArray.push(item);
          item = '';
          merger.rightTop += 1;
          if (char === '~') {
            target = merger.leftTop + merger.rightTop + 1;
            parseState = 'merged';
          }
          continue;
        }
        item += char;
        break;
      case 'merged':
        mergeChars += char;
        if (mergeCount === target) {
          let index = 0;
          for (let i = 0; i < mergeChars.length; i++) {
            switch (mergeChars[index]) {
              case '<':
                merger.mergedArray[index] = merger.leftArray[direction === 'bottom' ? merger.leftBottom++ : merger.leftTop--]
                break;
              case '>':
                merger.mergedArray[index] = merger.rightArray[direction === 'bottom' ? merger.rightBottom++ : merger.rightTop--]
                break;
              case '=':
                merger.mergedArray[index] = null;
                if (direction === 'bottom') {
                  direction = 'top';
                  index = mergeCount + 1;
                }
                break;
            }
            direction === 'bottom' ? index++ : index--;
          }
          state.mergers.push(merger);
          merger = {
            leftArray: [],
            rightArray: [],
            mergedArray: [],
            leftBottom: 0,
            leftTop: -1,
            rightBottom: 0,
            rightTop: -1,
          };
          mergeCount = -1;
          mergeChars = '';
          direction = 'bottom';
          parseState = 'left';
        }
        mergeCount++;
        break;
    }
  }
  if (item) state.hold.push([item]);
  return state;
}

const compileData = (state) => {
  const { hold, mergers } = state;
  let data = '';
  if (hold[0]) {
    for (const item of hold[0]) {
      if (data) data += '`';
      data += item;
    }
  }
  data += '~';
  for (const merger of mergers) {
    const cache = {};
    for (const array of ['leftArray', 'rightArray']) {
      for (const item of merger[array]) {
        if (
          data[data.length - 1] !== '~' &&
          data[data.length - 1] !== '=' &&
          data[data.length - 1] !== '<' &&
          data[data.length - 1] !== '>'
        ) data += '`';
        cache[item] = array;
        data += item;
      }
      data += '~';
    }
    for (const item of merger.mergedArray) {
      data += item ? cache[item] === 'leftArray' ? '<' : '>' : '=';
    }
  }
  return data;
}

const generateQuestion = (state) => {
  const { mergers } = state;
  const mergerIndex = Math.floor(Math.random() * mergers.length);
  const merger = mergers[mergerIndex];
  const direction = Math.random() > 0.5 ? 'Top' : 'Bottom';
  const leftItem = merger.leftArray[merger[`left${direction}`]];
  const rightItem = merger.rightArray[merger[`right${direction}`]];
  return {
    leftItem: leftItem,
    rightItem: rightItem,
    direction: direction,
    mergerIndex: mergerIndex,
  };
}

const handleAnswer = (state, payload) => {
  const newState = JSON.parse(JSON.stringify(state));
  const { hold, mergers } = newState;
  const { mergerIndex, direction, choice } = payload;
  const merger = mergers[mergerIndex];
  let arrayRef;
  let indexRef;
  if (direction === 'Bottom') {
    arrayRef = choice === 'left' ? merger.leftArray: merger.rightArray;
    indexRef = `${choice}${direction}`;
    merger.mergedArray[merger.leftBottom + merger.rightBottom] = arrayRef[merger[indexRef]++];
  } else {
    arrayRef = choice === 'right' ? merger.leftArray: merger.rightArray;
    indexRef = `${choice === 'right' ? 'left' : 'right'}${direction}`;
    merger.mergedArray[merger.leftTop + merger.rightTop + 1] = arrayRef[merger[indexRef]--];
  }
  const side = indexRef === `left${direction}` ? 'left' : 'right';
  const otherSide = side === 'left' ? 'right' : 'left';
  if (merger[`${side}Top`] < merger[`${side}Bottom`]) {
    for (let i = merger[`${otherSide}Bottom`]; i <= merger[`${otherSide}Top`]; i++) {
      merger.mergedArray[i + merger[`${side}Bottom`]] = merger[`${otherSide}Array`][i];
    }
    hold.push(merger.mergedArray);
    mergers.splice(mergerIndex, 1);
  }
  return newState;
}

const determineCompletion = (state) => {
  const { mergers, hold } = state;
  return !mergers.length && !hold[1];
}

export { 
  compileData,
  createMergers,
  determineCompletion,
  generateQuestion,
  handleAnswer,
  initializeData,
  processData,
};