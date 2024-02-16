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
    mergers.push(newMerger);
  }
  return newState;
}

export { createMergers };