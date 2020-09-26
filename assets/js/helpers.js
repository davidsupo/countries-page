let timeOut = null;
export const debouncerSearch = (actionEvent) => {
  clearTimeout(timeOut);
  timeOut = setTimeout(()=>{
    actionEvent();
  },500);
}