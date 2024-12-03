type MovableParams = {
  handle?: string;
};

export function movable(node: HTMLElement, params: MovableParams = {}) {
  const handle = params.handle
    ? node.querySelector(params.handle) ?? node
    : node;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  function onMouseDown(evt: Event) {
    const event = evt as MouseEvent;
    isDragging = true;
    // Berechne den Abstand zwischen dem Mauszeiger und der oberen linken Ecke des Elements
    offsetX = event.clientX - node.offsetLeft;
    offsetY = event.clientY - node.offsetTop;

    // Verhindert, dass der Text innerhalb des Elements beim Ziehen ausgewählt wird
    node.style.userSelect = "none";
  }

  function onMouseMove(evt: Event) {
    const event = evt as MouseEvent;
    if (isDragging) {
      // Berechne die neue Position des Elements
      const left = event.clientX - offsetX;
      const top = event.clientY - offsetY;

      // Setze die neue Position des Elements
      node.style.left = `${left}px`;
      node.style.top = `${top}px`;
    }
    event.stopPropagation();
  }

  function onMouseUp() {
    isDragging = false;
    node.style.userSelect = "auto"; // Rückgängig machen der Auswahlbeschränkung
  }

  handle.addEventListener("mousedown", onMouseDown);
  handle.addEventListener("mousemove", onMouseMove);
  handle.addEventListener("mouseup", onMouseUp);

  return {
    update(newParams: MovableParams) {
      //
    },
    destroy() {
      handle.removeEventListener("mousedown", onMouseDown);
      handle.removeEventListener("mousemove", onMouseMove);
      handle.removeEventListener("mouseup", onMouseUp);
    },
  };
}
