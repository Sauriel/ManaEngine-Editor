type MovableParams = {
  handle?: string;
};

export function movable(node: HTMLElement, params: MovableParams = {}) {
  const handle: HTMLElement = params.handle
    ? node.querySelector(params.handle) ?? node
    : node;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startMouseX = 0;
  let startMouseY = 0;

  function onMouseDown(evt: Event) {
    const event = evt as MouseEvent;
    if (handle.isEqualNode(event.target! as Node)) {
      isDragging = true;
      startX = node.getBoundingClientRect().x;
      startY = node.getBoundingClientRect().y;
      startMouseX = event.x;
      startMouseY = event.y;

      if (getComputedStyle(handle).cursor === "grab") {
        handle.style.cursor = "grabbing";
      } else {
        handle.style.cursor = "move";
      }
      node.style.userSelect = "none";
    }
  }

  function onMouseMove(evt: Event) {
    const event = evt as MouseEvent;
    if (isDragging) {
      const left = startX + (event.x - startMouseX);
      const top = startY + (event.y - startMouseY);

      node.style.margin = "0";
      node.style.left = `${left}px`;
      node.style.top = `${top}px`;
    }
    event.stopPropagation();
  }

  function onMouseUp() {
    isDragging = false;
    handle.style.cursor = "";
    node.style.userSelect = "";
  }

  handle.addEventListener("mousedown", onMouseDown);
  document.body.addEventListener("mousemove", onMouseMove);
  document.body.addEventListener("mouseup", onMouseUp);

  return {
    update(newParams: MovableParams) {
      //
    },
    destroy() {
      handle.removeEventListener("mousedown", onMouseDown);
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    },
  };
}
