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
    newMerger.leftTop = newMerger.leftArray.length;
    newMerger.rightTop = newMerger.rightArray.length;
    for (let i = 0; i < newMerger.leftTop + newMerger.rightTop; i++) {
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
    if (data) data += '`';
    data += item;
  }
  return data;
}

const processData = (data) => {
  const state = {
    hold: [],
    mergers: [],
  };
  let item = '';
  for (const char of data) {
    if (char === '`') {
      state.hold.push([item]);
      item = '';
    } else {
      item += char;
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
  for (const merger of mergers) {
    const cache = {};
    for (const array of ['leftArray', 'rightArray']) {
      data += '~';
      for (const item of merger[array]) {
        if (data[data.length - 1] !== '~') data += '`';
        cache[item] = array;
        data += item;
      }
    }
    data += '~';
    for (const item of merger.mergedArray) {
      data += item ? cache[item] === 'leftArray' ? '<' : '>' : '=';
    }
  }
  return data;
}

// const state = {
//   hold: [['pyro', 'cryo']],
//   mergers: [
//     {
//       leftArray: ['dendro', 'anemo'],
//       rightArray: ['geo'],
//       mergedArray: ['dendro', undefined, undefined],
//     },
//     {
//       leftArray: ['hydro'],
//       rightArray: ['electro'],
//       mergedArray: [undefined, 'electro'],
//     },
//   ]
// }

// console.log(compileData(state));

export { createMergers, compileData, processData, initializeData };