import fetch from 'node-fetch';

export const validateLinks = arrLinks => {
  const arrPromises = arrLinks.map(element => new Promise((resolve) => {
    return fetch(element.href)
      .then((res) => {
        if(res.status >= 200 && res.status < 400){
          element.status = res.status;
          element.statusText = res.statusText;
          resolve(element);
        } else {
          element.status = res.status;
          element.statusText = 'Fail';
          resolve(element);
        }
      })
      .catch(() => {
        element.status = '';
        element.statusText = 'Este link no existe';
        resolve(element);
      });
    }));
    return Promise.all(arrPromises)
    .then((res) => {
      return res;
    })
};
export const totalLinks = (arrLinks) => {
  const totalLinks = arrLinks.length;
  return `Total: ${totalLinks}`;
}

export const uniqueLinks = (arrLinks) => {
  const uniqueLinks = [...new Set(arrLinks.map(elem => elem.href))].length;
  return `Unique: ${uniqueLinks}`;
}