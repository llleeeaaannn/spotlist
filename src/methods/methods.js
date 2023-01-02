const parseSetlistLink = (url) => {
  let urlArray = url.split('-');
  let urlLast = urlArray.pop();
  let setlistID = urlLast.split('.')[0];
  return setlistID;
}

// Method to return the getTime now
const getNowTime = () => {
  const now = new Date();
  return now.getTime();
}



export { parseSetlistLink, getNowTime }
