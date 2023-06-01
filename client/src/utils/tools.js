export const generateName=(seq)=>{
    const today = new Date()
    return `${seq}_${today.getFullYear()}${today.getMonth()}${today.getDate()}${today.getMilliseconds()}`
}

export const findObject = (array, key, value) => {
  if (array instanceof Array) {
    // console.log("myVar is an Array");
    for (const obj of array) {
      if (obj[key] === value) {
        return obj;
      }
    }
  }
  return false;
};
  