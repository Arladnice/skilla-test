export default function ClosePopup(popupEl, setPopupState) {
  document.addEventListener("mousedown", (e) => {
    const target = e.target;
    if (!target.closest(`.${popupEl}`)) {
      setPopupState(false);
    }
  });
}
