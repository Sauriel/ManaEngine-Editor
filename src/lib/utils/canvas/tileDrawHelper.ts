const darkMode = true;

export function drawCheckerBg(
  context: CanvasRenderingContext2D,
  tileSize: number,
  x1: number,
  y1: number
) {
  const LIGHT_CHECKER_COLOR = getComputedStyle(document.body).getPropertyValue(
    "--color-back--lighter"
  );
  const DARK_CHECKER_COLOR = getComputedStyle(document.body).getPropertyValue(
    "--color-back"
  );

  const checkerFraction = 4;
  const checkerSize = tileSize / checkerFraction;
  for (let x = 0; x < checkerFraction; x++) {
    for (let y = 0; y < checkerFraction; y++) {
      const isWhite = (x + y) % 2 === 0;
      context.fillStyle = isWhite ? LIGHT_CHECKER_COLOR : DARK_CHECKER_COLOR;
      const cx = x1 + checkerSize * x;
      const cy = y1 + checkerSize * y;
      context.fillRect(cx, cy, checkerSize, checkerSize);
    }
  }
}

export function drawGrid(
  context: CanvasRenderingContext2D,
  tileSize: number,
  x1: number,
  y1: number,
  opacity: number = 1
) {
  const BORDER_COLOR = getComputedStyle(document.body).getPropertyValue(
    "--color-back--darker"
  );
  context.fillStyle = BORDER_COLOR;
  context.globalAlpha = opacity;
  context.fillRect(x1, y1, tileSize, 1);
  context.fillRect(x1, y1 + (tileSize - 1), tileSize, 1);
  context.fillRect(x1, y1, 1, tileSize);
  context.fillRect(x1 + (tileSize - 1), y1, 1, tileSize);
  context.globalAlpha = 1;
}

export function drawSelection(
  context: CanvasRenderingContext2D,
  tileSize: number,
  x: number,
  y: number,
  colorVar: string = "--color-front",
  borderWidth: number = 4
) {
  context.fillStyle = getComputedStyle(document.body).getPropertyValue(
    colorVar
  );
  context.globalAlpha = 0.2;
  context.fillRect(x, y, tileSize, tileSize);
  context.globalAlpha = 1;
  context.fillRect(x, y, tileSize, borderWidth);
  context.fillRect(x, y + (tileSize - borderWidth), tileSize, borderWidth);
  context.fillRect(x, y, borderWidth, tileSize);
  context.fillRect(x + (tileSize - borderWidth), y, borderWidth, tileSize);
}
